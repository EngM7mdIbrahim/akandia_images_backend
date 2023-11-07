import express from "express";
import "express-async-errors";
import cors from "cors";
// import cookieSession from "cookie-session";
import dotEnv from "dotenv";
//MiddleWares
import errorHandler from "./src/middlewares/error-handler";
import authBinder from "./src/routes/auth";
import mongoose, { Mongoose } from "mongoose";
import flushDatabase from "./src/utils/flush-database";
import isProdEnv from "./src/utils/is-production";
import advertisersBinder from "./src/routes/advertisers";
import fileBinder from "./src/routes/files";
import campaignBinder from "./src/routes/campaigns";
import adminBinder from "./src/routes/admins";
dotEnv.config();
const app = express();
app.set("trust proxy", 1);

function isAmazon() {
  return isProdEnv() && process.env.HOSTER && process.env.HOSTER === "Amazon";
}
function getClientLink() {
  return (
    (isProdEnv() ? "https://" : "http://") + process.env.CLIENT_DOMAIN ||
    "localhost:3000"
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const CORS_OPTIONS = {
  origin: [getClientLink(), "http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};
// @ts-ignore
app.use(cors());

//Routes
authBinder(app);
advertisersBinder(app);
fileBinder(app);
campaignBinder(app);
adminBinder(app);

//Middlewares
app.use(errorHandler);

function performCheckUps(
  ENV_VARS = [
    "JWT_SECRET_KEY",
    ["AMAZON_DB_CONN_STRING", "MONGO_DB_CONN_STRING"],
    "AWS_S3_UPLOAD_BUCKET",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_S3_REGION",
    "AWS_ACCESS_KEY_ID",
  ]
) {
  ENV_VARS.forEach((VAR) => {
    if (Array.isArray(VAR)) {
      let found = false;
      VAR.forEach((SUB_VAR) => {
        if (!Boolean(process.env[SUB_VAR])) return;
        found = true;
      });
      if (!found) {
        throw new Error(
          `At least of the following values: ${VAR.join(
            " or "
          )}. should be defined!`
        );
      }
    } else if (!process.env[VAR]) {
      throw new Error(`${VAR} must be deinfed in the enviroment variables!`);
    }
  });
}

app.listen(process.env.PORT || 8000, async () => {
  performCheckUps();
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      isAmazon()
        ? process.env.AMAZON_DB_CONN_STRING!
        : process.env.MONGO_DB_CONN_STRING!,
      isAmazon()
        ? {
            tlsCAFile: "rds-combined-ca-bundle.pem",
          }
        : {},
      () => {
        console.log("Connected to the database!");
      }
    );
    console.log("Listenning on", process.env.PORT || 8000, "...");
    console.log(
      `This database is${!isAmazon() ? "not" : ""} hosted on Amazon!`
    );
    if (process.env.FLUSH_DATABASE) {
      console.log("Detected Flush database flag! Flushing Database ...");
      await flushDatabase();
      console.log("Database is flushed successfully!");
    }
  } catch (err) {
    console.log("Cannot connect to the database!");
  }
});
