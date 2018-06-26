const camera = require('./index.js');
const fs = require('fs');
const pictureButton = document.getElementById('camera');
pictureButton.addEventListener('click', async () => {
  await fs.writeFile(camera);
});
