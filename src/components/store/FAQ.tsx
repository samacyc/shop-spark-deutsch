import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Wie funktioniert die 360°-Drehung?", a: "Der Sitz dreht sich mit einer Hand von rückwärts- auf vorwärtsgerichtet. Einfach drehen, Baby einsetzen, zurückdrehen — ein hörbares 'Klick' bestätigt die sichere Position." },
  { q: "Für welches Alter/Gewicht ist der Sitz geeignet?", a: "Der Turn2Me™ bietet 3 Modi: Rückwärtsgerichtet (4–40 lb), vorwärtsgerichtet mit Gurt (26,5–65 lb) und Sitzerhöhung (40–100 lb). Er wächst über Jahre mit Ihrem Kind mit." },
  { q: "Wie schnell ist der Einbau?", a: "Dank SnugLock® Technologie und InRight™ LATCH ist der Kindersitz in unter einer Minute sicher eingebaut — per Fahrzeuggurt oder LATCH-System." },
  { q: "Ist der Sitz für Flugreisen zugelassen?", a: "Ja, der Turn2Me™ ist im vorwärtsgerichteten Gurt-Modus für die Nutzung im Flugzeug zertifiziert." },
  { q: "Wie reinige ich den Bezug?", a: "Der Sitzbezug ist maschinenwaschbar (Kaltwäsche, Schonwaschgang). Zum Trocknen aufhängen. Kein Bleichmittel verwenden." },
];

const FAQ = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">FAQ</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Häufige Fragen zum Turn2Me™ Kindersitz
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Alles, was Sie vor dem Kauf wissen sollten.
        </p>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background border rounded-xl px-6">
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
