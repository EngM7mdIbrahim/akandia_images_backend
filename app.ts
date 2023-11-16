import express from "express";
import "express-async-errors";
import cors from "cors";
import dotEnv from "dotenv";
//MiddleWares
import errorHandler from "./src/middlewares/error-handler";
import { ImagesRouter } from "./src/routes/images";
import mongoose from "mongoose";
dotEnv.config();

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @ts-ignore
app.use(cors());

//Routes
app.use(ImagesRouter);
app.use("/downloads", express.static("downloads"));
app.use("/preview", express.static("preview"));

//Middlewares
app.use(errorHandler);

function performCheckUps(
  ENV_VARS = ["PORT", 
  ["MONGO_DB_CONN_STRING", "AMAZON_DB_CONN_STRING"]
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

export function appSetup(){
  performCheckUps();
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_DB_CONN_STRING!, {}, () => {
    console.log("Connected to the database!");
  });
}


export default app;
