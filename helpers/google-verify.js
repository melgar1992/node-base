const {
  OAuth2Client
} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token = '') {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  // console.log(payload);
  const {
    name,
    email,
    picture
  } = ticket.getPayload();
  return {
    nombre: name,
    correo: email,
    img: picture
  }
}
// googleVerify().catch(console.error);


module.exports = {
  googleVerify
}