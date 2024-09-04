import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";
import { decryptMessages } from "../lib/api";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function NoteCard({ data }) {
  const [content, setContent] = useState("");

  // const decrypt = () => {
  //   user &&
  //     decryptMessages(data, user.uniqueKey)
  //       .then((dat) => {
  //         if (dat && dat.data && dat.data.length > 0) {
  //           setContent(dat.data[0].content);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error decrypting message:", error);
  //       });
  // };

  // useEffect(() => {
  //   decrypt();
  // }, [user, display]);

  useEffect(() => {
    if (content.length >= 50) {
      setContent(`${content.slice(0, 50)} ...`);
    }
  }, [data.content]);

  return (
    <Link to={`/messages/${data._id}`}>
      <div className="Card">
        <p className="to">{`To: ${data.receiver}`}</p>
        <div
          className="inner-box"
          style={{
            backgroundColor: data.color || "white",
          }}
        >
          <p
            className="content"
            style={{ color: data.color === "#FFFFFF" ? "black" : "white" }}
          >
            {data.content}
          </p>
        </div>
      </div>
    </Link>
  );
}
