import { useState } from "react";
import cs1 from "@/assets/products/carseat/carseat1.jpg";
import cs2 from "@/assets/products/carseat/carseat2.jpg";
import cs3 from "@/assets/products/carseat/carseat3.jpg";
import cs4 from "@/assets/products/carseat/carseat4.jpg";
import cs5 from "@/assets/products/carseat/carseat5.jpg";
import cs6 from "@/assets/products/carseat/carseat6.jpg";
import cs7 from "@/assets/products/carseat/carseat7.jpg";
import cs8 from "@/assets/products/carseat/carseat8.jpg";

const images = [cs1, cs2, cs3, cs4, cs5, cs6, cs7, cs8];

const ProductGallery = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
        <img src={images[selected]} alt="Turn2Me™ 3-in-1 Drehbarer Kindersitz" className="w-full h-full object-contain p-6" />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
              selected === i ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
            }`}
          >
            <img src={img} alt={`Produktbild ${i + 1}`} loading="lazy" className="w-full h-full object-contain p-1.5 bg-secondary" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
