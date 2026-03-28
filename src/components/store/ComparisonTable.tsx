const ComparisonTable = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Warum der Turn2Me™ die beste Wahl ist
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Vergleichen Sie selbst — Sicherheit, Komfort und Preis-Leistung.
        </p>

        <div className="max-w-2xl mx-auto overflow-x-auto -mx-4 px-4 md:mx-auto md:px-0">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Funktionen</th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Standard Kindersitz</th>
                <th className="text-center py-3 px-4 font-bold text-primary">✦ Turn2Me™</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">360° Drehfunktion</td>
                <td className="py-3 px-4 text-center text-muted-foreground">✖</td>
                <td className="py-3 px-4 text-center font-bold text-primary">✔</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">3-in-1 Mitwachsend</td>
                <td className="py-3 px-4 text-center text-muted-foreground">1 Modus</td>
                <td className="py-3 px-4 text-center font-bold text-primary">3 Modi (4–100 lb)</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Einbauzeit</td>
                <td className="py-3 px-4 text-center text-muted-foreground">10+ Minuten</td>
                <td className="py-3 px-4 text-center font-bold text-primary"><td className="py-3 px-4 text-center font-bold text-primary">{"< 1 Minute"}</td></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Aufprallschutz</td>
                <td className="py-3 px-4 text-center text-muted-foreground">Standard</td>
                <td className="py-3 px-4 text-center font-bold text-primary">ProtectPlus™</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Flugzeug-zertifiziert</td>
                <td className="py-3 px-4 text-center text-muted-foreground">✖</td>
                <td className="py-3 px-4 text-center font-bold text-primary">✔</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Nutzungsdauer</td>
                <td className="py-3 px-4 text-center text-muted-foreground">3–5 Jahre</td>
                <td className="py-3 px-4 text-center font-bold text-primary">10 Jahre</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
