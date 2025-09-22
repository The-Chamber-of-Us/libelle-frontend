import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VolunteerFormPage from "./pages/VolunteerFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/volunteer" element={<VolunteerFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
