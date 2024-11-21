import express from "express";
import { getAllSurveys, submitSurveyResponses,  } from "../controller/SurveyController";

const surveyRouter = express.Router();

// Route to submit survey responses
surveyRouter.post("/submit", submitSurveyResponses);

// Route to get all surveys
surveyRouter.get("/", getAllSurveys);

export default surveyRouter;
