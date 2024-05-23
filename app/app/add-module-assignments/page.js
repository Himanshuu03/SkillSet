"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiLink } from "@/api";
import { useRouter } from "next/navigation";

const AddModuleAssignmentsPage = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const moduleId = searchParams.get("moduleId");

  console.log(courseId);

  return <AddMCQForm courseId={courseId} moduleId={moduleId} />;
};

const AddMCQForm = ({ courseId, moduleId }) => {
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const router = useRouter();

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleDeleteMCQs = async () => {
    try {
      const res = await axios.delete(
        apiLink + `/course/${courseId}/modules/${moduleId}/assignments`
      );
      console.log(res, "d");
    } catch (error) {
      console.error("Error deleting MCQs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(questions);
    try {
      const response = await axios.post(
        apiLink + `/course/${courseId}/${moduleId}/0`,
        { mcqsData: questions }
      );
      console.log("MCQs added successfully:", response.data);
      setQuestions([
        { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
      ]);
      router.push(`/courses/${courseId}/modules/${moduleId}`);
    } catch (error) {
      console.error("Error adding MCQs:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Add MCQs</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((question, index) => (
          <div key={index} className="space-y-4">
            <label className="block font-medium text-gray-700">
              Question {index + 1}:
            </label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(index, "questionText", e.target.value)
              }
              className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
              placeholder="Question Text"
              required
            />
            <label className="block font-medium text-gray-700 mt-2">
              Options:
            </label>
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, e.target.value)
                }
                className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
                placeholder={`Option ${optionIndex + 1}`}
                required
              />
            ))}
            <label className="block font-medium text-gray-700 mt-2">
              Correct Answer:
            </label>
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
              className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
              placeholder="Correct Answer"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 transition duration-300"
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition duration-300"
        >
          Add MCQs
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700">Assignments</h3>
        <button
          onClick={handleDeleteMCQs}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Delete MCQ
        </button>
      </div>
    </div>
  );
};

export default AddModuleAssignmentsPage;
