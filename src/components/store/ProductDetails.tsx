const ProductDetails = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Warum ein gewichtetes Kuscheltier?
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Vergleiche — Schlafen mit und ohne gewichteten Kuschelfreund.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-background rounded-xl p-6 border">
            <h3 className="font-bold text-foreground text-lg mb-4">Ohne gewichtetes Kuscheltier</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Hin- und Herwälzen die ganze Nacht</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Angst macht es schwer, sich zu entspannen</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Kein beruhigender Druck zum Einschlafen</li>
              <li className="flex items-start gap-2"><span className="text-sale font-bold">❌</span> Unruhiger, schlechter Schlaf</li>
            </ul>
          </div>

          <div className="bg-background rounded-xl p-6 border border-primary/30">
            <h3 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
              Mit Rosa Kuh-Kuscheltier <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">Empfohlen</span>
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> Sanftes Gewicht reduziert Angst & Stress</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> Steigert Serotonin für bessere Stimmung</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> Schneller einschlafen durch beruhigende Umarmung</li>
              <li className="flex items-start gap-2"><span className="text-primary font-bold">✔</span> Ultra-weiches Premium-Plüschmaterial</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;