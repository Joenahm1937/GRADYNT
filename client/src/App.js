import Header from "./components/header.js";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import {gsap, Power3, Power2} from 'gsap';
import UserInput from "./components/userInput.js";
import ColorPalette from "./components/colorPalette.js"
import SocialMedia from "./components/socialmedia.js";
import Credits from "./components/credits.js";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [background, setBackground] = useState("black");
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState('#000000#000000#000000#000000#000000');

  let header = useRef(null);
  let searchBar = useRef(null);
  let twitter = useRef(null);
  // let palette = useRef(null);

  useEffect(()=>{
    gsap.from(
        header,
        .8,
        {
            opacity: 0,
            y: -20,
            ease: Power2.easeOut,
            delay: 2.0,
        }
    )
    gsap.from(
        searchBar,
        .8,
        {
            opacity: 0,
            y: 0,
            ease: Power3.easeOut,
            delay: 2.6,
        }
    )
    gsap.from(
        twitter,
        .8,
        {
            opacity: 0,
            y: 20,
            ease: Power3.easeOut,
            delay: 2.9,
        }
    )
  }, [])

  return (
    <div className="App" style={{ background }}>
      <div ref = {el => {header = el} }>
        <Header></Header>
      </div> 
      <div ref = {el => {searchBar= el} }>
        <UserInput setBackground={setBackground} setIsLoading={setIsLoading} setColors = {setColors}></UserInput>
      </div>
      <div className="loading" >
        {isLoading ? (
            <CircularProgress/>
        ) : <ColorPalette colors = {colors}/>}
      </div>
      <div ref = {el => {twitter= el} }>
        <SocialMedia></SocialMedia>
      </div>
      {/* <Credits></Credits> */}
    </div>
  );
}

export default App;
