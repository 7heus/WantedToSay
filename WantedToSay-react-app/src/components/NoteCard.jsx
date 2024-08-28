import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { decryptMessages } from "../lib/api";
import "./NoteCard.css";

export default function NoteCard({ data }) {
  const [content, setContent] = useState("");
  useEffect(() => {
    if (data) {
      decryptMessages(data, "c001k3y").then((dat) => {
        if (dat && dat.data && dat.data.length > 0) {
          setContent(dat.data[0].content);
        }
      }).catch((error) => {
        console.error("Error decrypting message:", error);
      });
    }
  }, [data]);
  
  useEffect(() => console.log(content), [content]);
  return (
    <Link to={`/messages/${data._id}`}>
      <div className="Card">
        <div className="content" style={{}}>
          <p className="content">{content && content}</p>
        </div>
      </div>
    </Link>
  );
}
