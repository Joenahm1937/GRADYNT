import Twit from 'twit';
import fs from 'fs';
import { getColors } from '../scripts/getColors.js';
import * as createCanvas from 'canvas';
import {
    KEYS_FILE_PATH,
    RESPONSE_PNG_PATH,
    TWIT_HTTP_REQ_TIMEOUT,
    TWIT_TRACKING_MENTION,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
} from '../constants.js';

export const startTwitterService = async (browser, page) => {
    let key;
    try {
        key = fs.readFileSync(KEYS_FILE_PATH, "utf-8").split("\n");
    } catch (err) {
        console.error("Error reading twitter keys");
        return;
    }

    const Twitter = new Twit({
        consumer_key: key[0],
        consumer_secret: key[1],
        access_token: key[2],
        access_token_secret: key[3],
        timeout_ms: TWIT_HTTP_REQ_TIMEOUT,
        strictSSL: true,
    });

    const stream = Twitter.stream("statuses/filter", { track: TWIT_TRACKING_MENTION });

    stream.on("tweet", async (tweet) => {
        let { text, user, id_str } = tweet;
        let username = user.screen_name;
        console.log("Received tweet from: " + username);

        text = text.replace(/@gradyntapp/g, "").replace(/\n/g, "");
        try {
            const [palette, newPage] = await getColors(text, browser, page);
            page = newPage;
            console.log(`Generating png of ${text}...`);

            const canvas = generatePaletteCanvas(palette);
            const buffer = canvas.toBuffer("image/png");
            fs.writeFileSync(RESPONSE_PNG_PATH, buffer);

            let b64content = fs.readFileSync(RESPONSE_PNG_PATH, { encoding: "base64" });

            postPaletteToTwitter(Twitter, b64content, username, id_str, text);
        } catch (err) {
            console.error("Error generating color response image for twitter: ", err.message);
        }
    });
};

function generatePaletteCanvas(palette) {
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const ctx = canvas.getContext("2d");
    let grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
    grd.addColorStop(0, `rgb(${palette[0].join(',')})`);
    grd.addColorStop(0.25, `rgb(${palette[1].join(',')})`);
    grd.addColorStop(0.5, `rgb(${palette[2].join(',')})`);
    grd.addColorStop(0.75, `rgb(${palette[3].join(',')})`);
    grd.addColorStop(0.1, `rgb(${palette[4].join(',')})`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    return canvas;
}

function postPaletteToTwitter(Twitter, b64content, username, id_str, text) {
    Twitter.post("media/upload", { media_data: b64content }, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let mediaIdStr = data.media_id_string;
        let altText = "gradynt depiction of" + text;
        let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
        Twitter.post("media/metadata/create", meta_params, (err) => {
            if (!err) {
                let params = {
                    status: `@${username} `,
                    in_reply_to_status_id: id_str,
                    media_ids: [mediaIdStr],
                };
                Twitter.post("statuses/update", params, () => {
                    console.log('replied to: ' + username);
                });
            }
        });
    });
}
