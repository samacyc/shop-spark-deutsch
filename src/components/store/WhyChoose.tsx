import cs4 from "@/assets/products/carseat/carseat4.jpg";
import cs5 from "@/assets/products/carseat/carseat5.jpg";
import cs6 from "@/assets/products/carseat/carseat6.jpg";

const cards = [
  { img: cs4, title: "360° Drehbar", desc: "Drehen Sie den Sitz einhändig zu sich — kein Verdrehen oder Bücken beim Anschnallen mehr." },
  { img: cs5, title: "Maximaler Schutz", desc: "ProtectPlus Engineered™ — getestet für Front-, Seiten-, Heck- und Überschlagkollisionen." },
  { img: cs6, title: "Wächst mit", desc: "Von rückwärtsgerichtet (4 lb) über vorwärtsgerichtet bis zur Sitzerhöhung (100 lb) — ein Sitz für alle Phasen." },
];

const WhyChoose = () => {
  return (
    <section className="py-16">
      <div className="container">
        <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">Warum Cruva</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Der perfekte Kindersitz für jede Fahrt
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Der Turn2Me™ wurde für maximale Sicherheit und einfachste Handhabung entwickelt.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl overflow-hidden border bg-background">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground text-lg mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
