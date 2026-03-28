const ProductDetails = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Why a Weighted Plush?
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Compare — sleeping with and without a weighted companion.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-background rounded-xl p-6 border">
            <h3 className="font-bold text-foreground text-lg mb-4">Without Weighted Plush</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Tossing and turning all night</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Anxiety makes it hard to relax</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> No comforting pressure for calm</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Restless, low-quality sleep</li>
            </ul>
          </div>

          <div className="bg-background rounded-xl p-6 border border-primary/30">
            <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
              With Rosa Cow Plush <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">Recommended</span>
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> Gentle weight reduces anxiety & stress</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> Increases serotonin for better mood</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> Fall asleep faster with comforting hug</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> Ultra-soft premium plush material</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;