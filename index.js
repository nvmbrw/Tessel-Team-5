const av = require('tessel-av');
const express = require('express');
const app = express();
const port = 8000;
const camera = new av.Camera();

camera.capture().pipe('./photo.jpg');


