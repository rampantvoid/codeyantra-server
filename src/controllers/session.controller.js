import { Case } from "../models/case.model.js";
import { Question } from "../models/question.model.js";
import { Session } from "../models/session.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createSession = asyncHandler(async (req, res) => {
  console.log(req.body);
  const sessionDetails = req.body.sessionData;
  const userId = req.body.user;
  const questions = sessionDetails.questions;

  const newSession = await Session.create({
    createdBy: userId,
    title: sessionDetails.title,
    duration: sessionDetails.time,
    semester: sessionDetails.semester,
    batch: sessionDetails.batch,
  });

  for (let question of questions) {
    const newQuestion = await Question.create({
      sessionId: newSession._id,
      text: question.text,
      points: question.points,
    });

    for (let testcase of question.testCases) {
      const newCase = await Case.create({
        questionId: newQuestion._id,
        input: testcase.input,
        output: testcase.output,
      });
    }
  }

  return res.status(200).json(new ApiResponse(200, newSession));
});

const getSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const session = await Session.findById(sessionId);

  const questions = await Question.find({ sessionId });

  const questionsWithTestCases = await Promise.all(
    questions.map(async (question) => {
      const testCases = await Case.find({ questionId: question._id });
      return {
        id: question._id,
        text: question.text,
        points: question.points,
        testCases: testCases.map((tc) => ({
          id: tc._id,
          input: tc.input,
          output: tc.output,
        })),
      };
    })
  );

  const sessionData = {
    id: session._id,
    title: session.title,
    duration: session.duration,
    semester: session.semester,
    batch: session.batch,
    status: session.status,
    questions: questionsWithTestCases,
  };

  return res.status(200).json(new ApiResponse(200, sessionData));
});
export { createSession, getSession };

// {
//     "title": "Enter Title",
//     "questions": [
//         {
//             "id": 1,
//             "text": "Cra skadk aksdj a",
//             "points": 10,
//             "files": [],
//             "testCases": [
//                 {
//                     "id": 1,
//                     "input": "3 4 5",
//                     "output": "5 4 3"
//                 },
//                 {
//                     "id": 2,
//                     "input": "2 2",
//                     "output": "1 1"
//                 }
//             ]
//         },
//         {
//             "id": 2,
//             "text": "Some ",
//             "points": 20,
//             "files": [],
//             "testCases": [
//                 {
//                     "id": 1,
//                     "input": "3 4 4",
//                     "output": "2 2 2"
//                 }
//             ]
//         }
//     ],
//     "time": 60,
//     "semester": "3",
//     "batch": "2"
// }
