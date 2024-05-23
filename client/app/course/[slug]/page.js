"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/course/${params.slug}`
        );
        const data = await response.json();
        setData(data.course);
        console.log(data.course);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <div className="bg-slate-800 text-gray-200 min-h-screen">
      <Navbar/>
      {data ? (
        <div className="max-w-3xl mx-auto mt-8">
          <h1 className="text-4xl font-bold mb-6 text-center">{data.title}</h1>
          <p className="text-lg mb-4 text-center">
            Instructor: <span className="font-semibold">{data.instructor}</span>
          </p>
          <p className="text-lg mb-6 text-center">{data.description}</p>
          <h2 className="text-2xl font-bold mb-4">Modules</h2>
          <div className="grid grid-cols-1 gap-6">
            {data.modules.map((module, index) => (
              <Link
                key={module._id}
                href={{
                  pathname: "/module",
                  query: { ...module },
                }}
                as={`/module/${params.slug}/${index}`}
              >
                <div className="bg-slate-700 text-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-slate-600">
                  <div className="p-6">
                    <p className="font-semibold text-xl mb-2">{module.title}</p>
                    <p className="text-base mb-4 text-gray-700">{module.description}</p>
                    <div className="flex items-center text-sm text-gray-200">
                      <span className="mr-4">
                        <i className="far fa-file-alt mr-1"></i>
                        {module.assignments.length} Assignments
                      </span>
                      <span>
                        <i className="far fa-play-circle mr-1"></i>
                        {module.videos.length} Videos
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xl text-center">Loading...</p>
      )}
    </div>
  );
};

export default Page;
