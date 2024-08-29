import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/crud";

export default function VerifyUser() {
  const [loading, setLoading] = useState(true);
  const [serverResponse, setServerResponse] = useState("");
  const { userId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    verifyEmail(userId)
      .then((data) => {
        setLoading(false);
        setServerResponse(data.message);
      })
      .catch(() => {
        setServerResponse("Internal server error");
      });
  }, []);

  useEffect(() => {
    setTimeout(() => window.close(), 5000);
  }, [loading]);

  return (
    <div>
      <p>{loading ? serverResponse : "Verified! Redirecting..."}</p>
    </div>
  );
}
