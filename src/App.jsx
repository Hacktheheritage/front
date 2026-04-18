import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuoteSection from "./components/QuoteSection";
import PlacesSection from "./components/PlacesSection";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <main>
        <Hero />
        <QuoteSection />
        <PlacesSection />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
