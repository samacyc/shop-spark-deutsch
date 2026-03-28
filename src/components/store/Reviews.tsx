const reviews = [
  { name: "Renee W.", rating: 5, text: "Ich liebe ihn! Ich habe ihn gegen meine Angst gekauft und er hat das perfekte Gewicht und ist super weich. Bester Kauf seit langem!", time: "vor 2 Wochen", verified: true },
  { name: "Mariah T.", rating: 5, text: "Oh mein Gott, das ist mein neues Lieblingskuscheltier. Das Fell ist weicher als JEDES Plüschtier, das ich je besessen habe. Man muss es persönlich fühlen. Und dass es gewichtet ist, liebe ich!", time: "vor 1 Monat", verified: true },
  { name: "Audrey K.", rating: 5, text: "Ich hatte nicht viel erwartet, aber es ist wie ein Wolkenkissen! Wie ein kuhförmiger Marshmallow! So weich und kuschelig! Ich bin versucht, noch einen für mich zu kaufen!", time: "vor 2 Monaten", verified: true },
  { name: "Andrea S.", rating: 5, text: "Ich liebe diese Highland-Kuh! Sie ist bezaubernd, weich, perfekte Größe zum Kuscheln und die Farbe ist wunderschön. Die Augen sind so ausdrucksvoll. Man kann sie sogar in der Mikrowelle erwärmen!", time: "vor 3 Monaten", verified: true },
];

const ratingDistribution = [
  { stars: 5, count: 4 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const totalReviews = 4;
const avgRating = 5.0;

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
              {"★★★★★".split("").map((_, i) => <span key={i}>★</span>)}
            </div>
            <span className="text-foreground font-bold">{avgRating.toFixed(1).replace(".", ",")}</span>
            <span className="text-muted-foreground text-sm">({totalReviews} Bewertungen)</span>
          </div>
          <div className="w-full max-w-xs space-y-1">
            {ratingDistribution.map((r) => (
              <div key={r.stars} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-muted-foreground text-right">{r.stars}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-highlight rounded-full" style={{ width: `${totalReviews > 0 ? (r.count / totalReviews) * 100 : 0}%` }} />
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