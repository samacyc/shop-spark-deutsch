const steps = [
  {
    icon: "📦",
    num: "1",
    title: "Unbox Your Plush",
    desc: "Your weighted cow plush arrives carefully packaged. Unbox and give it a gentle fluff — it's ready to cuddle!",
    tags: ["Premium Packaging", "Ready to Love"],
  },
  {
    icon: "🤗",
    num: "2",
    title: "Hug & Relax",
    desc: "Hold your plush close and feel the gentle, comforting weight melt your stress away. Just like a weighted blanket, but cuter.",
    tags: ["Weighted Comfort", "Anxiety Relief"],
  },
  {
    icon: "🌙",
    num: "3",
    title: "Sleep Peacefully",
    desc: "Drift off to sleep with your cozy companion. The soothing weight helps you fall asleep faster and sleep deeper.",
    tags: ["Better Sleep", "Serotonin Boost"],
  },
];

const Steps = () => {
  return (
    <section className="py-16">
      <div className="container">
        <p className="text-center text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">How It Works</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          3 Simple Steps to Better Sleep
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          No pills, no apps — just a cozy, weighted hug.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.num} className="text-center bg-secondary rounded-xl p-6 border">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-xs text-muted-foreground mb-1">Step {s.num}</div>
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