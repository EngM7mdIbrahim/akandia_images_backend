import mongoose from "mongoose";
import app, { appSetup } from "./app";

app.listen(process.env.PORT || 8000, async () => {
  try {
    appSetup();
    console.log("Listenning on", process.env.PORT || 8000, "...");
  } catch (err) {
    console.log("Cannot connect to the database!");
  }
});
