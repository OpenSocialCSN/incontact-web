import { google } from "googleapis";
import url from "url";

const config = {
  client_id:
    "904922297389-qoefkothr99iv3jd35quju1t5dr1ju8c.apps.googleusercontent.com",
  project_id: "incontact-dev-228201",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: "3PL_2opKmMQvqNO1cXrCYnmP",
  redirect_uris: [
    "https://www.incontact.me",
    `${
      process.env.NODE_ENV === "production"
        ? `https://incontactme.herokuapp.com`
        : `http://localhost:5000`
    }/integrations/google/oauth2callback`
  ],
  javascript_origins: [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://www.incontact.me"
  ]
};

class GoogleAuth {
  constructor(options) {
    this._options = options || { scopes: [] };
    // validate the redirectUri.  This is a frequent cause of confusion.
    if (!config.redirect_uris || config.redirect_uris.length === 0) {
      throw new Error("Invalid redirect uri");
    }
    const redirectUri = config.redirect_uris[config.redirect_uris.length - 1];

    // create an oAuth client to authorize the API call
    this.oAuth2Client = new google.auth.OAuth2(
      config.client_id,
      config.client_secret,
      redirectUri
    );
  }

  getAuthUrl() {
    const scopes = ["https://www.googleapis.com/auth/contacts.readonly"];
    return this.oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes.join(" ")
    });
  }

  async getToken(code) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    return tokens;
  }
}

module.exports = new GoogleAuth();
