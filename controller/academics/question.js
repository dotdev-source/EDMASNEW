const asyncHandler = require("express-async-handler");
const Question = require("../../models/academic/Questions");
const Exam = require("../../models/academic/Exam");

exports.createQuestion = asyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  //Find Exam
  const examFound = await Exam.findById(req.params.examsID);

  if (!examFound) {
    throw new Error(`Exam not found`);
  }

  //Check if the Question exist
  const questionExist = await Question.findOne({ question });
  if (questionExist) {
    throw new Error(`Question already exists`);
  }

  //Create Question
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth?._id,
  });

  //add the question to the Exam
  examFound.questions.push(questionCreated?._id);
  //Save the Question into the exam collection
  await examFound.save();

  res.status(201).json({
    status: "success",
    message: "Question Created successfully",
    data: questionCreated,
  });
});

//Get all Questions
//GET api/v1/questions
//Private route
exports.getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();

  res.status(200).json({
    status: "success",
    message: "Questions fetched successfully",
    data: questions,
  });
});

//Get single Question
//GET api/v1/questions/:id
//Private route
exports.getSingleQuestion = asyncHandler(async (req, res) => {

  const singleQuestion = await Question.findById(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Question Fetched Successfully",
    data: singleQuestion,
  });
});

//Update Question
//PUTapi/v1/questions/:id
//Private Route
exports.updateQuestion = asyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  //Check if Question exist
  const QuestionFound = await Question.findOne({ question });

  if (QuestionFound) {
    throw new Error(`question does not exist`);
  }

  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    { question, optionA, optionB, optionC, optionD, correctAnswer },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Question Updated Successfully",
    data: updatedQuestion,
  });
});
