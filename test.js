var https = require('https'),
    urllib = require("url");
    
const {  Ecojoko } = require("./ecojoko.js");


function main() {

    
        var ecojoko =  new Ecojoko("yannick.simon@gmail.com", "rs9f!T9rbKMv!BZV*VPix");
      
        ecojoko.getLoginCookies()
            .then(async  => {  
               gateways = ecojoko.getGateways()
               .then(async gateways => {
                console.log(gateways);
               });
               
            }
            ).catch(err => {
                console.error(err);
                return;
            })
}

main();