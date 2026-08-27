import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LinkAnalytics from "./pages/LinkAnalytics";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./store/AuthContext";
import { LinksProvider } from "./store/LinksContext";

function App() {
  return (
    <AuthProvider>
      <LinksProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/analytics/:id" element={<LinkAnalytics />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </LinksProvider>
    </AuthProvider>
  );
}

export default App;
