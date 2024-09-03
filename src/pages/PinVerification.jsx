import { getCode, getUserFromEmail, sendCode } from "../lib/api";
import { useState } from "react";

export default function PinVerify() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifying, setVerifying] = useState(false);

  const verifyCode = () => {
    getCode(email).then((userCode) => {
      if (!userCode.code) {
        setErrorMessage("No code found found");
        return;
      }
      if (userCode.code !== code) {
        setErrorMessage("Invalid code!");
        return;
      }
    });
  };

  const handlePin = (e) => {
    setCode(e.target.value.toUpperCase());
    if (code.length === 6 && !verifying) {
      verifyCode();
      setVerifying(true);
    } else setVerifying(false);
  };

  return (
    <div className="container">
      <p style={{ color: "red" }}>{errorMessage}</p>
      <div className="send-email">
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
        />
        <button>Send</button>
      </div>
      <div className="pin-area">
        <input
          type="text"
          name="pin"
          id="pin-box"
          maxLength={6}
          value={code}
          onChange={handlePin}
        />
      </div>
    </div>
  );
}
