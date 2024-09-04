{
  /*import { useContext } from "react";
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
  
} */
}

import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { updateUser } from "../lib/crud";
import "./UserProfile.css";
import { getUserKey } from "../lib/api";

import avatar1 from "../assets/avatars/avatar1.png";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import avatar4 from "../assets/avatars/avatar4.png";
import avatar5 from "../assets/avatars/avatar5.png";
import avatar6 from "../assets/avatars/avatar6.png";

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

export default function UserProfile() {
  const { user, update } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleKey = (e) => setUniqueKey(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      name,
      email,
      uniqueKey: uniqueKey ? uniqueKey : "c001k3y",
      avatar: selectedAvatar,
    };
    updateUser(user._id, formattedData).then(() => update(user._id));
    return false;
  };

  useEffect(() => {
    if (user) {
      getUserKey(user._id).then((key) => setUniqueKey(key));
      setEmail(user.email);
      setName(user.name);
      setSelectedAvatar(user.avatar || avatars[0]);
    }
  }, [user]);

  return (
    <div className="page">
      <div className="card">
        <p>Your settings</p>
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            Name: <br />
            <input type="text" name="name" value={name} onChange={handleName} />
          </label>
          <br />
          <br />
          <label>
            Email: <br />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </label>
          <br />
          <br />
          <label>
            Encryption Key: <br />
            <input
              type="password"
              name="encryption"
              value={uniqueKey}
              onChange={handleKey}
            />
          </label>
          <br />
          <br />
          <label>Choose an avatar:</label>
          <div className="avatar-selection">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`avatar ${
                  selectedAvatar === avatar ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(avatar)}
              />
            ))}
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
