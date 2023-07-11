import express from 'express';
import { getColors } from '../scripts/getColors.js';
import { startTwitterService } from '../scripts/twitter.js';
import puppeteer from 'puppeteer';
import {
    SERVER_PORT,
    CLIENT_BUILD_PATH,
    INDEX_PATH
} from '../constants.js';

const app = express();

let browser, page;

(async () => {
    browser = await puppeteer.launch();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(CLIENT_BUILD_PATH));

app.get('/', (_, res) => {
    res.sendFile(INDEX_PATH);
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
startTwitterService(browser, page);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
