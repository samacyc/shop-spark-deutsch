import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const UNIT_PRICE = 39.99;
const PRODUCT_NAME = "Turn2Me™ 3-in-1 Drehbarer Kindersitz";

declare global {
  interface Window {
    paypal?: any;
  }
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const quantity = useMemo(() => {
    const q = parseInt(searchParams.get("qty") || "1", 10);
    return isNaN(q) || q < 1 ? 1 : q;
  }, [searchParams]);
  const totalPrice = quantity * UNIT_PRICE;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [paypalReady, setPaypalReady] = useState(false);
  const [paypalClientId, setPaypalClientId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [formValid, setFormValid] = useState(false);

  // Validate form
  useEffect(() => {
    const valid =
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      addressLine1.trim().length > 0 &&
      city.trim().length > 0 &&
      postalCode.trim().length > 0;
    setFormValid(valid);
  }, [name, email, addressLine1, city, postalCode]);

  // Load PayPal client ID from backend
  useEffect(() => {
    const loadClientId = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("paypal-client-id", {
          method: "POST",
          body: {},
        });
        if (error) throw error;
        if (data?.clientId) {
          setPaypalClientId(data.clientId);
        }
      } catch (err) {
        console.error("Failed to load PayPal client ID:", err);
      }
    };
    loadClientId();
  }, []);

  // Load PayPal JS SDK
  useEffect(() => {
    if (!paypalClientId) return;

    // Remove old script if exists
    const existingScript = document.getElementById("paypal-sdk");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=EUR&intent=tokenize&vault=true`;
    script.async = true;
    script.onload = () => setPaypalReady(true);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("paypal-sdk");
      if (s) s.remove();
    };
  }, [paypalClientId]);

  // Render PayPal button
  const paypalContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !paypalReady || !window.paypal) return;

      // Clear previous buttons
      node.innerHTML = "";

      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 45,
          },
          createBillingAgreement: async () => {
            if (!formValid) {
              setError("Bitte füllen Sie alle Pflichtfelder aus.");
              throw new Error("Form invalid");
            }
            setError("");
            setProcessing(true);

            try {
              const { data, error: fnError } = await supabase.functions.invoke(
                "paypal-create-agreement",
                {
                  method: "POST",
                  body: {
                    amount: totalPrice,
                    name,
                    email,
                    addressLine1,
                    addressLine2,
                    city,
                    postalCode,
                    quantity,
                    returnUrl: window.location.href,
                    cancelUrl: window.location.href,
                  },
                }
              );

              if (fnError) throw fnError;
              if (data?.error) throw new Error(data.error);
              return data.tokenId;
            } catch (err: any) {
              setProcessing(false);
              setError(err.message || "Fehler bei der Zahlungsverarbeitung.");
              throw err;
            }
          },
          onApprove: async (data: any) => {
            try {
              const { data: result, error: fnError } = await supabase.functions.invoke(
                "paypal-execute-agreement",
                {
                  method: "POST",
                  body: {
                    tokenId: data.billingToken,
                    name,
                    email,
                    addressLine1,
                    addressLine2,
                    city,
                    postalCode,
                    amount: totalPrice,
                    quantity,
                  },
                }
              );

              if (fnError) throw fnError;
              if (result?.error) throw new Error(result.error);

              setProcessing(false);
              setSuccess(true);
            } catch (err: any) {
              setProcessing(false);
              setError(err.message || "Fehler beim Abschließen der Zahlung.");
            }
          },
          onCancel: () => {
            setProcessing(false);
            setError("");
          },
          onError: (err: any) => {
            setProcessing(false);
            console.error("PayPal error:", err);
            setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
          },
        })
        .render(node);
    },
    [paypalReady, formValid, name, email, addressLine1, addressLine2, city, postalCode, totalPrice, quantity]
  );

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center max-w-md mx-auto px-4">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-extrabold text-foreground mb-2">
              Vielen Dank für Ihre Bestellung!
            </h1>
            <p className="text-muted-foreground">
              Bestätigungsmail an <strong className="text-foreground">{email}</strong>.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inputCls =
    "w-full border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-lg">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-8">
            Bestellung abschließen
          </h1>

          {/* Order summary */}
          <div className="bg-background border rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center pb-4 border-b mb-4">
              <div>
                <p className="font-bold text-foreground">{PRODUCT_NAME}</p>
                <p className="text-sm text-muted-foreground">
                  {quantity} × €{UNIT_PRICE.toFixed(2)} · Kostenloser Versand
                </p>
              </div>
              <p className="text-xl font-extrabold text-foreground">€{totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Zwischensumme</span>
              <span className="text-foreground">€{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Versand</span>
              <span className="text-primary font-semibold">Kostenlos</span>
            </div>
            <div className="flex justify-between font-bold text-foreground pt-3 border-t mt-3">
              <span>Gesamt</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer info form */}
          <div className="bg-background border rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Vollständiger Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Max Mustermann"
                className={inputCls}
                disabled={processing}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="max@beispiel.de"
                className={inputCls}
                disabled={processing}
              />
            </div>
            <hr className="border-border" />
            <p className="text-sm font-semibold text-foreground">Lieferadresse</p>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Straße und Hausnummer *
              </label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                placeholder="Musterstraße 1"
                className={inputCls}
                disabled={processing}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Adresszusatz
              </label>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                placeholder="Wohnung, Etage (optional)"
                className={inputCls}
                disabled={processing}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">PLZ *</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="10115"
                  className={inputCls}
                  disabled={processing}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Stadt *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Berlin"
                  className={inputCls}
                  disabled={processing}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Land</label>
              <input
                type="text"
                value="Deutschland"
                disabled
                className="w-full border rounded-lg px-4 py-3 text-sm bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            {error && <p className="text-sm text-destructive font-medium">{error}</p>}

            {/* PayPal Button */}
            {processing && (
              <div className="flex items-center justify-center py-4 gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Zahlung wird verarbeitet...</span>
              </div>
            )}

            {paypalClientId ? (
              <div
                ref={paypalContainerRef}
                className={processing ? "opacity-50 pointer-events-none" : ""}
              />
            ) : (
              <div className="text-center py-4">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Zahlungsmethode wird geladen...</p>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center">
              🔒 Sichere Zahlung · Ihre Daten werden verschlüsselt übertragen
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
