const axios = require("axios");

const { TWITTER_BEARER_TOKEN } = require("./env");

const axiosInstance = axios.create({
  baseURL: "https://api.twitter.com/2/",
  headers: {
    Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
  },
});

const getMediaUrlsFromTwitter = async (userId, untilId) => {
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
    const mediaUrls = response.data.includes.media.map((media) => media.url);
    return { mediaUrls, result_count, oldest_id };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getMediaUrlsFromTwitter,
};
