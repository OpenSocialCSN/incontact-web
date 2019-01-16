// https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
import "babel-core/register";
import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

import establishEndpoints from "./api/endpoints";

async function initializeServer() {
  const port = process.env.PORT || 5000;
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await establishEndpoints(app);

  if (process.env.NODE_ENV === "production") {
    console.log("Server starting in prod mode");
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  } else {
    console.log("Server starting in dev mode");
  }

  app.listen(port, () => console.log(`Listening on port ${port}`));
}

initializeServer();
