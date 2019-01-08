const getRan = arr => arr[Math.floor(Math.random() * arr.length)];
const FIRST_NAMES = ["Joe", "Anne", "Eric", "Tina"];
const LAST_NAMES = ["Adams", "Johnson", "Nance", "Smith"];
const SOCIAL = [
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "skype"
  // "google",
  // "youtube",
];
const CONTACT = ["homeEmail", "workEmail", "workPhone", "homePhone"];
const FAKE_CONTACTS = [];

export default function getFakeContacts() {
  for (let i = 0; i < 15; i++) {
    const firstName = getRan(FIRST_NAMES);
    const lastName = getRan(LAST_NAMES);

    FAKE_CONTACTS.push({
      displayName: firstName + " " + lastName,
      firstName,
      lastName,
      id: i,
      [getRan(CONTACT)]: "fake",
      [getRan(CONTACT)]: "fake",
      social: {
        [getRan(SOCIAL)]: "fake",
        [getRan(SOCIAL)]: "fake",
        [getRan(SOCIAL)]: "fake"
      }
    });
  }
  return FAKE_CONTACTS;
}
