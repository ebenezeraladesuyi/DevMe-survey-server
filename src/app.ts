import express, { Application, Request, Response } from "express";
import cors from "cors";
import surveyRouter from "./router/SurveyRoutes";



const appConfig = (app: Application) => {
    app.use(express.json()).use(cors());

    // routes
    app.use("/survey", surveyRouter)


    app.get("/", (req: Request, res: Response): any => {
        return res.status(200).json({
            message: "default get"
        })
    })
}

export default appConfig;