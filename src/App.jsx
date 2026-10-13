import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BotonArriba from "./components/ui/BotonArriba";
import Home from "./pages/Home";
import Emergencias from "./pages/Emergencias";
import Recursos from "./pages/Recursos";
import Refugios from "./pages/Refugios";
import Voluntarios from "./pages/Voluntarios";
import Solicitudes from "./pages/Solicitudes";
import ScrollArriba from "./components/ui/ScrollArriba";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollArriba />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emergencias" element={<Emergencias />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/refugios" element={<Refugios />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
      </Routes>

      <Footer />
      <BotonArriba />
    </BrowserRouter>
  );
}