import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import "./SignupPage.css";

import avatar1 from "../assets/avatars/avatar1.png";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import avatar4 from "../assets/avatars/avatar4.png";
import avatar5 from "../assets/avatars/avatar5.png";
import avatar6 from "../assets/avatars/avatar6.png";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [uniqueKey, setUniqueKey] = useState("c001k3y");
  const [selectedAvatar, setSelectedAvatar] = useState(
    "../assets/avatars/avatar1.png"
  );

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleKey = (e) => setUniqueKey(e.target.value);

  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    console.log("Selected Avatar on Submit:", selectedAvatar);

    //creating an object
    const requestBody = {
      email,
      password,
      name,
      uniqueKey,
      avatar: `${selectedAvatar}`,
    };

    // If the POST request is a successful redirect to the login page
    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .finally(() => console.log(selectedAvatar))
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "An unknown error occured";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <form onSubmit={handleSignupSubmit}>
        <h1>Sign Up</h1>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Encryption key:</label>
        <input
          type="password"
          name="key"
          value={uniqueKey}
          onChange={handleKey}
        />
        <label>Choose an avatar:</label>
        <div className="avatar-selection">
          {[avatar1, avatar2, avatar3, avatar4, avatar5, avatar6].map(
            (avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`avatar ${
                  selectedAvatar === avatar ? "selected" : ""
                }`}
                onClick={() => handleAvatarSelection(avatar)}
              />
            )
          )}
        </div>

        <button type="submit">Sign Up</button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default SignupPage;
