"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiLink } from "@/api";
import Link from "next/link";

const Page = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink + "/resource");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold my-4 text-center">Documents</h1>

      <Link href="/resources/add" passHref>
        <div className="bg-blue-500 text-white p-4 rounded shadow-md cursor-pointer hover:bg-blue-600 w-[200px] m-auto mb-5 transition duration-300">
          Add Resources
        </div>
      </Link>

      <div className="flex w-full h-full flex-wrap mx-4 justify-around mt-5">
        {documents.map((document) => (
          <div key={document._id} className="w-full md:w-[45%] h-max px-4 mb-4">
            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold">{document.title}</h2>
              <p className="text-gray-600">{document.description}</p>

              {document.type === "video" ? (
                <div>
                  <iframe
                    className="w-full h-[320px]"
                    src={document.name}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              ) : (
                <iframe
                  src={document.name}
                  className="w-full h-[300px]"
                  allow="autoplay"
                ></iframe>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
