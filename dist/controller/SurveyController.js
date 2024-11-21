"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSurveys = exports.submitSurveyResponses = void 0;
const SurveyModel_1 = require("../model/SurveyModel");
// Submit survey responses
const submitSurveyResponses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, responses } = req.body;
        // Validate input
        if (!user || !user.name || !user.email || !user.phone) {
            res.status(400).json({ message: "User information is required." });
        }
        if (!responses || !Array.isArray(responses) || responses.length === 0) {
            res.status(400).json({ message: "Survey responses are required." });
            return;
        }
        // Ensure all responses have `answer` as an array
        const validatedResponses = responses.map((response) => {
            if (!Array.isArray(response.answer)) {
                throw new Error(`Invalid response format for question ${response.questionId}`);
            }
            return response;
        });
        // Create and save survey
        const newSurvey = new SurveyModel_1.SurveyModel({ user, responses: validatedResponses });
        const savedSurvey = yield newSurvey.save();
        res.status(201).json({
            message: "Responses submitted successfully.",
            survey: savedSurvey
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.submitSurveyResponses = submitSurveyResponses;
// Get all surveys
const getAllSurveys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const surveys = yield SurveyModel_1.SurveyModel.find();
        res.status(200).json(surveys);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllSurveys = getAllSurveys;
