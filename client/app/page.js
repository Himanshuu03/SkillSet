"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  const [coursesData, setCoursesData] = useState({ courses: [] });
  const [loading, setLoading] = useState(true);
  const [user, setuser] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:9000/course");
        const data = await response.json();
        setCoursesData(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    const getAuth = () => {
      const user = localStorage.getItem("username");
      console.log(user);
      setuser(user);
    };
    getAuth();
    console.log("user");

    fetchCourses();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen flex flex-col">
      <Navbar />
      {user ? (
        <main className="container mx-auto px-4 py-8 text-gray-200">
          <h2 className="text-4xl font-bold mb-6 text-white">Available Courses</h2>
          {loading ? (
            <p className="text-gray-300">Loading courses...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData.courses.length > 0 ? (
                coursesData.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-slate-700 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:bg-slate-600"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white">{course.title}</h3>
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    <a
                      href={`/course/${course._id}`}
                      className="w-full px-4 py-2 font-bold text-white bg-slate-500 rounded hover:bg-slate-700 focus:outline-none focus:ring focus:border-slate-300"
                    >
                      Solve
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No courses available at the moment.</p>
              )}
            </div>
          )}
        </main>
      ) : (
        <div className="flex justify-center items-center flex-grow">
        <Link href="/login">   
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">
            Login or Register
          </button>
        </Link>
        </div>
      )}
    </div>
  );
}
