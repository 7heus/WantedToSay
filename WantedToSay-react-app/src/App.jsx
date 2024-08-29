import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/isAnon";
import AboutUs from "./pages/AboutUs";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfile from "./pages/UserProfile";

const noFooterPaths = ["/signup", "/login"];

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Sidebar />
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
