"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SurveyController_1 = require("../controller/SurveyController");
const surveyRouter = express_1.default.Router();
// Route to submit survey responses
surveyRouter.post("/submit", SurveyController_1.submitSurveyResponses);
// Route to get all surveys
surveyRouter.get("/", SurveyController_1.getAllSurveys);
exports.default = surveyRouter;
