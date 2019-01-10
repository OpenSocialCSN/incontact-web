import authClient from "./googleAuth";
import { getConnections } from "./getConnections";

const establishGoogleEndpoints = function(expressApp) {
  expressApp.get("/integrations/google/authUrl", (req, res) => {
    // res.send(authClient.getAuthUrl());
    const authUrl = authClient.getAuthUrl();
    res.statusCode = 302;
    res.setHeader("Location", authUrl);
    res.end();
  });

  expressApp.get("/integrations/google/oauth2callback", async (req, res) => {
    const code = req.query.code;
    const tokens = await authClient.getToken(code);
    const connections = await getConnections(tokens);
    console.log(`found ${connections.length} connections`);
    res.send(connections);

    // redirect user to url:
    // res.statusCode = 302;
    // res.setHeader("Location", "http://localhost:3000");
    // res.end();
  });
};

export default establishGoogleEndpoints;
