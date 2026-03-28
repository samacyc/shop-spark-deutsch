const ComparisonTable = () => {
  return (
    <section className="py-16 bg-section-alt">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-foreground">
          Why Rosa Plush Is the Best Choice
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          See the difference — quality, comfort, and value.
        </p>

        <div className="max-w-2xl mx-auto overflow-x-auto -mx-4 px-4 md:mx-auto md:px-0">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Features</th>
                <th className="text-center py-3 px-4 font-semibold text-muted-foreground">Regular Plush</th>
                <th className="text-center py-3 px-4 font-bold text-primary">✦ Rosa Cow Plush</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Weighted Design</td>
                <td className="py-3 px-4 text-center text-muted-foreground">✖</td>
                <td className="py-3 px-4 text-center font-bold text-primary">✔</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Ultra-Soft Fur</td>
                <td className="py-3 px-4 text-center text-muted-foreground">Standard</td>
                <td className="py-3 px-4 text-center font-bold text-primary">Premium Plush</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Anxiety Relief</td>
                <td className="py-3 px-4 text-center text-muted-foreground">✖</td>
                <td className="py-3 px-4 text-center font-bold text-primary">✔ Proven</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Microwaveable</td>
                <td className="py-3 px-4 text-center text-muted-foreground">✖</td>
                <td className="py-3 px-4 text-center font-bold text-primary">✔</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Gift-Ready</td>
                <td className="py-3 px-4 text-center text-muted-foreground">Basic</td>
                <td className="py-3 px-4 text-center font-bold text-primary">Premium Box</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Customer Rating</td>
                <td className="py-3 px-4 text-center text-muted-foreground">3.5 ★</td>
                <td className="py-3 px-4 text-center font-bold text-primary">5.0 ★</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;