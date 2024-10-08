import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon.jsx";
import AboutUs from "./pages/AboutUs";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfile from "./pages/UserProfile";
import VerifyUser from "./pages/VerifyEmail";
import AboutTheProject from "./pages/AboutTheProject";
import MessagePage from "./pages/MessagePage";
import NewMessagePage from "./pages/NewMessagePage";
import MessageDetailPage from "./pages/MessageDetailsPage";
import PinVerify from "./pages/PinVerification";
import VerifyNow from "./components/VerifyNow";
import { useState } from "react";
const noFooterPaths = ["/signup", "/login"];

function App() {
  const location = useLocation();
  const [verifying, setVerifying] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <VerifyNow verifying={verifying} />
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
        <Route
          path="/email/verify/:userId"
          element={<VerifyUser setVerifying={setVerifying} />}
        />
        <Route path="/reset-password" element={<PinVerify />} />
        <Route path="/wantedtosay" element={<AboutTheProject />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/new-message" element={<NewMessagePage />} />
        <Route path="/messages/:id" element={<MessageDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Sidebar />
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
