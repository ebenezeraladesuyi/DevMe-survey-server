import { Request, Response } from "express";
import { IResponse, SurveyModel } from "../model/SurveyModel";

// Submit survey responses
export const submitSurveyResponses = async (req: Request, res: Response): Promise<void> => {
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
    const validatedResponses = responses.map((response: IResponse) => {
      if (!Array.isArray(response.answer)) {
        throw new Error(`Invalid response format for question ${response.questionId}`);
      }
      return response;
    });

    // Create and save survey
    const newSurvey = new SurveyModel({ user, responses: validatedResponses });
    const savedSurvey = await newSurvey.save();

    res.status(201).json({ 
      message: "Responses submitted successfully.", 
      survey: savedSurvey 
    });
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all surveys
export const getAllSurveys = async (req: Request, res: Response) => {
  try {
    const surveys = await SurveyModel.find();
    res.status(200).json(surveys);
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
};
