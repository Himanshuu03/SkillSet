"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await fetch("http://localhost:9000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Login successful");
        localStorage.setItem("username", formData.username);

        router.push("/");
      } else {
        alert("Invalid Credentials");
        console.log("Login failed");
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
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-700 text-gray-200 rounded shadow">
        <h2 className="text-4xl font-bold text-center text-gray-200">Login</h2>
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
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
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
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
              required
            />
          </div>
          <p className="text-gray-100 text-center">
            Don't have an account?{" "}
            <a className="text-blue-500" href="/register">
              Register now
            </a>
          </p>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
