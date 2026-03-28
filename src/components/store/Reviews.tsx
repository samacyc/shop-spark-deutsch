const reviews = [
  { name: "Renee W.", rating: 5, text: "I absolutely love him! I bought him to help with my anxiety and he is the perfect weight and soft as can be. Best purchase I've made in a long time!", time: "2 weeks ago", verified: true },
  { name: "Mariah T.", rating: 5, text: "Omg this is my new favorite stuffed animal. The fur is softer than ANY plush I've ever owned, you need to feel it in person. Love that it's weighted too!", time: "1 month ago", verified: true },
  { name: "Audrey K.", rating: 5, text: "I wasn't expecting much, but it's like a cloud pillow! Like a cow-shaped marshmallow! It's so soft and squishy! I'm tempted to buy another one for myself!", time: "2 months ago", verified: true },
  { name: "Andrea S.", rating: 5, text: "I absolutely love this highland cow! It is adorable, soft, perfect size to cuddle and the color is exquisite. Its eyes are so expressive. It microwaves easily when you want something warm to cuddle!", time: "3 months ago", verified: true },
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
          Customer Reviews
        </h2>
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-highlight text-lg">
              {"★★★★★".split("").map((_, i) => <span key={i}>★</span>)}
            </div>
            <span className="text-foreground font-bold">{avgRating}</span>
            <span className="text-muted-foreground text-sm">({totalReviews} reviews)</span>
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
                  {r.verified && <span className="text-xs text-primary font-medium flex items-center gap-1">✓ Verified</span>}
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