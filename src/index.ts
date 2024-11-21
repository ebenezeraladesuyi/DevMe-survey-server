import express, { Application } from "express";
import appConfig from "./app";
import dbConfig from "./config/db";


const app: Application = express();
appConfig(app);
dbConfig();


const port = 2000

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})