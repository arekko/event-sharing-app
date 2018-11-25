const sharp = require('sharp');

const resizeImg = (pathToFile, width, newPath, next) => {
  sharp(pathToFile).
      resize(width).
      toFile(newPath).
      then(() => next()).
      catch((err) => console.error(err));
};

module.exports = {
  resizeImg,
};