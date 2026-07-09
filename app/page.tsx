import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ZahleStory from "./components/ZahleStory";
import Menu from "./components/Menu";
import SpecialOrders from "./components/SpecialOrders";
import Reservation from "./components/Reservation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <ZahleStory />
      <Menu />
      <SpecialOrders />
      <Reservation />
      <Contact />
      <Footer />
    </main>
  );
}
