import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistProvider";
import CartProvider from "./context/CartProvider";
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
import CartPanel from "./components/CartPanel/CartPanel";
import Checkout from "./components/Checkout/Checkout";
import CategoryPage from "./components/CategoryPage/CategoryPage";

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
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <CartPanel />
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
            <Route
              path="/account/:tab"
              element={
                <>
                  <AccountDashboard />
                  <Footer />
                </>
              }
            />
            <Route path="*" element={<Home />} />
            <Route
              path="/browse/:slug"
              element={
                <>
                  <CategoryPage />
                  <Footer />
                </>
              }
            />
            <Route
              path="/product/:id"
              element={
                <>
                  <ProductDetails />
                  <Footer />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <Checkout />
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;