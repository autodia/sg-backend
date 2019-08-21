const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { isAuth } = require("./middleware");

const { connectDB, parseAssayData, parseUsers } = require("./helpers/db");
const Assay = require("./models/Assay");
const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const { context } = require("./graphql/context");

const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  context
});
server.applyMiddleware({ app }); // app is from an existing express app

connectDB().then(() => {
  parseUsers(JSON.parse(fs.readFileSync(path.resolve(__dirname, "./assets/users.json"))));

  Assay.collection.drop(() => {
    console.log("Assays flushed...");
    parseAssayData(JSON.parse(fs.readFileSync(path.resolve(__dirname, "./assets/assays.json"))));
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready on port ${port}`);
  });
});
