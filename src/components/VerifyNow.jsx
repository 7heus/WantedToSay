import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import "./VerifyNow.css";

export default function VerifyNow() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && !user?.isVerified) {
      setIsOpen(true);
    }
  }, [user]);

  return (
    <>
      {isOpen && (
        <div className="verify-alert">
          <div className="inner-box">
            <hr />
            <p>
              Your email is not verified! Click{" "}
              <a href={`http://localhost:5173/email/verify/${user._id}`}>
                here
              </a>{" "}
              to verify.{" "}
            </p>
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
