import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PlacesPage from "./pages/PlacesPage";
import MapPage from "./pages/MapPage";
import CalendarPage from "./pages/CalendarPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-[#f4efe5] text-slate-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
      {!isHomePage && <Chatbot />}
    </div>
  );
}

export default App;
