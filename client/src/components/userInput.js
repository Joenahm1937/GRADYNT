import React, { useState } from "react";
import axios from "axios";
import rgbHex from 'rgb-hex';

function UserInput({ setBackground, setIsLoading }) {
  const [searchWord, setSearchWord] = useState("");
  const submitValue = (event) => {
    if (event.keyCode === 13) {
      setIsLoading(true)
      const searchDetails = searchWord;
      axios.post("/api/palette", { searchDetails }).then((res) => {
        const colors = res.data.map(rgb => `#${rgbHex(rgb[0], rgb[1], rgb[2])}`)
        setBackground("linear-gradient( -45deg, " + colors.join(",") + ")");
        setIsLoading(false)
      });
    }
  };
  return (
    <div className="UserInput">
      <input
        className="TextField"
        type="text"
        placeholder="search anything"
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyDown={(e) => submitValue(e)}
      />
    </div>
  );
}

export default UserInput;
