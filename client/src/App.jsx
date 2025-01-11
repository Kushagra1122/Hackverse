import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function App() {
  return (
    <>
      <div className="font-sans">
        {/* Navbar */}
        
          <Navbar />

          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
    

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
