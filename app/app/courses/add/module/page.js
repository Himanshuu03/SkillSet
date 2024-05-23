"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { apiLink } from "@/api";

const AddModuleForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [moduleTitle, setModuleTitle] = useState("");
  const [CourseId, setCourseId] = useState(id);
  const [videos, setVideos] = useState([{ title: "", url: "" }]);
  const [assignments, setAssignments] = useState([
    { title: "", type: "MCQ", questions: [] },
  ]);

  const handleVideoChange = (index, key, value) => {
    const newVideos = [...videos];
    newVideos[index][key] = value;
    setVideos(newVideos);
  };

  const handleAssignmentChange = (index, key, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][key] = value;
    setAssignments(newAssignments);
  };

  const handleAddVideo = () => {
    setVideos([...videos, { title: "", url: "" }]);
  };

  const handleAddAssignment = () => {
    setAssignments([...assignments, { title: "", type: "MCQ", questions: [] }]);
  };

  const handleAddQuestion = (index) => {
    const newAssignments = [...assignments];
    newAssignments[index].questions.push({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      questionType: "MCQ",
    });
    setAssignments(newAssignments);
  };

  const handleRemoveQuestion = (assignIndex, quesIndex) => {
    const newAssignments = [...assignments];
    newAssignments[assignIndex].questions.splice(quesIndex, 1);
    setAssignments(newAssignments);
  };

  const handleQuestionChange = (assignIndex, quesIndex, key, value) => {
    const newAssignments = [...assignments];
    newAssignments[assignIndex].questions[quesIndex][key] = value;
    setAssignments(newAssignments);
  };

  const handleOptionChange = (assignIndex, quesIndex, optionIndex, value) => {
    const newAssignments = [...assignments];
    newAssignments[assignIndex].questions[quesIndex].options[optionIndex] =
      value;
    setAssignments(newAssignments);
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        apiLink + "/course/" + CourseId + "/modules",
        {
          moduleTitle,
          videosArray: videos,
          assignments,
        }
      );
      console.log("Module added successfully:", response.data);
      setModuleTitle("");
      setVideos([{ title: "", url: "" }]);
      setAssignments([{ title: "", type: "MCQ", questions: [] }]);
      router.push("/courses/" + CourseId);
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Add Module</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="moduleTitle" className="block font-medium text-gray-700">
              Module Title:
            </label>
            <input
              type="text"
              id="moduleTitle"
              value={moduleTitle}
              onChange={(e) => setModuleTitle(e.target.value)}
              className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
              placeholder="Module Title"
              required
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Videos</h3>
          {videos.map((video, index) => (
            <div key={index} className="space-y-4">
              <label className="block font-medium text-gray-700">
                Video {index + 1}:
              </label>
              <input
                type="text"
                value={video.title}
                onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
                placeholder="Video Title"
              />
              <input
                type="text"
                value={video.url}
                onChange={(e) => handleVideoChange(index, "url", e.target.value)}
                className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
                placeholder="Video URL"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddVideo}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
          >
            Add Video
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Assignments</h3>
          {assignments.map((assignment, assignIndex) => (
            <div key={assignIndex} className="space-y-4">
              <label className="block font-medium text-gray-700">
                Assignment {assignIndex + 1} Title:
              </label>
              <input
                type="text"
                value={assignment.title}
                onChange={(e) => handleAssignmentChange(assignIndex, "title", e.target.value)}
                className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
                placeholder="Assignment Title"
              />
              <label className="block font-medium text-gray-700 mt-2">
                Assignment {assignIndex + 1} Type:
              </label>
              <select
                value={assignment.type}
                onChange={(e) => handleAssignmentChange(assignIndex, "type", e.target.value)}
                className="form-select w-full mt-2 border-gray-300 rounded-md shadow-sm"
              >
                <option value="MCQ">MCQ</option>
                {/* <option value="SubmissionLink">Submission Link</option> */}
              </select>
              {assignment.type === "SubmissionLink" && (
                <div className="mt-4">
                  <label className="block font-medium text-gray-700">Submission Link:</label>
                  <input
                    type="text"
                    value={assignment.link}
                    onChange={(e) => handleAssignmentChange(assignIndex, "link", e.target.value)}
                    className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
                    placeholder="Submission Link"
                  />
                </div>
              )}
              {assignment.type === "MCQ" && (
                <div className="mt-4 space-y-4">
                  <button
                    type="button"
                    onClick={() => handleAddQuestion(assignIndex)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition duration-300"
                  >
                    Add Question
                  </button>
                  {assignment.questions.map((question, quesIndex) => (
                    <div key={quesIndex} className="space-y-4 mt-4">
                      <label className="block font-medium text-gray-700">
                        Question {quesIndex + 1}:
                      </label>
                      <input
                        type="text"
                        value={question.questionText}
                        onChange={(e) =>
                          handleQuestionChange(
                            assignIndex,
                            quesIndex,
                            "questionText",
                            e.target.value
                          )
                        }
                        className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
                        placeholder="Question Text"
                      />
                      <label className="block font-medium text-gray-700 mt-2">Options:</label>
                      {question.options.map((option, optionIndex) => (
                        <input
                          key={optionIndex}
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(assignIndex, quesIndex, optionIndex, e.target.value)
                          }
                          className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      ))}
                      <label className="block font-medium text-gray-700 mt-2">Correct Answer:</label>
                      <input
                        type="text"
                        value={question.correctAnswer}
                        onChange={(e) =>
                          handleQuestionChange(
                            assignIndex,
                            quesIndex,
                            "correctAnswer",
                            e.target.value
                          )
                        }
                        className="form-input w-full mt-2 border-gray-300 rounded-md shadow-sm"
                        placeholder="Correct Answer"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(assignIndex, quesIndex)}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 transition duration-300"
                      >
                        Remove Question
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* <button
            type="button"
            onClick={handleAddAssignment}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
          >
            Add Assignment
          </button> */}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 transition duration-300"
        >
          Add Module
        </button>
      </form>
    </div>
  );
};

export default AddModuleForm;
