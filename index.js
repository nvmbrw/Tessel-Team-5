'use strict';
const express = require('express');
var tessel = require('tessel');
const app = express();
const server = require('http').Server(app);
const os = require('os');
const path = require('path');
const fs = require('fs');
const ambientlib = require('ambient-attx4');

const port = 8888;

const av = require('tessel-av');
const camera = new av.Camera();
var i = 0;

var ambient = ambientlib.use(tessel.port.B);

ambient.on('ready', function() {
  // Get points of light and sound data.
  setInterval(function() {
    ambient.getLightLevel(function(err, lightdata) {
      if (err) throw err;
      console.log('Light level:', lightdata.toFixed(8));
    });
  }, 500); // The readings will happen every .5 seconds
});

ambient.on('error', function(err) {
  console.log(err);
});

server.listen(port, function() {
  console.log(`http://${os.hostname()}.local:${port}`);
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/stream', (request, response) => {
  response.redirect(camera.url);
});

// app.post('/camera', (req, res) => {
//   const capture = camera.capture();
//   capture.on('data', data => {
//     fs.writeFile(path.join(__dirname, `captures/image${i}`));
//     i++;
//   });
// });

module.exports = camera;
