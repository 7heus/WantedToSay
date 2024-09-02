import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { updateUser } from "../lib/crud";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const nav = useNavigate();

  if (!isLoggedIn) {
    nav("/login");
    return;
  }

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleKey = (e) => setUniqueKey(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      name,
      email,
      uniqueKey: uniqueKey ? uniqueKey : "c001k3y",
    };
    updateUser(user._id, formattedData);
    return false;
  };

  useEffect(() => {
    if (user) {
      setUniqueKey(user.uniqueKey);
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  return (
    <div className="page">
      <div className="card">
        <p>Your settings,</p>
        <form onSubmit={handleSubmit}>
          <label>
            Name:{" "}
            <input type="text" name="name" value={name} onChange={handleName} />
          </label>
          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </label>
          <label>
            Encryption Key:{" "}
            <input
              type="password"
              name="encryption"
              value={uniqueKey}
              onChange={handleKey}
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
  // something
}
