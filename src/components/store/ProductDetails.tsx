const ProductDetails = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Warum der Turn2Me™ 3-in-1 Kindersitz?
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Vergleichen Sie — mit und ohne drehbaren Kindersitz.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-background rounded-xl p-6 border">
            <h3 className="font-bold text-foreground text-lg mb-4">Ohne Drehfunktion</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Umständliches Ein- und Aussteigen</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Rückenprobleme beim Anschnallen</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Neuer Sitz bei jeder Wachstumsphase</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Komplizierter Einbau</li>
            </ul>
          </div>

          <div className="bg-background rounded-xl p-6 border border-primary/30">
            <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
              Mit Turn2Me™ <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">Empfohlen</span>
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> 360° Drehung — einhändig bedienbar</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> 3-in-1: Wächst von Baby bis Kleinkind mit</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> SnugLock® — Einbau in unter 1 Minute</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> ProtectPlus Engineered™ Sicherheit</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
