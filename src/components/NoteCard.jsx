
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
      <button className="theme-toggle-button" onClick={toggleTheme}>
        Theme
      </button>
    </div>
  );
}
