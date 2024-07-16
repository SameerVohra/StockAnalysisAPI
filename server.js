const { getResponse } = require("./GetResponse.js");
const express = require("express");
const app = express();

let url;

console.log("Daily Gainers: ");

const port = 3000;

app.get("/daily-gainers", (req, res) => {
  url = "http://money.rediff.com/gainers/nse/daily/groupall";

  getResponse(url)
    .then((data) => res.status(201).json({ data }))
    .catch((error) => {
      res.status(501).send("INTERNAL SERVER ERROR");
    });
});

app.get("/weekly-gainers", (req, res) => {
  url = "http://money.rediff.com/gainers/nse/weekly/groupall";

  getResponse(url)
    .then((data) => res.status(201).json({ data }))
    .catch((error) => {
      res.status(501).send("INTERNAL SERVER ERROR");
    });
});

app.get("/daily-losers", (req, res)=>{
    url = "http://money.rediff.com/losers/nse/daily/groupall";

  getResponse(url)
    .then((data) => res.status(201).json({ data }))
    .catch((error) => {
      res.status(501).send("INTERNAL SERVER ERROR");
    });
})

app.get("/weekly-losers", (req, res)=>{
    url = "https://money.rediff.com/losers/nse/weekly/groupall";

  getResponse(url)
    .then((data) => res.status(201).json({ data }))
    .catch((error) => {
      res.status(501).send("INTERNAL SERVER ERROR");
    });
})

app.listen(port, () => {
  console.log(`Listening to PORT: ${port}`);
});
