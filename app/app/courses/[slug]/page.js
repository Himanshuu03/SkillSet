"use client";
import axios from "axios";
import { apiLink } from "@/api";
import Link from "next/link";
import { useEffect, useState } from "react";

const Courses = ({ params }) => {
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink + "/course/" + params.slug);
        setCourseData(response.data.course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-4xl text-blue-800 font-bold mb-4 text-center">{courseData.title}</h2>
          <h3 className="text-2xl text-gray-600 mb-4 text-center">Course ID: {courseData._id}</h3>
          <p className="text-gray-600 mb-4 text-center">{courseData.description}</p>
          <p className="text-gray-500 mb-2">Duration: {courseData.duration} hours</p>
          <p className="text-gray-500 mb-4">Instructor: {courseData.instructor}</p>

          <div className="mb-6">
            <h3 className="text-2xl text-blue-800 font-semibold mb-4">Modules</h3>
            <div>
              {courseData.modules && courseData.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="mb-4">
                  <div className="bg-blue-100 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
                    <Link href={`/add-videos?courseId=${courseData._id}&moduleId=${module._id}`}>
                      <p className="text-xl text-blue-600 font-semibold">{module.title}</p>
                    </Link>
                    <div className="mt-2">
                      <h4 className="text-lg text-gray-800 font-semibold">Videos</h4>
                      <ul className="list-inside">
                        {module.videos && module.videos.map((video, videoIndex) => (
                          <li key={videoIndex} className="text-gray-700">
                            {video.title}: <a href={video.url} className="text-blue-600">{video.url}</a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-lg text-gray-800 font-semibold">Assignments</h4>
                      <div className="space-y-2">
                        {module.assignments && module.assignments.map((assignment, assignmentIndex) => (
                          <details key={assignmentIndex} className="bg-gray-100 p-4 rounded-md shadow-md">
                            <summary className="cursor-pointer text-lg text-gray-800 font-semibold">{assignment.title}</summary>
                            <ul className="list-inside ml-4 mt-2">
                              {assignment.questions && assignment.questions.map((question, questionIndex) => (
                                <li key={questionIndex} className="mt-2">
                                  <p className="text-gray-800">{question.questionText}</p>
                                  <p className="text-gray-800">Type: {question.questionType}</p>
                                  <ul className="list-inside ml-4">
                                    {question.options && question.options.map((option, optionIndex) => (
                                      <li key={optionIndex} className="text-gray-600">{option}</li>
                                    ))}
                                  </ul>
                                  <p className="text-gray-800 mt-2">Correct Answer: {question.correctAnswer}</p>
                                </li>
                              ))}
                            </ul>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            {/* <h3 className="text-2xl text-blue-800 font-semibold mb-4">Resources</h3> */}
            <ul>
              {courseData.resources && courseData.resources.map((resource, resourceIndex) => (
                <li key={resourceIndex} className="mb-2 bg-blue-100 p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
                  <p className="text-gray-800 font-semibold">{resource}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href={`/courses/add/module?id=${courseData._id}`} className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-300">
              Add Module
            </Link>
            {/* <Link href={`/courses/add/resources?id=${courseData._id}`} className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-300">
              Add Resources
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
