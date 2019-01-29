import authClient from "./googleAuth";
import { getConnections, getUserEmail } from "./getConnections";

const establishGoogleEndpoints = function(expressApp, graphQlResolvers) {
  expressApp.get("/integrations/google/authUrl", (req, res) => {
    const { userId, userIntegrationId, forwardingRoute } = req.query;
    const authUrl = authClient.getAuthUrl({
      userId,
      userIntegrationId,
      forwardingRoute
    });
    res.statusCode = 302;
    res.setHeader("Location", authUrl);
    res.end();
  });

  expressApp.get("/integrations/google/oauth2callback", async (req, res) => {
    const code = req.query.code;
    const token = await authClient.getToken(code);
    let { userId, userIntegrationId, forwardingRoute } = JSON.parse(
      req.query.state
    );

    const userEmail = await getUserEmail(token);
    const userIntegrations = await graphQlResolvers.User.integrations({
      _id: userId
    });
    const existingAccount = userIntegrations.find(
      acc => acc.syncStatus !== "UNAUTH" && acc.accountName === userEmail
    );

    let accountUpdateObj;
    if (existingAccount) {
      // PREVENT MULTIPLE IMPORTS OF SAME CONTACT LIST
      accountUpdateObj = {
        userId,
        _id: userIntegrationId,
        syncStatus: "ERR_DUPLICATE_ACCOUNT",
        apiToken: code
      };
    } else {
      await getContactsAndPersist(userId, token, graphQlResolvers);
      accountUpdateObj = {
        userId,
        _id: userIntegrationId,
        syncStatus: "SYNCED",
        apiToken: code,
        accountName: userEmail
      };
    }

    graphQlResolvers.Mutation.updateUserIntegration(null, accountUpdateObj);
    redirectUser(res, forwardingRoute);
  });
};

const getContactsAndPersist = async (userId, token, graphQlResolvers) => {
  const connections = await getConnections(token);
  connections.forEach(async c => {
    const { social } = c;
    delete c.social;
    c.userId = userId;
    const { _id } = await graphQlResolvers.Mutation.createContact(null, c);
    if (social) {
      social.contactId = _id;
      graphQlResolvers.Mutation.addSocial(null, social);
    }
  });
  return connections;
};

const redirectUser = (res, forwardingRoute = "") => {
  res.statusCode = 302;
  res.setHeader(
    "Location",
    process.env.NODE_ENV === "production"
      ? `https://incontactme.herokuapp.com/${forwardingRoute}`
      : `http://localhost:3000/${forwardingRoute}`
  );
  res.end();
};

export default establishGoogleEndpoints;
