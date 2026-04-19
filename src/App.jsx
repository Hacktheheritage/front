import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PlacesPage from "./pages/PlacesPage";
import MapPage from "./pages/MapPage";
import CalendarPage from "./pages/CalendarPage";
import AboutPage from "./pages/AboutPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { HomeContentProvider } from "./contexts/HomeContentContext";
import { AdminAuthProvider, useAdminAuth } from "./contexts/AdminAuthContext";

function AdminRoute({ children }) {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? children : <Navigate to="/admin-login" replace />;
}

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <AdminAuthProvider>
      <HomeContentProvider>
        <div className="min-h-screen bg-[#f4efe5] text-slate-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminRoute><AdminPanelPage /></AdminRoute>} />
        </Routes>
        <Footer />
        {!isHomePage && <Chatbot />}
      </div>
      </HomeContentProvider>
    </AdminAuthProvider>
  );
}

export default App;
