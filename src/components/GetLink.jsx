import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const GetLink = () => {
  const [link, setLink] = useState("");
  const onClick = (e) => {
    let num = Math.floor(Math.random() * 999999999999999999);
    setLink(`/meet/${num}`);
  };
  const options = ["Addiction", "Anxiety", "LGBTQ"];
  const navigate = useNavigate();
  return (
    <div>
      <h1>Join a room</h1>
      {options.map((item) => (
        <div
          onClick={() => navigate(`/meet/${item}`)}
          style={{
            cursor: "pointer",
            padding: "3%",
            backgroundColor: "pink",
            color: "white",
            fontSize: "2rem",
          }}
        >
          {item}
        </div>
      ))}
      {/* <button onClick={onClick}>Click here</button> */}
      {link && <Link to={link}>http://localhost:3000{link}</Link>}
    </div>
  );
};
