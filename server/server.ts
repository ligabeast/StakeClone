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
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

import Express from "express";
import { Query, Send } from "express-serve-static-core";
interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}
interface TypedRequestBody<T> extends Express.Request {
  body: T;
}
export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}

app.use(bodyParser.json());

const generateToken = (payload): string => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

// Load environment variables from the .env file in the root directory
dotenv.config({ path: "../.env" });

const port = process.env.EXPRESS_PORT;
const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  methods: "GET, POST, OPTIONS, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
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
  dialectOptions: {
    connectTimeout: 3000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // Zeit in Millisekunden, um eine Verbindung zu erwerben
    idle: 10000, // Zeit in Millisekunden, nach der eine Verbindung in den Leerlauf geht
  },
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

app.post(
  "/login",
  (
    req: TypedRequestBody<{ username: string; password: string }>,
    res: TypedResponse<{
      success: boolean;
      message: string;
      token?: string;
      deposit?: number;
      username?: string;
    }>
  ) => {
    const { username, password } = req.body;

    // Check if username and password match
    if (true) {
      // Generate JWT token
      const token = generateToken({ username, password });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour
      });

      res.json({
        success: true,
        message: "Login successfully",
        token: token,
        username: "test",
        deposit: 50.0,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  }
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
