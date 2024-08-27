import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { decryptMessages } from "../lib/api";

export default function NoteCard({ data }) {
  const [content, setContent] = useState("");
  useEffect(() => {
    decryptMessages(data && data, "c001k3y").then((dat) => {
      setContent(dat.data[0].content);
    });
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
