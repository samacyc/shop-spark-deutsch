import { useState } from "react";
import { Package, Search } from "lucide-react";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!orderNumber.trim()) errs.order = "Bestellnummer ist erforderlich";
    if (!email.trim()) errs.email = "E-Mail ist erforderlich";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Ungültige E-Mail-Adresse";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-xl text-center">
          <Package className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">Bestellung verfolgen</h1>
          <p className="text-muted-foreground mb-8">Gib deine Bestellnummer und E-Mail-Adresse ein, um den Status deiner Bestellung zu überprüfen.</p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Bestellnummer *</label>
              <input type="text" maxLength={50} placeholder="z.B. RP-20260328-001" className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
              {errors.order && <p className="text-xs text-sale mt-1">{errors.order}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">E-Mail-Adresse *</label>
              <input type="email" maxLength={255} placeholder="deine@email.de" className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className="text-xs text-sale mt-1">{errors.email}</p>}
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Bestellung suchen
            </button>
          </form>

          {searched && (
            <div className="mt-8 bg-muted/50 border rounded-lg p-6 text-left">
              <p className="font-bold text-foreground mb-3">Bestellstatus</p>
              <div className="space-y-3">
                {[
                  { step: "Bestellung aufgegeben", done: true, date: "28.03.2026" },
                  { step: "Zahlung bestätigt", done: true, date: "28.03.2026" },
                  { step: "In Bearbeitung", done: true, date: "29.03.2026" },
                  { step: "Versandt", done: false, date: "—" },
                  { step: "Zugestellt", done: false, date: "—" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${s.done ? "bg-primary" : "bg-border"}`} />
                    <span className={`text-sm flex-1 ${s.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s.step}</span>
                    <span className="text-xs text-muted-foreground">{s.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;