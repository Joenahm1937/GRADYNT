import Header from "./components/header.js";
import "./App.css";
import { useState } from "react";
import UserInput from "./components/userInput.js";
import SocialMedia from "./components/socialmedia.js";
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const [background, setBackground] = useState("black");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="App" style={{ background }}>
      <Header></Header>
      <UserInput setBackground={setBackground} setIsLoading={setIsLoading}></UserInput>
      <div className="loading">
        {isLoading ? (
            <LinearProgress />
        ) : null}
      </div>
      <SocialMedia></SocialMedia>
    </div>
  );
}

export default App;
