const axios = require("axios");

const { TWITTER_BEARER_TOKEN } = require("./env");

const axiosInstance = axios.create({
  baseURL: "https://api.twitter.com/2",
  headers: {
    Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
  },
});

const getMediaUrlsFromTwitter = async (userId, untilId) => {
  if (!userId) {
    console.log("Twitter used id necessary");
    return;
  }

  const params = {
    expansions: "attachments.media_keys",
    "media.fields": "url",
    max_results: 10,
  };

  if (untilId) {
    params.until_id = untilId;
  }

  try {
    const response = await axiosInstance.get(`/users/${userId}/tweets`, {
      params,
    });
    const { result_count, oldest_id } = response.data.meta;
    let mediaUrls = [];
    const mediaTweetMap = {};
    if (response.data.includes) {
      const tweetWithMedia = response.data.data.filter(
        (tweet) => tweet.attachments
      );
      tweetWithMedia.forEach((tweet) => {
        tweet.attachments.media_keys.forEach((mediaKey) => {
          mediaTweetMap[mediaKey] = tweet.id;
        });
      });
      mediaUrls = response.data.includes.media.map((media) => ({
        url: media.url,
        tweetId: mediaTweetMap[media.media_key],
      }));
    }
    return { mediaUrls, resultCount: result_count, oldestId: oldest_id };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getMediaUrlsFromTwitter,
};
