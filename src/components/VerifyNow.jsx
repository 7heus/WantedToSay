import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import "./VerifyNow.css";

export default function VerifyNow({ verifying }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!verifying && user && !user?.isVerified) {
      setIsOpen(true);
    }
  }, [user]);

  return (
    <>
      {isOpen && (
        <div className="verify-alert">
          <div className="inner-box">
            <hr />
            <p>Your email is not verified! Please check your email.</p>
            <hr />
            <p id="close-button" onClick={() => setIsOpen(false)}>
              Close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
