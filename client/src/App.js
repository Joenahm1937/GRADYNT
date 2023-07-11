import { useState, useRef, useEffect } from "react";
import { gsap } from 'gsap';
import Header from "./components/header.js";
import UserInput from "./components/userInput.js";
import ColorPalette from "./components/colorPalette.js";
import SocialMedia from "./components/socialMedia.js";
import CircularProgress from "@mui/material/CircularProgress";
import "./App.css";
import { HEADER_ANIMATION, SEARCH_BAR_ANIMATION, TWITTER_ANIMATION, DEFAULT_BACKGROUND_COLOR, DEFAULT_COLOR } from "./constants.js";

const App = () => {
    const [background, setBackground] = useState(DEFAULT_BACKGROUND_COLOR);
    const [isLoading, setIsLoading] = useState(false);
    const [colors, setColors] = useState(DEFAULT_COLOR);

    const headerRef = useRef(null);
    const searchBarRef = useRef(null);
    const twitterRef = useRef(null);

    useEffect(() => {
        gsap.from(headerRef.current, 0.8, HEADER_ANIMATION);
        gsap.from(searchBarRef.current, 0.8, SEARCH_BAR_ANIMATION);
        gsap.from(twitterRef.current, 0.8, TWITTER_ANIMATION);
    }, []);

    return (
        <div className="App" style={{ background }}>
            <div ref={headerRef}>
                <Header />
            </div>
            <div ref={searchBarRef}>
                <UserInput
                    setBackground={setBackground}
                    setIsLoading={setIsLoading}
                    setColors={setColors}
                />
            </div>
            <div className="loading">
                {isLoading ? <CircularProgress /> : <ColorPalette colors={colors} />}
            </div>
            <div ref={twitterRef}>
                <SocialMedia />
            </div>
        </div>
    );
}

export default App;
