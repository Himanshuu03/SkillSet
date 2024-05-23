"use client";
import React, { useState } from "react";
import axios from "axios";
import { apiLink } from "@/api";
import { useRouter } from "next/navigation";

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiLink + "/course", formData);
      router.push("/courses");
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error("Error creating course:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create a New Course</h2>
      
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
        <label htmlFor="instructor" className="block text-gray-700 font-semibold mb-2">
          Instructor
        </label>
        <input
          type="text"
          id="instructor"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter instructor"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="duration" className="block text-gray-700 font-semibold mb-2">
          Duration (hours)
        </label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter duration"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Create Course
      </button>
    </form>
  );
};

export default CreateCourseForm;
