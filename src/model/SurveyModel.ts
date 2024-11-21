import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
}

export interface IResponse {
  questionId: string; // A unique identifier for each question
  answer: string[];     // The user's response
}

export interface ISurvey extends Document {
  user: IUser;
  responses: IResponse[];
  createdAt: Date;
}

const responseSchema = new Schema<IResponse>({
  questionId: { type: String, required: true },
  answer: { type: [String], required: true },
});

const surveySchema = new Schema<ISurvey>(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true, match: /.+\@.+\..+/ },
      phone: { type: String, required: true },
    },
    responses: [responseSchema],
  },
  { timestamps: true }
);

export const SurveyModel = mongoose.model<ISurvey>("Survey", surveySchema);
