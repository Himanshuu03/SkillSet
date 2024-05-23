"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiLink } from "@/api";

const Page = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(apiLink + "/contact");
        const sortedContacts = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setContacts(sortedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{contact.name}</td>
                <td className="px-4 py-2">{contact.email}</td>
                <td className="px-4 py-2">{contact.subject}</td>
                <td className="px-4 py-2">{contact.message}</td>
                <td className="px-4 py-2">
                  {new Date(contact.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
