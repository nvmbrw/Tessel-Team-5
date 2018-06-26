'use strict';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const os = require('os');
const path = require('path');
const fs = require('fs');

const port = 8888;

const av = require('tessel-av');
const camera = new av.Camera();

server.listen(port, function() {
  console.log(`http://${os.hostname()}.local:${port}`);
});

app.use(express.static(path.join(__dirname, '/public')));
app.get('/stream', (request, response) => {
  response.redirect(camera.url);
});

module.exports = camera;

const pictureButton = document.getElementById('camera');

pictureButton.addEventListener('click', () => {
  const capture = camera.capture();
  capture.on('data', async data => {
    await fs.writeFile(data, './captures/');
  });
});
