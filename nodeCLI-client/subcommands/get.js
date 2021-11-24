/**
 * Subcommand "get" to receive a certificate by serial number
 */

var log = require('fancy-log');
var httpclient = require('./../httpclient.js');
var fs = require('fs');

var get = function(serialnumber, out) {
    log.info("Requesting issued certificate by serial number.");

    var postdata = {
        data: {
            serialnumber:serialnumber
        },
        auth: {
            username: global.config.user.username,
            password: global.config.user.password
        }
    };
    
    httpclient.request(global.apipath + '/certificate/get/', 'POST', postdata)
        .then(function(response){
            log.info("Received HTTP response :-)");

            if(response.success) {
                log.info("Successfully received requested certificate :-)");

                if(typeof out === 'string') {
                    // Write certificate to file
                    fs.writeFileSync(out, response.cert);
                    log("Cert written to " + out);
                } else {
                    console.log("\r\n\r\n" + response.cert + "\r\n");
                }
            } else {
                log.error("Could not get requested certificate:");
                log.error(JSON.stringify(response.errors));
            }
        })
        .catch(function(error){
            log.error("HTTP request failed: " + error);
        });
};


module.exports = get;
