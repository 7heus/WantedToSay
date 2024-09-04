import {
  getCode,
  getUserFromEmail,
  sendCode,
  updatePassword,
} from "../lib/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PinVerification.css";

export default function PinVerify() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  const nav = useNavigate();

  const verifyCode = () => {
    getCode(email)
      .then((userCode) => {
        document.body.style.cursor = "wait";
        if (!userCode.code) {
          setErrorMessage("No code found found");
          return;
        }
        if (userCode.code !== code) {
          setErrorMessage("Invalid code!");
          return;
        }
        setIsVerified(true);
      })
      .finally(() => {
        document.body.style.cursor = "default";
      })
      .catch((err) => setErrorMessage("Code is invalid"));
  };

  const handlePin = (e) => {
    e.preventDefault();
    setCode(e.target.value.toUpperCase());
    setErrorMessage("");
  };

  const handleSend = (e) => {
    e.preventDefault();
    getUserFromEmail(email).then((user) => {
      if (!user) {
        setErrorMessage("User does not exist!");
        return;
      }
      sendCode(user?.email || email).then(() => {
        setCodeSent(true);
        setErrorMessage("Check your email!");
        setTimeout(() => setErrorMessage(""), 5000);
      });
    });
  };

  const handleNewPass = (e) => setNewPass(e.target.value.replace(/\s/g, ""));
  const handleConfirmPass = (e) =>
    setConfirmNewPass(e.target.value.replace(/\s/g, ""));

  const updatePass = (e) => {
    e.preventDefault();
    if (!passwordRegex.test(newPass) && !passwordRegex.test(confirmNewPass)) {
      setIsVerified(false);
      setErrorMessage(
        "Password must have 6 letters, one number,\none upper case, and one special character."
      );
      return;
    }
    if (newPass !== confirmNewPass) {
      setCodeSent(false);
      setErrorMessage("Both passwords must match!");
      return;
    }
    updatePassword(email, newPass, code)
      .then((res) => {
        console.warn(res);
        if (res.response.statusCode >= 400) {
          setIsVerified(false);
          setErrorMessage(res.response.message);
          return;
        }
        setIsVerified(true);
      })
      .catch((err) => {
        setIsVerified(false);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setErrorMessage(
          isVerified
            ? "Password updated! Redirecting you to login page..."
            : "Password format is invalid"
        );
        setTimeout(() => nav("/login"), 3000);
      });
  };

  useEffect(() => {
    if (code.length > 5 && !verifying) {
      verifyCode();
      setVerifying(true);
    } else setVerifying(false);
  }, [code]);

  return (
    <div className="container">
      <div className="form-container">
        <h1>Reset Your Password</h1>
        <p style={{ color: codeSent ? "green" : "red" }}>{errorMessage}</p>
        {isVerified ? (
          <>
            <label htmlFor="NewPass">New Password</label>
            <input
              type="password"
              name="NewPass"
              id="NewPass"
              value={newPass}
              onChange={handleNewPass}
            />
            <label htmlFor="ConfirmNewPass">Confirm New Password</label>
            <input
              type="password"
              name="ConfirmNewPass"
              id="ConfirmNewPass"
              value={confirmNewPass}
              onChange={handleConfirmPass}
            />
            <button onClick={updatePass}>Change</button>
          </>
        ) : (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
            />
            <button onClick={handleSend}>Send</button>
            <label htmlFor="pin">PIN Code</label>
            <input
              type="text"
              name="pin"
              id="pin-box"
              maxLength={6}
              value={code}
              onChange={handlePin}
            />
          </>
        )}
      </div>
    </div>
  );
}
