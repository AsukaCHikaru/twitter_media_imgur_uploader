const fs = require("fs");
const https = require("https");

const SAVE_PATH = "";

const downloadImage = (mediaKey, imageUrl) => {
  const saveStream = fs.createWriteStream(`${SAVE_PATH}/${mediaKey}.jpg`);
  const request = https
    .get(imageUrl, (res) => {
      res.pipe(saveStream);
      saveStream.on("finish", () => {
        saveStream.close(() => {
          console.log(`${imageUrl} download finished`);
        });
      });
    })
    .on("error", (error) => {
      fs.unlink(`${SAVE_PATH}/${mediaKey}.jpg`);
      console.error(error);
    });
};

module.exports = {
  downloadImage,
};
