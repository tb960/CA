/*
 * API registry for
 * GET POST PUT DELETE
 */

var fs = require('fs');
var express = require('express');
var bodyparser = require('body-parser');

var certapi = require('./api/certificate.js');


/**
 * Initializes API paths.
 */
var initAPI = function(app) {
    app.use(express.json());

    /*
     * PUT
     */

    app.put('/certificate/request/', function(req, res) {
        certapi.certificate.request(req, res);
    });



    /*
     * GET
     */

    app.get('/certificate/:id/get/', function(req, res) {
        console.log("Client is requesting certificate %s", req.params.id);
        res.end("blablabla");
    });
    /*
     * REVOKE
    */
    app.post('/certificate/revoke/', function(req, res) {
        certapi.certificate.revoke(req, res);
    });

};



module.exports = {
    initAPI: initAPI
}