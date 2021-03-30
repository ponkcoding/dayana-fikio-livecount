const puppeteer = require("puppeteer");

module.exports = {
  get: async (instagramUsername) => {
    // set some options (set headless to false so we can see
    // this automated browsing experience)
    let launchOptions = { headless: true, args: ["--start-maximized"] };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    // go to Instagram web profile (this example use Cristiano Ronaldo profile)
    await page.goto("https://instagram.com/" + instagramUsername);

    // check username exists or not exists
    let isUsernameNotFound = await page.evaluate(() => {
      // check selector exists
      if (document.getElementsByTagName("h2")[0]) {
        // check selector text content
        if (
          document.getElementsByTagName("h2")[0].textContent ==
          "Sorry, this page isn't available."
        ) {
          return true;
        }
      }
    });

    if (isUsernameNotFound) {
      console.log("Account not exists!");

      // close browser
      await browser.close();
      return;
    }

    // get username
    let username = await page.evaluate(() => {
      return document.querySelectorAll("header > section h1")[0].textContent;
    });

    // check the account is verified or not
    let isVerifiedAccount = await page.evaluate(() => {
      // check selector exists
      if (document.getElementsByClassName("coreSpriteVerifiedBadge")[0]) {
        return true;
      } else {
        return false;
      }
    });

    // get username picture URL
    let usernamePictureUrl = await page.evaluate(() => {
      return document.querySelectorAll("header img")[0].getAttribute("src");
    });

    // get number of total posts
    let postsCount = await page.evaluate(() => {
      return document
        .querySelectorAll("header > section > ul > li span")[0]
        .textContent.replace(/\,/g, "");
    });

    // get number of total followers
    let followersCount = await page.evaluate(() => {
      return document
        .querySelectorAll("header > section > ul > li span")[1]
        .getAttribute("title")
        .replace(/\,/g, "");
    });

    // close the browser
    await browser.close();

    return {
      username: username,
      is_verified_account: isVerifiedAccount,
      username_picture_url: usernamePictureUrl,
      posts_count: postsCount,
      followers_count: followersCount,
    };
  },
};
