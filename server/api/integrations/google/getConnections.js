import "babel-core/register";
import "babel-polyfill";

const { google } = require("googleapis");
import authClient from "./googleAuth";

const { oAuth2Client } = authClient;

export async function getConnections(tokens) {
  if (!tokens) throw Error("getConnections called w/o tokens");
  oAuth2Client.credentials = tokens;

  const people = google.people({
    version: "v1",
    auth: oAuth2Client
  });

  const { data: userData } = await people.people.get({
    resourceName: "people/me",
    personFields: ["emailAddresses"]
  });

  let userEmail;
  forEach(userData.emailAddresses, emailObj => (userEmail = emailObj.value));

  // List all user connections / contacts
  // https://developers.google.com/people/api/rest/v1/people.connections
  let {
    data: { connections }
  } = await people.people.connections.list({
    personFields: [
      "names",
      "nicknames", // unused
      "emailAddresses",
      "coverPhotos", // unused
      "photos",
      "birthdays",
      "addresses",
      "residences", // unused
      "phoneNumbers",
      "biographies",
      "organizations", // unused
      "urls", // unused TODO: this is where social stuff resideds (twitter, facebook, etc)
      "occupations", // unused
      "sipAddresses" // unused
    ],
    resourceName: "people/me"
    // pageSize: 10
  });

  connections = connections.map(c => {
    try {
      c = translateToIncontact(c);
    } catch (e) {
      console.log("translation err:", e);
      c = null;
    }
    return c;
  });

  return {
    connections,
    emailAddress: userEmail
  };
}

const translateToIncontact = googleConnection => {
  const contact = {};
  forEach(googleConnection.names, nameObj => {
    if (nameObj.givenName) {
      contact.firstName = nameObj.givenName;
    }
    if (nameObj.familyName) {
      contact.lastName = nameObj.familyName;
    }
  });
  forEach(googleConnection.emailAddresses, emailObj => {
    const key = emailObj.type === "work" ? "workEmail" : "homeEmail";
    contact[key] = emailObj.value;
  });
  forEach(googleConnection.photos, photoObj => {
    if (!photoObj.default) {
      contact.imageUrl = photoObj.url;
    }
  });
  forEach(googleConnection.addresses, addressObj => {
    const key = addressObj.type === "work" ? "workAddress" : "homeAddress";
    contact[key] = addressObj.formattedValue;
  });
  forEach(googleConnection.birthdays, ({ date }) => {
    if (date) {
      const { year, month, day } = date;
      contact.birthday = new Date(year, month, day).getTime();
    }
  });
  forEach(googleConnection.phoneNumbers, ({ type, value }) => {
    const key =
      type && type.toUpperCase() === "WORK" ? "workPhone" : "homePhone";
    contact[key] = value;
  });
  forEach(googleConnection.biographies, ({ value }) => {
    contact.note = value;
  });

  const social = {};
  forEach(googleConnection.urls, ({ type, value }) => {
    type = type.toLowerCase();
    if (SOCIAL_BINDINGS[type]) {
      social[SOCIAL_BINDINGS[type]] = value;
    }
  });
  if (Object.keys(social).length > 0) {
    contact.social = social;
  }

  return contact;
};

const forEach = (arr, fn) => arr && arr.forEach(fn);

const SOCIAL_BINDINGS = {
  // must ignore case
  // "google version":"incontact"
  instagram: "instagram",
  linkedin: "linkedin",
  facebook: "facebook",
  skype: "skype",
  twitter: "twitter",
  homepage: "webpage"
};
