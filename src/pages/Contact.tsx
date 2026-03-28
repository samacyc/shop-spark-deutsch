import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name ist erforderlich";
    if (!formData.email.trim()) errs.email = "E-Mail ist erforderlich";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Ungültige E-Mail-Adresse";
    if (!formData.message.trim()) errs.message = "Nachricht ist erforderlich";
    if (formData.name.length > 100) errs.name = "Name darf maximal 100 Zeichen lang sein";
    if (formData.message.length > 2000) errs.message = "Nachricht darf maximal 2000 Zeichen lang sein";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">Kontaktiere uns</h1>
          <p className="text-muted-foreground mb-10">Wir sind für dich da. Sende uns eine Nachricht und wir antworten innerhalb von 24 Stunden.</p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">E-Mail</p>
                  <p className="text-sm text-muted-foreground">support@rosaplushies.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Telefon</p>
                  <p className="text-sm text-muted-foreground">+49 (0) 800 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Adresse</p>
                  <p className="text-sm text-muted-foreground">Rosa Plushies GmbH<br />Musterstraße 12<br />10115 Berlin, Deutschland</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Geschäftszeiten</p>
                  <p className="text-sm text-muted-foreground">Mo – Fr: 08:00 – 18:00<br />Sa: 09:00 – 14:00</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              {submitted ? (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
                  <p className="text-xl font-bold text-foreground mb-2">Vielen Dank!</p>
                  <p className="text-muted-foreground">Deine Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei dir.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Name *</label>
                      <input type="text" maxLength={100} className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      {errors.name && <p className="text-xs text-sale mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">E-Mail *</label>
                      <input type="email" maxLength={255} className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      {errors.email && <p className="text-xs text-sale mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Betreff</label>
                    <input type="text" maxLength={200} className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Nachricht *</label>
                    <textarea rows={5} maxLength={2000} className="w-full border rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    {errors.message && <p className="text-xs text-sale mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-bold text-sm hover:opacity-90 transition-opacity">
                    Nachricht senden
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;