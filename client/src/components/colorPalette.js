import React from 'react';
import {Circle} from 'react-shapes';

function ColorPalette(props){
    const colorArr = props.colors.split('#');
    return (
        <div className = "ColorPalette">
            <Circle r={15} fill={{color: '#' + colorArr[1]}} stroke={{color:'#fff'}} strokeWidth={2} />
            <Circle r={15} fill={{color: '#' + colorArr[2]}} stroke={{color:'#fff'}} strokeWidth={2} />
            <Circle r={15} fill={{color: '#' + colorArr[3]}} stroke={{color:'#fff'}} strokeWidth={2} />
            <Circle r={15} fill={{color: '#' + colorArr[4]}} stroke={{color:'#fff'}} strokeWidth={2} />
            <Circle r={15} fill={{color: '#' + colorArr[5]}} stroke={{color:'#fff'}} strokeWidth={2} />
        </div>
    );
}

export default ColorPalette;