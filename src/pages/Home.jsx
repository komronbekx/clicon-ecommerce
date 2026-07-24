import Hero from "../components/Hero/Hero";
import BestDeals from "../components/BestDeals/BestDeals";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import PromoBanners from "../components/PromoBanners/PromoBanners";
import ComputerAccessories from "../components/ComputerAccessories/ComputerAccessories";
import MacbookBanner from "../components/MacbookBanner/MacbookBanner";
import LatestNews from "../components/LatestNews/LatestNews";
import Newsletter from "../components/Newsletter/Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <BestDeals />
      <Categories />
      <FeaturedProducts />
      <PromoBanners />
      <ComputerAccessories />
      <MacbookBanner />
      <LatestNews />
      <Newsletter />
    </>
  );
}

export default Home;
