import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/70 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Link to="/" className="font-extrabold text-lg text-background mb-1 block">
               Liovero
            </Link>
            <p className="text-sm">© 2026 Liovero. Alle Rechte vorbehalten.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
            <Link to="/policies/datenschutz" className="hover:text-background transition-colors">Datenschutz</Link>
            <Link to="/policies/widerrufsrecht" className="hover:text-background transition-colors">Widerrufsrecht</Link>
            <Link to="/policies/agb" className="hover:text-background transition-colors">AGB</Link>
            <Link to="/policies/versand" className="hover:text-background transition-colors">Versand</Link>
            <Link to="/kontakt" className="hover:text-background transition-colors">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;