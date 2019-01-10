import "babel-core/register";
import "babel-polyfill";

const { google } = require("googleapis");
import authClient from "./googleAuth";

const { oAuth2Client } = authClient;

export async function getConnections(tokens) {
  if (!tokens) throw Error("getConnections called w/o tokens");

  // List all user connections / contacts
  // https://developers.google.com/people/api/rest/v1/people.connections
  oAuth2Client.credentials = tokens;

  const people = google.people({
    version: "v1",
    auth: oAuth2Client
  });

  const {
    data: { connections }
  } = await people.people.connections.list({
    personFields: ["names", "emailAddresses"],
    resourceName: "people/me"
    // pageSize: 10
  });

  return connections;
}
