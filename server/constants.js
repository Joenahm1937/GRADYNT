// Color Script Constants
export const OPACITY_THRESHOLD = 125;
export const COLOR_THRESHOLD = 250;
export const MAX_IMAGES = 5;
export const DEFAULT_COLOR_COUNT = 5;
export const DEFAULT_QUALITY = 10;
export const IMAGE_SELECTOR = "img.rg_i";
export const IMAGES_LINK_XPATH = "//a[contains(text(), 'Images')]";

// Twitter Constants
export const KEYS_FILE_PATH = join(__dirname, "..", "keys.txt");
export const RESPONSE_PNG_PATH = "test.png";
export const TWIT_HTTP_REQ_TIMEOUT = 60 * 1000;
export const TWIT_TRACKING_MENTION = "@gradyntapp";
export const CANVAS_WIDTH = 100;
export const CANVAS_HEIGHT = 50;

// Server Constants
const DEFAULT_PORT = 5000;
export const SERVER_PORT = process.env.PORT || DEFAULT_PORT;
export const CLIENT_BUILD_PATH = join(__dirname, '..', '..', 'client', 'build');
export const INDEX_PATH = join(CLIENT_BUILD_PATH, 'index.html');