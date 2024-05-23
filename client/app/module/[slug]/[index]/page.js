"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const Page = ({ params }) => {
  const [AssignData, setData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (questionId, option) => {
    if (!submitted) {
      setUserAnswers({ ...userAnswers, [questionId]: option });
    }
  };

  const calculateScore = () => {
    let score = 0;
    AssignData.assignments[0].questions.forEach((question) => {
      if (
        userAnswers[question._id] ===
        question.options[parseInt(question.correctAnswer - 1)]
      ) {
        score++;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetest = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/course/${params.slug}`
        );
        const { course } = await response.json();

        setData(course.modules[params.index]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <div className="bg-slate-800 text-gray-200 min-h-screen">
      <Navbar/>
      {AssignData && (
        <div className="max-w-3xl mx-auto mt-8">
          <h1 className="text-4xl font-bold mb-8 text-center">{AssignData.title}</h1>
          <div className="my-5 flex flex-wrap justify-center items-center">
            {AssignData.videos.map((video) => {
              console.log(video);
              return (
                <div key={video.id} className="mb-8 w-full lg:w-1/2 px-4">
                  <h2 className="text-lg font-medium mb-4 text-center">{video.title}</h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-full rounded-lg shadow-lg"
                      src={video.url}
                      title={`YouTube video player - ${video.title}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              );
            })}
          </div>

          {AssignData.assignments[0].questions.map((question) => (
            <div key={question._id} className="mb-8">
              <h2 className="text-lg font-medium mb-4">{question.questionText}</h2>
              <div className="flex flex-col space-y-2">
                {question.options.map((option) => {
                  const isSelected = userAnswers[question._id] === option;
                  const isCorrect =
                    option ===
                    question.options[parseInt(question.correctAnswer - 1)];
                  let buttonClass =
                    "p-2 border text-left w-full rounded-md transition-colors duration-200";
                  if (isSelected && !submitted) {
                    buttonClass += " bg-yellow-500 text-white";
                  } else if (submitted) {
                    buttonClass += isCorrect
                      ? " bg-green-500 text-white"
                      : " bg-red-500 text-white";
                  } else {
                    buttonClass += " bg-gray-200 text-gray-800";
                  }
                  return (
                    <button
                      key={option}
                      className={buttonClass}
                      onClick={() => handleOptionSelect(question._id, option)}
                      disabled={submitted}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center">
            {submitted && (
              <div className="bg-gray-700 rounded-md p-4 my-4 text-center">
                <h2 className="text-lg font-bold mb-2">Your Score:</h2>
                <p className="text-xl font-semibold">
                  {calculateScore()} /{" "}
                  {AssignData.assignments[0].questions.length}
                </p>
              </div>
            )}
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className="bg-red-500 text-white py-2 px-4 mb-4 rounded-md mt-8 transition-colors duration-200 hover:bg-red-600"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleRetest}
                className="bg-blue-500 text-white py-2 px-4 mb-4 rounded-md mt-8 transition-colors duration-200 hover:bg-blue-600"
              >
                Retest
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
