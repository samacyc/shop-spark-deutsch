const ComparisonTable = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Warum Rosa Plush die beste Wahl ist
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Überzeuge dich selbst — Qualität, Komfort und Preis-Leistung.
        </p>

        <div className="max-w-2xl mx-auto overflow-x-auto -mx-4 px-4 md:mx-auto md:px-0">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Eigenschaften</th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Normales Plüschtier</th>
                <th className="text-center py-3 px-4 font-bold text-primary">✦ Rosa Kuh-Plüsch</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Gewichtetes Design</td>
                <td className="py-3 px-4 text-center text-muted-foreground">✖</td>
                <td className="py-3 px-4 text-center font-bold text-primary">✔</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Ultra-weiches Fell</td>
                <td className="py-3 px-4 text-center text-muted-foreground">Standard</td>
                <td className="py-3 px-4 text-center font-bold text-primary">Premium Plüsch</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Angstlinderung</td>
                <td className="py-3 px-4 text-center text-muted-foreground">✖</td>
                <td className="py-3 px-4 text-center font-bold text-primary">✔ Bewährt</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Mikrowellengeeignet</td>
                <td className="py-3 px-4 text-center text-muted-foreground">✖</td>
                <td className="py-3 px-4 text-center font-bold text-primary">✔</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Geschenkbereit</td>
                <td className="py-3 px-4 text-center text-muted-foreground">Standard</td>
                <td className="py-3 px-4 text-center font-bold text-primary">Premium Box</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Kundenbewertung</td>
                <td className="py-3 px-4 text-center text-muted-foreground">3,5 ★</td>
                <td className="py-3 px-4 text-center font-bold text-primary">5,0 ★</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;