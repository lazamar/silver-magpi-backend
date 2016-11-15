/* eslint-disable camelcase */

// Returns user infor if the app is authorised
module.exports = (req, res) => {
  const app_session_id = req.get('X-App-Token');

  // For now, for simplicity, we are not creating a separate
  // app_access_token, we are just using the app_session_id for that.
  res.json({
    app_access_token: app_session_id,
    screen_name: res.locals.credentials.screen_name,
  });
};
