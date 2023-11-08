import express from "express";
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";
// import cookieSession from "cookie-session";
import dotEnv from "dotenv";
//MiddleWares
import errorHandler from "./src/middlewares/error-handler";
// import fileBinder from "./src/routes/files";
// import campaignBinder from "./src/routes/campaigns";
import { ImagesRouter } from "./src/routes/images";
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
// fileBinder(app);
// campaignBinder(app);

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

app.listen(process.env.PORT || 8000, async () => {
  performCheckUps();
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_DB_CONN_STRING!, {}, () => {
      console.log("Connected to the database!");
    });
    console.log("Listenning on", process.env.PORT || 8000, "...");
  } catch (err) {
    console.log("Cannot connect to the database!");
  }
});
