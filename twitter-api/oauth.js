

// POST oauth/request_token
const oauth_callback = 'http://myurl.com';
const response = twitter.requestToken(oauth_callback);

const {
  oauth_token,
  oauth_token_secret,
  oauth_callback_confirmed
} = response;

// GET oauth/authorize
twitter.redirectToAuthorize(oauth_token)

//...
// After the user says yes the oauth_callback will receive a call
const { oauth_token, oauth_verifier } = oauth_callback.req;

//POST oauth / access_token
const {
   oauth_token,
   oauth_token_secret,
   user_id,
   screen_name,
 } = twitter.giveMeTheAccessTokens(oauth_verifier);
