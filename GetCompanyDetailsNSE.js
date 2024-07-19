const cheerio = require("cheerio");
const request = require("request");

function getCompanyNSE(url) {
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

                currPrice = $("#ltpid_nse").text().trim();
                change = $("#change_nse").text();
                percentageChange = $("#ChangePercent_nse").text().trim();

                volume = $("#Volume_nse").text().trim();
                prev_close = $("#PrevClose_nse").text().trim();
                dayHL = $("#highlow_nse").text().trim();
                wk52HL = $("#FiftyTwoHighlow_nse").text().trim();

                compName = $(".f20").first().text().trim();

                json.push({
                    "Stock Exchange": "NSE",
                    "Company Name": compName,
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

module.exports = { getCompanyNSE };