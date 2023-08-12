import express from 'express';
import { getColors } from '../scripts/getColors.js';
// import { startTwitterService } from '../scripts/twitter.js';
import puppeteer from 'puppeteer';
import {
    SERVER_PORT,
    INDEX_PATH
} from '../constants.js';

const app = express();

let browser, page;

(async () => {
    browser = await puppeteer.launch();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for CORS headers
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://d1jqm5g5neadez.cloudfront.net/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (_, res) => {
    res.send("Welcome to Gradynt's Server!");
});

app.post("/api/palette", async (req, res) => {
    const { searchDetails } = req.body;
    try {
        const [palette, newPage] = await getColors(searchDetails, browser, page);
        page = newPage;
        res.send(palette);
    } catch (err) {
        console.error(err.message);
    }
});

//Start the Twitter service
// startTwitterService(browser, page);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
