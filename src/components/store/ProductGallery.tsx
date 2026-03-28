import { useState } from "react";
import p1 from "@/assets/products/plush/plush1.jpg";
import p2 from "@/assets/products/plush/plush2.jpg";
import p3 from "@/assets/products/plush/plush3.jpg";
import p4 from "@/assets/products/plush/plush4.jpg";
import p5 from "@/assets/products/plush/plush5.jpg";
import p6 from "@/assets/products/plush/plush6.jpg";

const images = [p1, p2, p3, p4, p5, p6];

const ProductGallery = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
        <img src={images[selected]} alt="Weighted Cow Plush" className="w-full h-full object-cover" width={1024} height={1024} />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
              selected === i ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
            }`}
          >
            <img src={img} alt={`Product image ${i + 1}`} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover bg-secondary" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;