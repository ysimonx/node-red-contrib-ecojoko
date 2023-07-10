var https = require('https'),
    urllib = require("url");
 
const {  Ecojoko } = require("./ecojoko.js");



module.exports = function(RED) {

    
    function ecojokoCredentials(n) {
        RED.nodes.createNode(this, n);

        var node = this;
        this.e_mail = n.e_mail;
        this.password = n.password;
        
    }

    RED.nodes.registerType("ecojoko-credential", ecojokoCredentials);
    



    function ecojokoConnectNode(n) {

        RED.nodes.createNode(this, n);

        var node = this;
        node.credentials = RED.nodes.getNode(n.server);

        node.e_mail = node.credentials.e_mail;
        node.password = node.credentials.password;
        

        function fetchData() {
           
            var ecojoko =  new Ecojoko(node.e_mail,  node.password);
            var ecojoko =  new Ecojoko("yannick.simon@gmail.com", "rs9f!T9rbKMv!BZV*VPi");
        
            ecojoko.getLoginCookies()
                .then(async  => {  
                    gateways = ecojoko.getGateways()
                    .then(async gateways => {
                        node.send(gateways);
                        node.status({});
                    }).catch(err => {
                        console.error(err);
                        node.status({ fill: "red", shape: "dot", text: "error" });
                        return;
                    });
                }
                ).catch(err => {
                    console.error(err);
                    node.status({ fill: "red", shape: "dot", text: "error" });
                    return;
                })
            
        }

        node.on("close", function(){
        
        });

        node.on("input", function(){
            fetchData();
        });

        
    }




    RED.nodes.registerType("ecojoko-connect", ecojokoConnectNode);

};
