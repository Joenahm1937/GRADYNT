import React, { useState } from "react";
import axios from "axios";

function UserInput() {
  const [searchWord, setSearchWord] = useState("");
  const submitValue = (event) => {
    if (event.keyCode === 13) {
      const searchDetails = searchWord;
      axios
        .post("/api/palette", { searchDetails })
        .then((res) => console.log(res));
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
      {/* <button className = "Submit" onClick={submitValue}>Submit</button> */}
    </div>
  );
}

export default UserInput;
