import { gsap, Power3 } from 'gsap';
import { useRef, useEffect } from "react";
import { ANIMATIONS } from '../constants';

const ColorPalette = ({ colors }) => {
    const colorArr = colors.split('#');
    const colorRef1 = useRef(null);
    const colorRef2 = useRef(null);
    const colorRef3 = useRef(null);
    const colorRef4 = useRef(null);
    const colorRef5 = useRef(null);
    
    const colorRefs = [colorRef1, colorRef2, colorRef3, colorRef4, colorRef5];

    useEffect(() => {
        colorRefs.forEach((ref, i) => {
            gsap.from(ref.current, 0.8, ANIMATIONS[i]);
        });
    }, []);

    return (
        <div className="ColorPalette">
            {colorRefs.map((ref, i) => (
                <div ref={ref} key={i} className="Circle" style={{ background: '#' + colorArr[i + 1] }}></div>
            ))}
        </div>
    );
}

export default ColorPalette;
