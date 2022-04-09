const express = require("express");
const getColors = require("./getColors");
const Twit = require("twit");
const fs = require("fs");
const { createCanvas } = require("canvas");

const puppeteer = require("puppeteer");
var browser;
var page;
(async () => {
  browser = await puppeteer.launch();
})();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//TWITTER

//read info from txt file
const k = fs.readFileSync("keys.txt", "utf-8").split("\n");

//create new twitter object
const Twitter = new Twit({
  consumer_key: k[0],
  consumer_secret: k[1],
  access_token: k[2],
  access_token_secret: k[3],
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

// Setting up a user stream, filters tweets by only mentions
const stream = Twitter.stream("statuses/filter", { track: "@gradyntapp" });

//NEED TO FIX BUG, NOT CONSOLE LOGGING
stream.on("tweet", async (tweet) => {
  //id_str to get conversation thread
  let { text, user , id_str} = tweet;
  let username = user.screen_name;

  text = text.replace(/@gradyntapp/g, "").replace(/\n/g, "");
  try {
    const [palette, newPage] = await getColors(text, browser, page);
    page = newPage;
    console.log(username);

    const WIDTH = 100;
    const HEIGHT = 50;

    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
    grd.addColorStop(0, `rgb(${palette[0].join(',')})`);
    grd.addColorStop(0.25, `rgb(${palette[1].join(',')})`);
    grd.addColorStop(0.5, `rgb(${palette[2].join(',')})`);
    grd.addColorStop(0.75, `rgb(${palette[3].join(',')})`);
    grd.addColorStop(0.1, `rgb(${palette[4].join(',')})`);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    // ctx.fillStyle = "#f2f2f2";
    // ctx.font = "32px Arial";
    // ctx.fillText("Hello", 13, 35);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("test.png", buffer);

    var b64content = fs.readFileSync("test.png", { encoding: "base64" });

    // first we must post the media to Twitter
    Twitter.post(
      "media/upload",
      { media_data: b64content },
      function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string;
        var altText =
          "Small flowers in a planter on a sunny balcony, blossoming.";
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

        Twitter.post(
          "media/metadata/create",
          meta_params,
          function (err, data, response) {
            if (!err) {
              // now we can reference the media and post a tweet (media will attach to the tweet)
              var params = {
                status: `@${username} `,
                in_reply_to_status_id: id_str,
                media_ids: [mediaIdStr],
              };

              Twitter.post("statuses/update", params, function (err, data, response) {
                console.log('posted');
              });
            }
          }
        );
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
