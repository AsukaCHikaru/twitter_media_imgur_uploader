const axios = require("axios");

const { IMGUR_ACCESS_TOKEN } = require("./env");

const axiosInstance = axios.create({
  baseURL: "https://api.imgur.com/3",
  headers: {
    Authorization: `Bearer ${IMGUR_ACCESS_TOKEN}`,
  },
});

const postCreateAlbum = async (albumName) => {
  try {
    const response = await axiosInstance.post("/album", {
      title: albumName,
      privacy: "hidden",
    });
    const { id, deletehash } = response.data.data;
    return { albumId: id, albumDeleteHash: deletehash };
  } catch (error) {
    console.error(error);
  }
};

const postUploadImg = async (albumhash, imgUrl) => {
  try {
    const response = await axiosInstance.post("/image.json", {
      image: imgUrl,
      album: albumhash,
    });
    console.log(imgUrl, "upload completed.");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postCreateAlbum,
  postUploadImg,
};
