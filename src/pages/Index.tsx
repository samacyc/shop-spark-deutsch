import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import ProductGallery from "@/components/store/ProductGallery";
import ProductInfo from "@/components/store/ProductInfo";
import ProductDetails from "@/components/store/ProductDetails";
import Steps from "@/components/store/Steps";
import ComparisonTable from "@/components/store/ComparisonTable";
import WhyChoose from "@/components/store/WhyChoose";
import FAQ from "@/components/store/FAQ";
import Reviews from "@/components/store/Reviews";
import TrustBadges from "@/components/store/TrustBadges";
import Footer from "@/components/store/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <section id="product" className="py-6 sm:py-8 md:py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <ProductGallery />
            <ProductInfo />
          </div>
        </div>
      </section>

      <ProductDetails />
      <Steps />
      <FAQ />
      <ComparisonTable />
      <WhyChoose />
      <Reviews />
      <TrustBadges />
      <Footer />
    </div>
  );
};

export default Index;
