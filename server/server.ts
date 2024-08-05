const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");

import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { makeExecutableSchema } from "@graphql-tools/schema";

import type { Request, Response } from "express";
import type { CorsOptions } from "cors";
import resolvers from "./resolvers";
import { TIMEOUT } from "dns";

const { Sequelize } = require("sequelize");

// Load environment variables from the .env file in the root directory
dotenv.config({ path: "../.env" });

const port = process.env.EXPRESS_PORT;
const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  preflightContinue: true,
  methods: "GET, POST, OPTIONS, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
  maxAge: 86400,
};

if (process.env.CORS_ACTIVE === "true") {
  app.use(cors(corsOptions));

  app.options("*", (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Max-Age", "86400");
    res.send();
  });
}

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT } =
  process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  connectTimeout: 5000,
});

const typeDefs = loadSchemaSync("./schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true, // Activates GraphiQL in-browser tool
    context: {
      db: sequelize,
    },
  })
);

app.listen(port, async () => {
  console.log(`Server running at Port:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Connection to DB has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the DB:", error);
  }
});
