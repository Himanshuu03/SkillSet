"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { apiLink } from "@/api";

const AddModuleVideosPage = () => {
  const searchParams = useSearchParams();

  const courseId = searchParams.get("courseId");
  const moduleId = searchParams.get("moduleId");

  return <AddVideoForm courseId={courseId} moduleId={moduleId} />;
};

const AddVideoForm = ({ courseId, moduleId }) => {
  const [videos, setVideos] = useState([{ title: "", url: "" }]);

  const handleVideoChange = (index, key, value) => {
    const newVideos = [...videos];
    newVideos[index][key] = value;
    setVideos(newVideos);
  };

  const handleAddVideo = () => {
    setVideos([...videos, { title: "", url: "" }]);
  };

  const handleRemoveVideo = (index) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(videos);
    try {
      const response = await axios.post(
        apiLink + `/course/${courseId}/${moduleId}/videos/add`,
        { videosData: videos }
      );
      console.log("Videos added successfully:", response.data);
      // Reset form fields
      setVideos([{ title: "", url: "" }]);
      // Redirect or update UI as needed
    } catch (error) {
      console.error("Error adding videos:", error);
    }
  };

  const handleDeleteVideos = async () => {
    try {
      const res = await axios.delete(
        apiLink + `/course/${courseId}/${moduleId}/videos/delete`
      );
      console.log(res, "d");

      // After successfully deleting MCQs, you may want to update the UI accordingly.
      // For simplicity, we'll just refetch the assignments.
    } catch (error) {
      console.error("Error deleting MCQs:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Videos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {videos.map((video, index) => (
          <div key={index} className="mt-4">
            <label className="block font-medium">Video {index + 1}:</label>
            <input
              type="text"
              value={video.title}
              onChange={(e) =>
                handleVideoChange(index, "title", e.target.value)
              }
              className="form-input w-full mt-2"
              placeholder="Video Title"
              required
            />
            <input
              type="text"
              value={video.url}
              onChange={(e) => handleVideoChange(index, "url", e.target.value)}
              className="form-input w-full mt-2"
              placeholder="Video URL"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveVideo(index)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Remove Video
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddVideo}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Video
        </button>
        <br />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Videos
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Delete</h3>

        <button
          onClick={() => {
            handleDeleteVideos();
            alert("deleted");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete All videos
        </button>
      </div>
    </div>
  );
};

export default AddModuleVideosPage;
