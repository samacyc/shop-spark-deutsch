const steps = [
  {
    icon: "📦",
    num: "1",
    title: "Auspacken & Einbauen",
    desc: "Dank SnugLock® Technologie ist der Kindersitz in unter einer Minute sicher eingebaut — per Gurt oder LATCH.",
    tags: ["SnugLock®", "InRight™ LATCH"],
  },
  {
    icon: "🔄",
    num: "2",
    title: "Drehen & Anschnallen",
    desc: "Drehen Sie den Sitz mit einer Hand zu sich — Baby einfach einsetzen, anschnallen und zurückdrehen. Klick!",
    tags: ["360° Drehung", "Einhändig bedienbar"],
  },
  {
    icon: "🚗",
    num: "3",
    title: "Sicher losfahren",
    desc: "ProtectPlus Engineered™ Schutz bei Front-, Seiten-, Heck- und Überschlagkollisionen. Sicherheit auf jedem Weg.",
    tags: ["ProtectPlus™", "10 Jahre nutzbar"],
  },
];

const Steps = () => {
  return (
    <section className="py-16">
      <div className="container">
        <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">So funktioniert es</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          In 3 einfachen Schritten zur sicheren Fahrt
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Kein Verdrehen, kein Stress — einfach drehen und losfahren.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.num} className="text-center bg-secondary rounded-xl p-6 border">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-xs text-muted-foreground mb-1">Schritt {s.num}</div>
              <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {s.tags.map((t) => (
                  <span key={t} className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
