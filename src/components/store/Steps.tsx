const steps = [
  {
    icon: "📦",
    num: "1",
    title: "Auspacken & Kuscheln",
    desc: "Dein gewichtetes Kuh-Kuscheltier kommt sorgfältig verpackt. Auspacken, aufschütteln — und sofort loskuscheln!",
    tags: ["Premium Verpackung", "Sofort kuschelig"],
  },
  {
    icon: "🤗",
    num: "2",
    title: "Umarmen & Entspannen",
    desc: "Halte dein Kuscheltier fest und spüre, wie das sanfte Gewicht deinen Stress schmelzen lässt. Wie eine Gewichtsdecke, nur niedlicher.",
    tags: ["Beruhigendes Gewicht", "Angstlinderung"],
  },
  {
    icon: "🌙",
    num: "3",
    title: "Friedlich Einschlafen",
    desc: "Schlafe ein mit deinem kuscheligen Begleiter. Das beruhigende Gewicht hilft dir, schneller einzuschlafen und tiefer zu schlafen.",
    tags: ["Besserer Schlaf", "Serotonin-Boost"],
  },
];

const Steps = () => {
  return (
    <section className="py-16">
      <div className="container">
        <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">So funktioniert's</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          In 3 einfachen Schritten zu besserem Schlaf
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Keine Tabletten, keine Apps — einfach eine kuschelige, gewichtete Umarmung.
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