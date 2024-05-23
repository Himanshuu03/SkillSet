"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { apiLink } from "@/api";

const AddResourceForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [resource, setResource] = useState("");
  const [resources, setResources] = useState([]);
  const router = useRouter();

  const addResource = () => {
    if (resource.trim() !== "") {
      setResources([...resources, resource.trim()]);
      setResource("");
    }
  };

  const removeResource = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiLink}/course/${id}/resources`, {
        resources: resources,
      });
      console.log(response.data); // Handle success response here
      router.push("/courses/" + id);
    } catch (error) {
      console.error("Error adding resources:", error); // Handle error here
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add Resources</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Enter resource"
            required
          />
          <button
            type="button"
            onClick={addResource}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
        <div>
          <ul className="mt-2">
            {resources.map((res, index) => (
              <li key={index} className="flex justify-between bg-gray-100 rounded-md p-2">
                <span>{res}</span>
                <button
                  type="button"
                  onClick={() => removeResource(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Resources
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResourceForm;

