import { Power2, Power3 } from 'gsap';

//App.js
export const DEFAULT_BACKGROUND_COLOR = "black";
export const DEFAULT_COLOR = "#000000#000000#000000#000000#000000";
export const HEADER_ANIMATION = {
    opacity: 0,
    y: -20,
    ease: Power2.easeOut,
    delay: 2.0,
};
export const SEARCH_BAR_ANIMATION = {
    opacity: 0,
    y: 0,
    ease: Power3.easeOut,
    delay: 2.6,
};
export const TWITTER_ANIMATION = {
    opacity: 0,
    y: 20,
    ease: Power3.easeOut,
    delay: 2.9,
};

// colorPalette.js
export const ANIMATIONS = [
    { opacity: 0, x: 100, ease: Power3.easeOut, delay: 0.2 },
    { opacity: 0, x: 80, ease: Power3.easeOut, delay: 0.5 },
    { opacity: 0, x: 60, ease: Power3.easeOut, delay: 0.8 },
    { opacity: 0, x: 40, ease: Power3.easeOut, delay: 1.1 },
    { opacity: 0, x: 20, ease: Power3.easeOut, delay: 1.4 },
];

//socialMedia.js
export const TWITTER_LINK = "https://twitter.com/gradyntapp";