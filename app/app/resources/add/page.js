"use client"
import React, { useState } from "react";
import axios from "axios";
import { apiLink } from "@/api";
import { useRouter } from "next/navigation";

const UploadResourceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    type: "video",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resource = await axios.post(apiLink + "/resource", formData);
      router.push("/resources");
      console.log(resource.data);
      // Handle success
    } catch (error) {
      console.error("Error uploading resource:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Upload Resource</h2>
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter title"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="url" className="block text-gray-700 font-semibold mb-2">
          URL or File URL
        </label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter URL or File URL"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter description"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="video">Video</option>
          <option value="document">Document</option>
        </select>
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Upload Resource
      </button>
    </form>
  );
};

export default UploadResourceForm;
