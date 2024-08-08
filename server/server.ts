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

import bcrypt from "bcrypt";

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
const allowedOrigins = process.env.CORS_ORIGIN.split(",");
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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

const saltRounds = 10;

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

import { schema as UserSchema } from "./schemas/user.js";
const User = sequelize.define("User", UserSchema);

// middleware for jwt token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "A token is required for authentication",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

app.post(
  "/login",
  async (
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

    try {
      // Query to get the hashed password from the database
      const userFound = await User.findOne({
        where: {
          username,
        },
        attributes: ["password", "deposit", "id"],
      });
      if (userFound?.password) {
        const storedHashedPassword = userFound.password;
        const deposit = userFound.deposit;
        const userid = userFound.id;
        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(
          password,
          storedHashedPassword
        );

        if (!isPasswordMatch) {
          return res.status(401).json({
            success: false,
            message: "Invalid username or password",
          });
        }

        // Generate JWT token
        const token = generateToken({
          username,
          password: storedHashedPassword,
          userid,
        });

        // Set the token in a cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600000, // 1 hour
        });

        return res.json({
          success: true,
          message: "Login successfully",
          token: token,
          username: username,
          deposit: deposit,
        });
      } else {
        return res.status(402).json({
          success: false,
          message: "Invalid username or password",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while logging in.",
      });
    }
  }
);

app.post(
  "/register",
  async (
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

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //check if user already exists

    const checkDb = await User.findAll({
      where: {
        username,
      },
      attributes: ["id"],
    });

    if (checkDb.length > 0) {
      return res.status(401).json({
        success: false,
        message: "Username already exists",
      });
    }

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    const token = generateToken({
      username,
      password: hashedPassword,
      userid: user.id,
    });

    if (user) {
      res.json({
        success: true,
        message: "User registered successfully",
        token: token,
        username: username,
        deposit: 0,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to register user",
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
