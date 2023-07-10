// Ecojoko.js

var https = require('https'),
    urllib = require("url");

const cookieParser = require('cookie-parser');

// constructor function for the Cat class
class Ecojoko {

    constructor(param_e_mail, param_password) {
        this.e_mail = param_e_mail;
        this.password = param_password;
        this.cookies=[];

    }

    getGateways() {

        var self=this;

        return new Promise((resolve, reject) => {
           
        
            var url =  "/gateways";
        
            var testys = buildCookieHeader(self.cookies)
            
            var options = {
                method: 'GET',
                host: "service.ecojoko.com",
                port: 443,
                path: url,
                headers: {
                    "Cookie":testys
                }   
            };

            var request = https.request(options, function(res) {
                res.setEncoding('utf8');
        
                var statusCode = res.statusCode;
                var payload = "";
               
                res.on("data", function(chunk) {
                    payload += chunk;
                });

                res.on("end",function() {
                    // try {
                        var payload_json = JSON.parse(payload); 
                        
                        if (res.statusCode == 200) {
                               
                                resolve(payload_json);
                        }
                        reject("error");
                    // }
                    //catch(e) { 
                    //    
                    //    reject(e);
                    // }
                });

        });     
        
        
        request.on("error", function(err) {
            msg.error = err;
            reject(msg);
        });
    
        request.end();

    });  
    }


    getLoginCookies() {

        var self=this;

        return new Promise((resolve, reject) => {
           
        var url =  "/login";
    
        var options = {
            method: 'POST',
            host: "service.ecojoko.com",
            port: 443,
            path: url,
            headers: {
                "Content-Type": "application/json",
            }   
        };

        var postData = JSON.stringify({"l": this.e_mail,"p":this.password});

        var msg = {};
        var request = https.request(options, function(res) {
            res.setEncoding('utf8');
    
            msg.statusCode = res.statusCode;
            msg.payload = "";
           
            res.on("data", function(chunk) {
                msg.payload += chunk;
            });
    
            res.on("end",function() {
                try {
                    msg.payload = JSON.parse(msg.payload); 
                    msg.error = "";

                    if (res.statusCode == 200) {
                        if ("set-cookie" in res.headers ) {
                            var response_cookies = cookieParse(res.headers["set-cookie"]);
                            self.cookies  = response_cookies;
                            resolve(response_cookies);
                        }
                    }
                   
                }
                catch(e) { 
                    msg.error= e;
                    reject(msg);
                }
            });
        });
    
        request.on("error", function(err) {
            msg.error = err;
            reject(msg);
        });
    
        request.write(postData);
        request.end();

        })
    }
    
}
 
function buildCookieHeader(cookies) {
    var result="";
    for (const [key, value] of Object.entries(cookies)) {
        result=result + key+"="+value+"; ";
    }
    return result;
      
}

function cookieParse(arrayString) {
    result={};

    for(var i=0; i<arrayString.length; i++) {
        var s = arrayString[i];
        tab_s = s.split(';');
        tab_s_kv=tab_s[0].split("=");
        result[tab_s_kv[0]]=tab_s_kv[1];
    }
    return result;
    // should return
    /*
    {
        LKS: 'eacfdf748deeff092cc661bf857de104',
        tdw: 'b2ae800d2d0f08824d280786a11d7d70'
      }
    */

}

module.exports = {
    Ecojoko
    
};