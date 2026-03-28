import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const UNIT_PRICE = 9.95;
const ORIGINAL_PRICE = 29.99;

const features = [
  { icon: "😌", label: "Anxiety Relief" },
  { icon: "🤗", label: "Comforting Weight" },
  { icon: "☁️", label: "Ultra Soft & Cozy" },
  { icon: "🌙", label: "Better Sleep" },
  { icon: "🎁", label: "Perfect Gift" },
  { icon: "🧸", label: "Premium Plush" },
];

const ProductInfo = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const total = (qty * UNIT_PRICE).toFixed(2);
  const savings = ((ORIGINAL_PRICE - UNIT_PRICE) * qty).toFixed(2);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
        Weighted Cow Plush
      </h1>

      <div className="flex items-center gap-2">
        <div className="flex text-highlight">
          {"★★★★★".split("").map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">5.0 (4 reviews)</span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-xl text-muted-foreground line-through">
          ${ORIGINAL_PRICE.toFixed(2)}
        </span>
        <span className="text-2xl sm:text-3xl font-extrabold text-foreground">
          ${UNIT_PRICE.toFixed(2)}
        </span>
        <span className="bg-sale text-sale-foreground text-xs font-bold px-2.5 py-1 rounded-full">SAVE $20.04</span>
      </div>

      <div className="bg-accent rounded-lg p-4 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-stock-green animate-pulse" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            Only <strong>9</strong> units remaining — selling fast!
          </p>
          <div className="mt-2 h-2 rounded-full bg-stock-bar overflow-hidden">
            <div className="h-full bg-stock-green rounded-full" style={{ width: "15%" }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {features.map((f) => (
          <span
            key={f.label}
            className="bg-secondary border rounded-full px-3 py-1.5 text-sm font-medium text-foreground flex items-center gap-1.5"
          >
            {f.icon} {f.label}
          </span>
        ))}
      </div>

      <div className="bg-accent rounded-lg p-4 flex items-start gap-3">
        <span className="text-2xl text-primary">🐮</span>
        <div className="flex-1">
          <h3 className="font-bold text-foreground">Sleeping without anxiety has never been so easy...</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Our weighted plushies are perfect for sleep and relaxation. They offer a gentle, comforting hug 
            designed to help you relax — works just like a weighted blanket, just like a hug.
          </p>
        </div>
        <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
          rosa
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center border rounded-lg overflow-hidden self-start">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2.5 sm:py-3 hover:bg-secondary transition-colors text-muted-foreground"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-foreground min-w-[44px] text-center">
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-2.5 sm:py-3 hover:bg-secondary transition-colors text-muted-foreground"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1 gap-2 text-base sm:text-lg font-bold w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => navigate(`/checkout?qty=${qty}`)}
        >
          <Heart className="w-5 h-5" />
          Add to Cart
        </Button>
      </div>

      {qty > 1 && (
        <p className="text-sm text-muted-foreground">
          {qty} × ${UNIT_PRICE.toFixed(2)} = <strong className="text-foreground">${total}</strong>
          <span className="text-primary ml-2">(You save ${savings}!)</span>
        </p>
      )}
    </div>
  );
};

export default ProductInfo;