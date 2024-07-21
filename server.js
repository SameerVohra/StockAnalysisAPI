const { getCompanyNSE } = require("./GetCompanyDetailsNSE.js");
const { getCompanyBSE } = require("./GetCompanyDetailsBSE.js");
const { getResponseNSE } = require("./GetResponseNSE.js");
const {getResponseBSE} = require("./GetResponseBSE.js")
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));

let url;

const port = 3000;
const companydetailsurl = "https://money.rediff.com/companies";
app.get("/daily-gainers/nse", (req, res) => {
    console.log("daily");
    url = "http://money.rediff.com/gainers/nse/daily/groupall";

    getResponseNSE(url)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => {
            res.status(501).send("INTERNAL SERVER ERROR");
        });
});

app.get("/weekly-gainers/nse", (req, res) => {
    url = "http://money.rediff.com/gainers/nse/weekly/groupall";

    getResponseNSE(url)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => {
            res.status(501).send("INTERNAL SERVER ERROR");
        });
});

app.get("/monthly-gainers/nse", (req, res) => {
    url = "https://money.rediff.com/gainers/nse/monthly/groupall";

    getResponseNSE(url)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => {
            res.status(501).send("INTERNAL SERVER ERROR");
        });
});

app.get("/daily-losers/nse", (req, res) => {
    url = "http://money.rediff.com/losers/nse/daily/groupall";

    getResponseNSE(url)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => {
            res.status(501).send("INTERNAL SERVER ERROR");
        });
});

app.get("/weekly-losers/nse", (req, res) => {
    url = "https://money.rediff.com/losers/nse/weekly/groupall";

    getResponseNSE(url)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => {
            res.status(501).send("INTERNAL SERVER ERROR");
        });
});

app.get("/monthly-losers/nse", (req, res) => {
    url = "https://money.rediff.com/losers/nse/monthly/groupall";

    getResponseNSE(url)
        .then((data) => res.status(201).json({ data }))
        .catch((error) => {
            res.status(501).send("INTERNAL SERVER ERROR");
        });
});

app.get("/company-details/:name/nse", (req, res) => {
    const compName = req.params;
    console.log(compName.name);
    console.log(`https://money.rediff.com/companies/${compName.name}`)
    const url = `${companydetailsurl}/${compName.name}`;
    getCompanyNSE(url)
        .then((data) => res.status(201).send({ data }))
        .catch((error) => {
            console.log(error);
            res.status(501).send("Internal Server Error")
        });
});


app.get("/daily-gainers/bse", (req, res) => {
    url = "https://money.rediff.com/gainers/bse/daily/groupall";

    getResponseBSE(url)
        .then((data) => res.status(201).send({ data }))
        .catch ((error) => {
        res.status(501).send("Internal Server Error")
        });
});

app.get("/weekly-gainers/bse", (req, res) => {
    url = "https://money.rediff.com/gainers/bse/weekly/groupall";

    getResponseBSE(url)
        .then((data) => res.status(201).send({ data }))
        .catch ((error) => {
        res.status(501).send("Internal Server Error")
        });
});

app.get("/monthly-gainers/bse", (req, res) => {
    url = "https://money.rediff.com/gainers/bse/monthly/groupall";

    getResponseBSE(url)
        .then((data) => res.status(201).send({ data }))
        .catch ((error) => {
        res.status(501).send("Internal Server Error")
        });
});

app.get("/daily-losers/bse", (req, res) => {
    url = "https://money.rediff.com/losers/bse/daily/groupall";

    getResponseBSE(url)
        .then((data) => res.status(201).send({ data }))
        .catch ((error) => {
        res.status(501).send("Internal Server Error")
        });
});

app.get("/weekly-losers/bse", (req, res) => {
    url = "https://money.rediff.com/losers/bse/weekly/groupall";

    getResponseBSE(url)
        .then((data) => res.status(201).send({ data }))
        .catch ((error) => {
        res.status(501).send("Internal Server Error")
        });
});

app.get("/monthly-losers/bse", (req, res) => {
    url = "https://money.rediff.com/losers/bse/monthly/groupall";

    getResponseBSE(url)
        .then((data) => res.status(201).send({ data }))
        .catch ((error) => {
        res.status(501).send("Internal Server Error")
        });
});

app.get("/company-details/:name/bse", (req, res) => {
    const compName = req.params;
    console.log(compName.name);
    const url = `https://money.rediff.com/companies/${compName.name}`;
    console.log(url);
    getCompanyBSE(url)
        .then((data) => res.status(201).send({ data }))
        .catch((error) => {
            console.log(error);
            res.status(501).send("Internal Server Error")
        });
});



app.get("/", (req, res) => {
    res.send({
        "For NSE": {
            "Get daily gainers": "/daily-gainers/nse",
            "Get daily losers": "/daily-losers/nse",
            "Get weekly gainers": "/weekly-gainers/nse",
            "Get weekly losers": "/weekly-losers/nse",
            "Get mothly gainers": "/monthly-gainers/nse",
            "Get monthly losers": "/monthly-losers/nse",
            "Get company details": "/company-details/companyname/nse",
        },
        "For BSE": {
            "Get daily gainers": "/daily-gainers/bse",
            "Get daily losers": "/daily-losers/bse",
            "Get weekly gainers": "/weekly-gainers/bse",
            "Get weekly losers": "/weekly-losers/bse",
            "Get mothly gainers": "/monthly-gainers/bse",
            "Get monthly losers": "/monthly-losers/bse",
            "Get company details": "/company-details/companyname/bse",
        }
    });
})

app.get("/test", (req, res) => {
    res.send("Testing done");
})

app.listen(port, () => {
    console.log(`Listening to PORT: ${port}`);
});