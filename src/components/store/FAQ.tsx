import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Wie schwer ist das gewichtete Kuh-Kuscheltier?", a: "Unser gewichtetes Kuh-Kuscheltier hat genau das richtige Gewicht, um einen beruhigenden, wohltuenden Druck zu erzeugen — ähnlich wie eine Gewichtsdecke, aber in einer entzückenden, kuschelbaren Form." },
  { q: "Ist es für Kinder geeignet?", a: "Ja! Unsere Kuscheltiere bestehen aus kindersicheren Materialien und sind für alle Altersgruppen geeignet. Das Gewicht ist sanft genug für Kinder und bietet dennoch Komfort für Erwachsene." },
  { q: "Kann ich es in der Mikrowelle erwärmen?", a: "Ja! Du kannst das Kuscheltier für 30–60 Sekunden in der Mikrowelle erwärmen und eine warme, beruhigende Umarmung genießen. Perfekt für kalte Nächte oder Krämpfe." },
  { q: "Wie reinige ich es?", a: "Das Kuscheltier kann mit einem feuchten Tuch und milder Seife gereinigt werden. Für eine gründlichere Reinigung von Hand in kaltem Wasser waschen und an der Luft trocknen lassen. Nicht in der Waschmaschine waschen." },
  { q: "Was macht es anders als normale Kuscheltiere?", a: "Im Gegensatz zu normalen Kuscheltieren ist unser Plüschtier gewichtet und bietet beruhigende Tiefendruckstimulation. Das ultra-weiche Premium-Fell ist weicher als jedes Plüschtier, das du je berührt hast, und das Gewicht hilft, Angst zu reduzieren und den Schlaf zu verbessern." },
];

const FAQ = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">FAQ</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Häufig gestellte Fragen
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Alles, was du vor dem Kauf wissen solltest.
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