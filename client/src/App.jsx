import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calendar from "./pages/Student/Calender";
import ClassListPage from "./pages/Student/ClassList";
import Upload from "./pages/Professor/Upload";
import StudentDashboard from "./pages/Student/StudentDashboard";
import ProfessorDashboard from "./pages/Professor/ProfessorDashboard";
import Invite from "./pages/Professor/Invite";
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
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/class-list" element={<ClassListPage />} />
          <Route exact path="/student" element={<StudentDashboard />} />
          <Route exact path="/professor" element={<ProfessorDashboard />} />
          <Route exact path="/invite" element={<Invite />} />
          <Route exact path="/upload" element={<Upload />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
