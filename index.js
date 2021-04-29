const { getMediaUrlsFromTwitter } = require("./twitterFetcher");

let hasNextResults = true;
let untilId;

const TWITTER_USER_ID = "";

(async () => {
  while (hasNextResults) {
    const { mediaUrls, resultCount, oldestId } = await getMediaUrlsFromTwitter(
      TWITTER_USER_ID,
      untilId
    );
    hasNextResults = resultCount === 10;
    untilId = oldestId;
    console.log(mediaUrls);
  }
})();
