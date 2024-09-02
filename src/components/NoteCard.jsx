
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";
import { decryptMessages } from "../lib/api";
import { AuthContext } from "../context/auth.context";

export default function NoteCard({ data }) {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [themeIndex, setThemeIndex] = useState(0);

  const themes = [
    "default",
    "dark",
    "cosmic-dream",
    "nature-escape",
    "retro-pop",
    "dragon-ball",
    "naruto",
    "pokemon",
    "happy",
    "playful-happy",
    "sad"
  ];

  const decrypt = () => {
    user &&
      decryptMessages(data, user.uniqueKey)
        .then((dat) => {
          if (dat && dat.data && dat.data.length > 0) {
            setContent(dat.data[0].content);
          }
        })
        .catch((error) => {
          console.error("Error decrypting message:", error);
        });
  };

  useEffect(() => {
    decrypt();
  }, [user]);

  useEffect(() => {
    if (content.length >= 50) {
      setContent(`${content.slice(0, 50)} ...`);
    }
  }, [content]);

  

  const toggleTheme = () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  const currentTheme = themes[themeIndex];

  return (
    <div>
      <Link to={`/messages/${data._id}`}>
        <div className={`Card ${currentTheme}`}>
          <p className="to">{`To: ${data.receiver}`}</p>
          <div
            className="inner-box"
            style={{
              backgroundColor: data.color || "white",
            }}
          >
            <p
              className="content"
              style={{ color: data.color === "white" ? "black" : "white" }}
            >
              {content}
            </p>
          </div>
        </div>
      </Link>
      <button className="theme-toggle-button" onClick={toggleTheme}><svg width="25" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8 4.41 0 8-3.59 8-8 0-4.41-3.59-8-8-8zm0 14.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9-5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
      </button>
    </div>
  );
}
