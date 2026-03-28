import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const UNIT_PRICE = 39.99;
const ORIGINAL_PRICE = 149.99;

const features = [
  { icon: "🔄", label: "360° Drehfunktion" },
  { icon: "🛡️", label: "ProtectPlus Engineered™" },
  { icon: "👶", label: "3-in-1: 4–100 lb" },
  { icon: "🔧", label: "SnugLock® Einbau < 1 Min" },
  { icon: "✈️", label: "Flugzeug-zertifiziert" },
  { icon: "💪", label: "Stahlverstärkter Rahmen" },
];

const ProductInfo = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const total = (qty * UNIT_PRICE).toFixed(2);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
        Turn2Me™ 3-in-1 Drehbarer Kindersitz
      </h1>

      <div className="flex items-center gap-2">
        <div className="flex text-highlight">
          {"★★★★".split("").map((_, i) => (
            <span key={i}>★</span>
          ))}
          <span className="text-highlight/60">★</span>
        </div>
        <span className="text-sm text-muted-foreground">4.6 (1.142 Bewertungen)</span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
          €{UNIT_PRICE.toFixed(2).replace(".", ",")}
        </span>
        <span className="text-xl text-muted-foreground line-through">
          €{ORIGINAL_PRICE.toFixed(2).replace(".", ",")}
        </span>
        <span className="bg-sale text-sale-foreground text-xs font-bold px-2.5 py-1 rounded-full">SPARE 73%</span>
      </div>

      <div className="bg-accent rounded-lg p-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-stock-green animate-pulse" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            Nur noch <strong>5</strong> Stück auf Lager — sehr hohe Nachfrage.
          </p>
          <div className="mt-2 h-2 rounded-full bg-stock-bar overflow-hidden">
            <div className="h-full bg-stock-green rounded-full" style={{ width: "20%" }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {features.map((f) => (
          <span
            key={f.label}
            className="bg-secondary border rounded-full px-3 py-1.5 text-sm font-medium text-foreground flex items-center gap-1.5"
          >
            {f.icon} {f.label}
          </span>
        ))}
      </div>

      <div className="bg-accent rounded-lg p-4 flex items-start gap-3">
        <span className="text-2xl text-primary">🚗</span>
        <div className="flex-1">
          <h3 className="font-bold text-foreground">Sicherheit, die mitwächst — 3 Modi in 1 Sitz</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Der Turn2Me™ dreht sich mit einer Hand von rückwärts- auf vorwärtsgerichtet — für einfaches Ein- und Aussteigen.
            Wächst mit Ihrem Kind von 4 bis 100 lb in 3 Nutzungsmodi.
          </p>
        </div>
        <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
          CRUVA
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center border rounded-lg overflow-hidden self-start">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2.5 sm:py-3 hover:bg-secondary transition-colors text-muted-foreground"
            aria-label="Menge verringern"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-foreground min-w-[44px] text-center">
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-2.5 sm:py-3 hover:bg-secondary transition-colors text-muted-foreground"
            aria-label="Menge erhöhen"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1 gap-2 text-base sm:text-lg font-bold w-full sm:w-auto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "1rem 2.5rem",
            backgroundColor: "#1e3a5f",
            color: "white",
            fontSize: "1.25rem",
            fontWeight: "700",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            width: "100%",
            whiteSpace: "nowrap",
            transition: "background-color 0.2s",
          }}
          onClick={() => navigate(`/checkout?qty=${qty}`)}
        >
          <Zap className="w-5 h-5" />
          In den Warenkorb legen
        </Button>
      </div>

      {qty > 1 && (
        <p className="text-sm text-muted-foreground">
          {qty} × €{UNIT_PRICE.toFixed(2)} = <strong className="text-foreground">€{total}</strong>
        </p>
      )}
    </div>
  );
};

export default ProductInfo;
