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
    console.log(
      `Album ${albumName} created.\nAlbumId: ${id}, albumDeleteHash: ${deletehash}`
    );
    return { albumId: id, albumDeleteHash: deletehash };
  } catch (error) {
    console.error(error);
  }
};

const postUploadImg = async (albumhash, imgUrl, tweetId) => {
  try {
    const response = await axiosInstance.post("/image.json", {
      image: imgUrl,
      album: albumhash,
    });
    console.log(response.headers["x-post-rate-limit-remaining"]);
    console.log(response.headers["x-ratelimit-clientremaining"]);
    console.log(response.headers["x-ratelimit-userremaining"]);
    console.log(`${imgUrl} (from ${tweetId}) upload completed.`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  postCreateAlbum,
  postUploadImg,
};
