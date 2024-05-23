"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiLink } from "@/api";

const Courses = () => {
  const [data, setData] = useState({ courses: [] });

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(apiLink + "/course");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-center font-bold mb-6 text-blue-900">Courses List</h1>
      <div className="flex flex-wrap justify-center">
        {data.courses.length > 0 ? (
          data.courses.map((course, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <Link href={`/courses/${course._id}`}>
                <div className="bg-white hover:bg-blue-100 rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col">
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl text-blue-800 font-bold mb-2">
                      {course.title}
                    </h2>
                    <p className="text-gray-700 mb-4 flex-grow">
                      {course.description}
                    </p>
                    <p className="text-gray-500 mb-2">
                      Duration: {course.duration} hours
                    </p>
                    <p className="text-gray-500 mb-4">
                      Instructor: {course.instructor}
                    </p>
                    <h3 className="text-lg text-blue-700 font-semibold mb-2">
                      Modules
                    </h3>
                    <ul className="list-disc pl-5 text-gray-600">
                      {course.modules.map((module, moduleIndex) => (
                        <li key={moduleIndex} className="mb-2">
                          {module.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No courses available</div>
        )}
      </div>
    </div>
  );
};

export default Courses;
