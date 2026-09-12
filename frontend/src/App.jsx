import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistProvider";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import PopularCategories from "./components/PopularCategories/PopularCategories";
import DealsSection from "./components/DealsSection/DealsSection";
import MarketplaceSection from "./components/MarketplaceSection/MarketplaceSection";
import PopularSellers from "./components/PopularSellers/PopularSellers";
import CallToActionBanner from "./components/CallToActionBanner/CallToActionBanner";
import Footer from "./components/Footer/Footer";
import AccountDashboard from "./components/AccountDashboard/AccountDashboard";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function Home() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <DealsSection />
      <MarketplaceSection />
      <PopularSellers />
      <CallToActionBanner />
      <Footer />
    </>
  );
}

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/account"
            element={
              <>
                <AccountDashboard />
                <Footer />
              </>
            }
          />
          <Route path="*" element={<Home />} />
          <Route
            path="/product/:id"
            element={
              <>
                <ProductDetails />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;