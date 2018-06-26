const av = require('tessel-av');
const express = require('express');
const app = express();
const port = 8000;
const camera = new av.Camera();

camera.capture();

app.listen(port, () => {
  console.log('Listening on port', port);
});
