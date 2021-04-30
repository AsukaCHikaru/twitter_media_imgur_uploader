const { getMediaUrlsFromTwitter } = require("./twitterFetcher");
const { postCreateAlbum, postUploadImg } = require("./imgurLoader");

const TWITTER_USER_ID = "";
const ALBUM_NAME = "";

const getMediaUrls = async (untilId, albumHash) => {
  const { mediaUrls, resultCount, oldestId } = await getMediaUrlsFromTwitter(
    TWITTER_USER_ID,
    untilId
  );
  if (resultCount > 0) {
    setUploadInterval(albumHash, mediaUrls, oldestId);
  } else {
    console.log("No result.");
  }
};

const setUploadInterval = (albumHash, mediaUrls, untilId) => {
  if (mediaUrls.length === 0) {
    getMediaUrls(untilId, albumHash);
  }
  const uploadInterval = setInterval(async () => {
    if (mediaUrls.length === 0) {
      clearInterval(uploadInterval);
      getMediaUrls(untilId, albumHash);
      return;
    }
    const mediaUrl = mediaUrls.shift();
    await postUploadImg(albumHash, mediaUrl.url, mediaUrl.tweetId);
  }, 3000);
};

const runFetchAndUpload = async () => {
  const { albumId, albumDeleteHash } = await postCreateAlbum(ALBUM_NAME);
  getMediaUrls("", albumDeleteHash);
};

runFetchAndUpload();
