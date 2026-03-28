import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How heavy is the weighted cow plush?", a: "Our weighted cow plush has just the right amount of weight to provide a comforting, calming pressure — similar to a weighted blanket, but in an adorable, huggable form." },
  { q: "Is it safe for children?", a: "Yes! Our plushies are made with child-safe materials and are suitable for all ages. The weight is gentle enough for children while still providing comfort for adults." },
  { q: "Can I microwave it?", a: "Yes! You can microwave the plush for a warm, soothing cuddle. Just heat for 30-60 seconds and enjoy the warmth. Perfect for cold nights or cramp relief." },
  { q: "How do I clean it?", a: "The plush can be spot-cleaned with a damp cloth and mild soap. For deeper cleaning, hand wash gently in cold water and air dry. Do not machine wash." },
  { q: "What makes it different from regular stuffed animals?", a: "Unlike regular stuffed animals, our plush is weighted to provide calming deep-pressure stimulation. The ultra-soft premium fur is softer than any plush you've ever felt, and the weight helps reduce anxiety and improve sleep." },
];

const FAQ = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">FAQ</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Everything you need to know before you buy.
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