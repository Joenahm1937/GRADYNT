const express = require("express");
const getColors = require("./getColors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/palette", async (req, res) => {
  const { searchDetails } = req.body;
  try {
    const palette = await getColors(searchDetails);
    res.send(palette);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
