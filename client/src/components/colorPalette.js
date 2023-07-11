import { gsap, Power3 } from 'gsap';
import { useRef, useEffect } from "react";

// Animation settings
const ANIMATIONS = [
    { opacity: 0, x: 100, ease: Power3.easeOut, delay: 0.2 },
    { opacity: 0, x: 80, ease: Power3.easeOut, delay: 0.5 },
    { opacity: 0, x: 60, ease: Power3.easeOut, delay: 0.8 },
    { opacity: 0, x: 40, ease: Power3.easeOut, delay: 1.1 },
    { opacity: 0, x: 20, ease: Power3.easeOut, delay: 1.4 },
];

const ColorPalette = ({ colors }) => {
    const colorArr = colors.split('#');
    const colorRefs = Array(5).fill(0).map(() => useRef(null));

    useEffect(() => {
        colorRefs.forEach((ref, i) => {
            gsap.from(ref.current, 0.8, ANIMATIONS[i]);
        });
    }, []);

    return (
        <div className="ColorPalette">
            {colorRefs.map((ref, i) => (
                <div ref={ref} className="Circle" style={{ background: '#' + colorArr[i + 1] }}></div>
            ))}
        </div>
    );
}

export default ColorPalette;
