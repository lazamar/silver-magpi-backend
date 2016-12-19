/* eslint-disable camelcase */
const twitter = require('../twitter-api');

// Returns user infor if the app is authorised
module.exports = (req, res) => {
  const app_session_id = req.get('X-App-Token');

  twitter.mainUserDetails(res.locals.credentials)
    .then(info => {
      console.log(info);

      // For now, for simplicity, we are not creating a separate
      // app_access_token, we are just using the app_session_id for that.
      res.json({
        app_access_token: app_session_id,
        screen_name: res.locals.credentials.screen_name,
        profile_image_url_https: info.profile_image_url_https,
      });
    })
    .catch(err => {
      console.error('An error occurred when favoriting:', err);
      res.status(500).send(`{ error: ${err}}`);
    });
};
