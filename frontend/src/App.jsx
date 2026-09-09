import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import PopularCategories from "./components/PopularCategories/PopularCategories";
import DealsSection from "./components/DealsSection/DealsSection";
import MarketplaceSection from "./components/MarketplaceSection/MarketplaceSection";
import PopularSellers from "./components/PopularSellers/PopularSellers";

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <PopularCategories />
      <DealsSection />
      <MarketplaceSection />
      <PopularSellers />
    </>
  )
}

export default App
