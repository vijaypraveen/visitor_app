'use strict';

// Constants
const express = require('express');
const redis = require('redis');
const ip = require('ip');
const path = require('path');
const router = express.Router();

const HOST = '0.0.0.0';
const PORT = 8080;
const REDIS_PORT = '6379';

// Redis connection
var client = redis.createClient(REDIS_PORT, 'redis', {no_ready_check: true});

client.on('error', function (err) {
console.log('Error ' + err);
}); 

client.on('connect', function() {
console.log('Connected to Redis');
});
    

// App
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
router.get("/", (req, res) => {
  client.incr('count', function(err, reply) {
  console.log(reply);
    res.render("index", { message: "This is the visitor count: " + reply, ip: "Container IP: " + ip.address() });
  });
});

//add the router
app.use('/', router);
app.listen(PORT, HOST);
console.log("Container IP: " +  ip.address());
