const cheerio = require("cheerio");
const request = require("request");

function getResponse(url){
    return new Promise((resolve, reject) => {
        request(url, function(error, response, html){
            if(error) {
                console.error("Error requesting data:", error);
                reject(error);
                return;
            }
        
            if(response.statusCode !== 200) {
                console.error("Failed to load page, status code:", response.statusCode);
                reject(`Failed to load page, status code: ${response.statusCode}`);
                return;
            }
        
            try {
                const $ = cheerio.load(html);
                const json = [];
                const companyName = [];
                const currPrice = [];
                const change = [];
                const prevPrice = [];
        
                $('table[class="dataTable"] tbody tr').each(function() {
                    const company = $(this).find('td:nth-child(1) a').text().trim();
                    const price = $(this).find('td:nth-child(3)').text().trim();
                    const changeValue = $(this).find('td:nth-child(4)').text().trim();
                    const previousPrice = $(this).find('td:nth-child(2)').text().trim();
        
                    companyName.push(company);
                    currPrice.push(price);
                    change.push(changeValue);
                    prevPrice.push(previousPrice);
                });
        
                for(let i = 0; i < companyName.length; i++){
                    json.push({
                        company: companyName[i],
                        Current_Price: currPrice[i],
                        Change: change[i] + "%",
                        Previous_Price: prevPrice[i]
                    });
                }
        
                resolve(json);
            } catch (e) {
                console.error("Error parsing HTML:", e);
                reject(e);
            }
        });
    });
}

module.exports = { getResponse };
