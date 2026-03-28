const reviews = [
  { name: "Laura S.", rating: 5, text: "Die Drehfunktion ist ein Gamechanger! Kein Verrenken mehr beim Anschnallen. Unser Baby sitzt sicher und bequem. Absolut empfehlenswert!", time: "vor 2 Wochen", verified: true },
  { name: "Michael K.", rating: 5, text: "Einbau hat keine 2 Minuten gedauert dank SnugLock. Der Sitz fühlt sich massiv und sicher an. Preis-Leistung ist top.", time: "vor 1 Monat", verified: true },
  { name: "Sandra W.", rating: 5, text: "Wir hatten vorher einen normalen Sitz — der Unterschied mit der Drehung ist riesig. Baby lacht jedes Mal wenn sich der Sitz dreht!", time: "vor 2 Monaten", verified: true },
  { name: "Thomas H.", rating: 4, text: "Sehr solider Kindersitz. Die 3 Modi sind praktisch. Einziger Nachteil: Er ist etwas schwer, aber dafür fühlt man die Qualität.", time: "vor 3 Monaten", verified: true },
  { name: "Julia M.", rating: 5, text: "Haben den Sitz für unser zweites Kind gekauft, nachdem wir ihn bei Freunden gesehen haben. Die Polsterung ist super weich und der Einbau kinderleicht.", time: "vor 3 Monaten", verified: true },
  { name: "Markus B.", rating: 5, text: "Perfekt für lange Autofahrten. Unser Sohn (2 Jahre) schläft sofort ein. Die Kopfstütze lässt sich super anpassen.", time: "vor 4 Monaten", verified: true },
  { name: "Anna R.", rating: 4, text: "Toller Sitz! Die 10-fach verstellbare Kopfstütze ist genial. Etwas teurer als andere, aber die Sicherheit ist es wert.", time: "vor 5 Monaten", verified: true },
  { name: "Stefan L.", rating: 5, text: "Haben den Sitz sogar im Flugzeug genutzt — funktioniert einwandfrei. Endlich ein Sitz der alles kann!", time: "vor 6 Monaten", verified: true },
];

const ratingDistribution = [
  { stars: 5, count: 876 },
  { stars: 4, count: 171 },
  { stars: 3, count: 57 },
  { stars: 2, count: 23 },
  { stars: 1, count: 15 },
];

const totalReviews = 1142;
const avgRating = 4.6;

const Reviews = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2 text-foreground">
          Kundenbewertungen
        </h2>
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-highlight text-lg">
              {"★★★★".split("").map((_, i) => <span key={i}>★</span>)}
              <span className="text-highlight/60">★</span>
            </div>
            <span className="text-foreground font-bold">{avgRating}</span>
            <span className="text-muted-foreground text-sm">({totalReviews.toLocaleString("de-DE")} Bewertungen)</span>
          </div>
          <div className="w-full max-w-xs space-y-1">
            {ratingDistribution.map((r) => (
              <div key={r.stars} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-muted-foreground text-right">{r.stars}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-highlight rounded-full" style={{ width: `${(r.count / totalReviews) * 100}%` }} />
                </div>
                <span className="w-8 text-muted-foreground text-right">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {reviews.map((r, i) => (
            <div key={i} className="bg-background border rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground text-sm">{r.name}</span>
                  {r.verified && <span className="text-xs text-primary font-medium flex items-center gap-1">✓ Verifiziert</span>}
                </div>
                <span className="text-xs text-muted-foreground">{r.time}</span>
              </div>
              <div className="flex text-highlight text-sm mb-2">
                {Array.from({ length: r.rating }).map((_, j) => <span key={j}>★</span>)}
                {Array.from({ length: 5 - r.rating }).map((_, j) => <span key={j} className="text-muted-foreground/30">★</span>)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
