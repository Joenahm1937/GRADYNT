import React from 'react';
import {gsap, Power3} from 'gsap';
import { useRef, useEffect } from "react";

function ColorPalette(props){
    const colorArr = props.colors.split('#');

    let color1 = useRef(null);
    let color2 = useRef(null);
    let color3 = useRef(null);
    let color4 = useRef(null);
    let color5 = useRef(null);
  
    useEffect(()=>{
      gsap.from(
          color1,
          .8,
          {
              opacity: 0,
              x: 100,
              ease: Power3.easeOut,
              delay: 0.2,
          }
      )
      gsap.from(
        color2,
        .8,
        {
            opacity: 0,
            x: 80,
            ease: Power3.easeOut,
            delay: 0.5,
        }
    )
    gsap.from(
        color3,
        .8,
        {
            opacity: 0,
            x: 60,
            ease: Power3.easeOut,
            delay: 0.8,
        }
    )
    gsap.from(
        color4,
        .8,
        {
            opacity: 0,
            x: 40,
            ease: Power3.easeOut,
            delay: 1.1,
        }
    )
    gsap.from(
        color5,
        .8,
        {
            opacity: 0,
            x: 20,
            ease: Power3.easeOut,
            delay: 1.4,
        }
    )
    }, [])


    return (
        <div className = "ColorPalette">
            <div ref = {el => {color1= el} } className = "Circle" style = {{background: '#' + colorArr[1]}}></div>
            <div ref = {el => {color2= el} } className = "Circle" style = {{background: '#' + colorArr[2]}}></div>
            <div ref = {el => {color3= el} } className = "Circle" style = {{background: '#' + colorArr[3]}}></div>
            <div ref = {el => {color4= el} } className = "Circle" style = {{background: '#' + colorArr[4]}}></div>
            <div ref = {el => {color5= el} } className = "Circle" style = {{background: '#' + colorArr[5]}}></div>
        </div>
    );
}

export default ColorPalette;