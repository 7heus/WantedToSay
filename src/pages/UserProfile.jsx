import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { updateUser } from "../lib/crud";
import "./UserProfile.css";
import { getUserKey } from "../lib/api";

export default function UserProfile() {
  const { user, update } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value.replace(/\s/g, ""));
  const handleKey = (e) => setUniqueKey(e.target.value.replace(/\s/g, ""));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      name,
      email,
      uniqueKey: uniqueKey ? uniqueKey : "c001k3y",
    };
    updateUser(user._id, formattedData).then(() => update(user._id));
    return false;
  };

  useEffect(() => {
    if (user) {
      getUserKey(user._id).then((key) => setUniqueKey(key));
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
