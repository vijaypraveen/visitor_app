'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const REDIS_PORT = 6379;

var redis = require('redis');
var client = redis.createClient(REDIS_PORT, 'redis', {no_ready_check: true});


client.on('error', function (err) {
    console.log('Error ' + err);
}); 

client.on('connect', function() {
    console.log('Connected to Redis');
});
// App
const app = express();
app.get('/', (req, res) => {
    client.incr('count', function(err, reply) {
        console.log(reply);
        res.send("<h1>This is the visitor>"+reply+ "</h1>");
    });
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);