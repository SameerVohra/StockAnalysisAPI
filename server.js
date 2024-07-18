const { getCompany } = require("./GetCompanyDetails.js");
const { getResponse } = require("./GetResponse.js");
const express = require("express");
const app = express();

let url;

const port = 3000;
const companydetailsurl = "https://money.rediff.com/companies";
app.get("/daily-gainers", (req, res) => {
    console.log("daily");
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

app.get("/daily-losers", (req, res) => {
    url = "http://money.rediff.com/losers/nse/daily/groupall";

    getResponse(url)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => {
            res.status(501).send("INTERNAL SERVER ERROR");
        });
});

app.get("/weekly-losers", (req, res) => {
    url = "https://money.rediff.com/losers/nse/weekly/groupall";

    getResponse(url)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => {
            res.status(501).send("INTERNAL SERVER ERROR");
        });
});

app.get("/company-details/:name", (req, res) => {
    const compName = req.params;
    console.log(compName.name);
    console.log(`${companydetailsurl}/${compName.name}`)
    const url = `${companydetailsurl}/${compName.name}`;
    getCompany(url)
        .then((data) => res.status(201).send({ data }))
        .catch((error) => {
            console.log(error);
            res.status(501).send("Internal Server Error")
        });
});

app.listen(port, () => {
    console.log(`Listening to PORT: ${port}`);
});