import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";

const policies: Record<string, { title: string; content: string[] }> = {
  datenschutz: {
    title: "Datenschutzerklärung",
    content: [
      "1. Verantwortlicher\nElecChairDE GmbH, Musterstraße 12, 10115 Berlin, Deutschland\nE-Mail: support@elecchairde.shop",
      "2. Erhebung und Verarbeitung personenbezogener Daten\nWir erheben personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Dienste erforderlich ist. Dazu gehören: Name, E-Mail-Adresse, Lieferadresse und Zahlungsinformationen.",
      "3. Zweck der Datenverarbeitung\nIhre Daten werden ausschließlich zur Abwicklung Ihrer Bestellung, zur Kommunikation und zur Verbesserung unseres Angebots verwendet.",
      "4. Weitergabe an Dritte\nEine Weitergabe Ihrer Daten an Dritte erfolgt nur im Rahmen der Vertragserfüllung (z.B. an Versanddienstleister) oder wenn eine gesetzliche Verpflichtung besteht.",
      "5. Cookies\nUnsere Website verwendet technisch notwendige Cookies. Analyse-Cookies werden nur mit Ihrer Einwilligung gesetzt.",
      "6. Ihre Rechte\nSie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten gemäß DSGVO. Kontaktieren Sie uns unter support@elecchairde.shop.",
      "7. Aufbewahrung\nPersonenbezogene Daten werden nur so lange gespeichert, wie es für die Erfüllung des Verarbeitungszwecks erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen."
    ],
  },
  widerrufsrecht: {
    title: "Widerrufsbelehrung",
    content: [
      "Widerrufsrecht\nSie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.",
      "Widerrufsfrist\nDie Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter die Waren in Besitz genommen haben.",
      "Ausübung des Widerrufsrechts\nUm Ihr Widerrufsrecht auszuüben, müssen Sie uns (Elec Chair, Musterstraße 12, 10115 Berlin, support@elecchairde.shop) mittels einer eindeutigen Erklärung informieren.",
      "Folgen des Widerrufs\nWenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten, unverzüglich und spätestens binnen vierzehn Tagen zurückzuzahlen.",
      "Rücksendung\nSie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf unterrichten, an uns zurückzusenden.",
    ],
  },
  agb: {
    title: "Allgemeine Geschäftsbedingungen (AGB)",
    content: [
      "1. Geltungsbereich\nDiese Allgemeinen Geschäftsbedingungen gelten für alle Bestellungen über unseren Online-Shop.",
      "2. Vertragsschluss\nDie Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar. Durch Anklicken des Bestellbuttons geben Sie eine verbindliche Bestellung ab.",
      "3. Preise und Zahlung\nAlle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Versandkosten entfallen bei Lieferung innerhalb Deutschlands. Die Zahlung erfolgt über PayPal.",
      "4. Lieferung\nDie Lieferung erfolgt an die von Ihnen angegebene Adresse. Die Lieferzeit beträgt in der Regel 2–3 Werktage innerhalb Deutschlands.",
      "5. Eigentumsvorbehalt\nDie gelieferte Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.",
      "6. Gewährleistung\nEs gelten die gesetzlichen Gewährleistungsrechte. Zusätzlich bieten wir eine 2-Jahres-Garantie auf den Elec Chair.",
      "7. Haftung\nWir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit.",
      "8. Anwendbares Recht\nEs gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Berlin."
    ],
  },
  versand: {
    title: "Versandinformationen",
    content: [
      "Kostenloser Versand\nWir bieten kostenlosen Versand für alle Bestellungen innerhalb Deutschlands an.",
      "Lieferzeiten\nStandardversand: 2–3 Werktage innerhalb Deutschlands.",
      "Versanddienstleister\nWir versenden mit DHL und DPD. Nach dem Versand erhalten Sie eine Sendungsverfolgungsnummer per E-Mail.",
      "Liefergebiet\nWir liefern derzeit nur innerhalb Deutschlands.",
      "Verpackung\nAlle Elec Chair Produkte werden sicher und sorgfältig verpackt.",
      "Lieferprobleme\nSollte Ihre Bestellung nicht innerhalb der angegebenen Lieferzeit eintreffen, kontaktieren Sie uns bitte unter support@elecchairde.shop.",
    ],
  },
};

const policyLinks = [
  { slug: "datenschutz", label: "Datenschutz" },
  { slug: "widerrufsrecht", label: "Widerrufsrecht" },
  { slug: "agb", label: "AGB" },
  { slug: "versand", label: "Versand" },
];

const Policies = () => {
  const { slug } = useParams<{ slug: string }>();
  const policy = policies[slug || ""] || policies.datenschutz;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-8">
            {policyLinks.map((p) => (
              <Link key={p.slug} to={`/policies/${p.slug}`} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${slug === p.slug ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {p.label}
              </Link>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">{policy.title}</h1>
          <div className="space-y-6">
            {policy.content.map((section, i) => {
              const [heading, ...body] = section.split("\n");
              return (
                <div key={i}>
                  <h2 className="text-lg font-bold text-foreground mb-1">{heading}</h2>
                  {body.map((line, j) => (
                    <p key={j} className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Policies;
