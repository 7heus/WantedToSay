import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
<<<<<<< HEAD
import HomePage from "./pages/HomePage";
=======
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/isAnon";
>>>>>>> FrontEndDeveloping

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
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
