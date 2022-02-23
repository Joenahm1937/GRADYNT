import Header from "./components/header.js";
import "./App.css";
import { useState } from "react";
import UserInput from "./components/userInput.js";
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const [background, setBackground] = useState("black");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="App" style={{ background }}>
      <Header></Header>
      <UserInput setBackground={setBackground} setIsLoading={setIsLoading}></UserInput>
      {isLoading ? (
        <div className="loading">
          <LinearProgress />
        </div>
      ) : null}
    </div>
  );
}

export default App;
