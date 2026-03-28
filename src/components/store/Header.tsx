import { Search, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/kontakt", label: "Contact" },
    { href: "/bestellung-verfolgen", label: "Track Order" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex items-center justify-between h-14 md:h-16">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-tight text-primary shrink-0">
          rosa 🌸
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-muted-foreground">
          <button className="hover:text-foreground transition-colors" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-foreground transition-colors" aria-label="Account">
            <User className="w-5 h-5" />
          </button>
          <button className="md:hidden hover:text-foreground transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden border-t bg-background px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground py-1.5"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;