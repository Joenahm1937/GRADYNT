import { useState } from "react";
import axios from "axios";
import rgbHex from 'rgb-hex';

const UserInput = ({ setBackground, setIsLoading, setColors }) => {
    const [searchWord, setSearchWord] = useState("");
    const submitValue = (event) => {
        if (event.keyCode === 13) {
            setIsLoading(true)
            const searchDetails = searchWord;
            // TODO: Need to update to the Server's Route
            axios.post("/api/palette", { searchDetails }).then((res) => {
                const colors = res.data.map(rgb => `#${rgbHex(rgb[0], rgb[1], rgb[2])}`)
                setBackground("linear-gradient( -45deg, " + colors.join(",") + ")");
                setColors(colors.join(""));
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
