// pages/register.js
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Registration successful");
        router.push("login");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 gap-3">
      <div>
      <span className="text-4xl text-gray-100 font-bold shadow-md">S</span>
        <span className="text-2xl text-gray-100 font-semibold shadow-md">kill </span>
        <span className="text-4xl text-gray-100 font-bold shadow-md">S</span>
        <span className="text-2xl text-gray-100 font-font-semibold shadow-md">et</span>
      </div>
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-700 rounded shadow">
        <h2 className="text-2xl font-bold text-gray-200 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-black"
              required
            />
          </div>
          <p className="text-gray-100 text-center">
            Already have an account?{" "}
            <a className="text-blue-500" href="/login">
              Login
            </a>
          </p>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
