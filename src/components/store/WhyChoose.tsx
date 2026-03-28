import p3 from "@/assets/products/plush/plush3.jpg";
import p4 from "@/assets/products/plush/plush4.jpg";
import p6 from "@/assets/products/plush/plush6.jpg";

const cards = [
  { img: p3, title: "Sleep Better", desc: "Nothing beats falling asleep with a hug from our weighted plushie. You'll drift off faster than ever before." },
  { img: p4, title: "Reduce Stress", desc: "The comforting weight has been proven to reduce stress, increase focus, and boost serotonin levels naturally." },
  { img: p6, title: "The Perfect Gift", desc: "Our weighted plushies are the perfect gift for a family member or friend. We promise they'll never forget it!" },
];

const WhyChoose = () => {
  return (
    <section className="py-16">
      <div className="container">
        <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">Why Rosa</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Make Any Day Better with a Weighted Plushie
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Designed for comfort, crafted with love.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl overflow-hidden border bg-background">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
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