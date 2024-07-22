const cheerio = require("cheerio");
const request = require("request");

function getCompanyBSE(url) {
    return new Promise((resolve, reject) => {
        request(url, function(error, response, html) {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }
            if (response.statusCode != 200) {
                reject("Failed to load page", response.statusCode);
                return;
            }
            try {
                const $ = cheerio.load(html);
                const json = [];
                let compName;
                let currPrice;
                let change;
                let percentageChange;
                let volume;
                let prev_close;
                let dayHL;
                let wk52HL;

                currPrice = $("#ltpid").text().trim();

                console.log(currPrice);
                change = $("#change").text();
                percentageChange = $("#ChangePercent").text().trim();

                volume = $("#Volume").text().trim();
                prev_close = $("#PrevClose").text().trim();
                dayHL = $("#highlow").text().trim();
                wk52HL = $("#FiftyTwoHighlow").text().trim();

                compName = $(".f20").first().text().trim();

                json.push({
                    "Stock_Exchange": "BSE",
                    "Company _Name": compName,
                    "CurrentPrice": currPrice,
                    "PriceChange": change,
                    "PercentageChange": percentageChange,
                    "Volume": volume,
                    "Previous_Close": prev_close,
                    "DayH/L": dayHL,
                    "52WeekH/L(in lacs)": wk52HL
                })

                resolve(json);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        })
    })
}

module.exports = { getCompanyBSE };