import { RotateCcw, Shield, Lock, Truck } from "lucide-react";

const badges = [
  { icon: RotateCcw, title: "Kostenlose Rückgabe", desc: "30 Tage risikofrei testen" },
  { icon: Shield, title: "10 Jahre Garantie", desc: "Stahlverstärkter Rahmen für langlebigen Schutz" },
  { icon: Lock, title: "Sicherer Einkauf", desc: "Geschützte & verschlüsselte Zahlung" },
  { icon: Truck, title: "Schneller Versand", desc: "Zügige Lieferung direkt zu Ihnen" },
];

const TrustBadges = () => {
  return (
    <section className="py-10 border-t">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {badges.map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <b.icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground text-sm">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
