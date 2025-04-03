import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { post_API } from "../utils/constant";

const PostView = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const token = localStorage.getItem("authorization");

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`${post_API}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const postJson = await response.json();
        console.log(postJson);

        setPostData(postJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!postData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold flex-1">{postData.title}</h1>
        <p className="text-lg flex-1 md:text-2xl">{postData.content}</p>
      </div>

      <div className="w-full">
        <img
          src={postData.image || "https://marketinginsidergroup.com/wp-content/uploads/2023/09/shutterstock_234456937-scaled-1.jpg"}
          alt="Post"
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Author & Date */}
      <div className="mt-6">
        <p className="text-xl font-semibold">
          Written By: <span className="text-cyan-600 font-bold">{postData.author || "Unknown"}</span>
        </p>
        <p className="text-lg font-medium text-gray-600">Date: {postData.date || "Not Available"}</p>
      </div>
    </div>
  );
};

export default PostView;
