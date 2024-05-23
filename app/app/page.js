import { apiLink } from "@/api";
import axios from "axios";
import Head from "next/head";

import Link from "next/link";


export default function Home() {
  const loggin = async () => {
    const res = await axios.post(
      apiLink + "/auth/login",
      { username: "admin", password: "admin" },
      { withCredentials: true }
    );
    console.log(res);
  };

  return (
    <div className="container mx-auto p-8">
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-center">ADMIN PANEL</h1>
      <p className="text-lg mb-4 text-center">Choose what you want to do</p>

      <div className="flex justify-center gap-4">
        <Link href="/courses" passHref>
          <div className="w-[300px] bg-blue-500 text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Check Course</h2>
            <p className="text-sm">View and manage existing courses</p>
          </div>
        </Link>
        <Link href="/courses/add" passHref>
          <div className="w-[300px] bg-blue-500 text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Add Course</h2>
            <p className="text-sm">Create a new course</p>
          </div>
        </Link>
        {/* <Link href="/resources" passHref>
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Resources</h2>
            <p className="text-sm">Manage additional resources</p>
          </div>
        </Link>
        <Link href="/contact" passHref>
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Messages</h2>
            <p className="text-sm">Check and respond to messages</p>
          </div>
        </Link> */}
        {/* <button
          onClick={() => {
            loggin();
          }}
        >
          login
        </button> */}
      </div>
    </div>
  );
}
