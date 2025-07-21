import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { post_API, sample_image } from "../utils/constant";
import parse from "html-react-parser";
import { FiUser, FiCalendar } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoBookmark } from "react-icons/go";
import { LuShare2 } from "react-icons/lu";
import he from "he";
import { Skeleton, Box } from "@mui/material";

const PostView = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const token = localStorage.getItem("authorization");
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (!id || !token) {
      handlenavigate();
      return;
    }

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
        setPostData(postJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPost();
  }, [id, token]);

  if (!postData) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-900 text-white">
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3}}>
          <Skeleton variant="text" width="70%" height={40} />
          <Skeleton variant="text" width="40%" height={25} />
          <Skeleton variant="rectangular" width="100%" height={250} sx={{ borderRadius: 2 }} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="85%" height={20} />
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="75%" height={20} />
        </Box>
      </div>
    );
  }

  const date = new Date(postData.date).toLocaleDateString([], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto p-4 px-8 min-h-screen bg-gray-950 text-white">
      <div className="flex flex-col justify-between items-start gap-6 mb-6">
        <div className="flex flex-wrap items-center mt-4 gap-4 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            <FiUser /> {postData.author || "Unknown"}
          </p>
          <p className="flex items-center gap-2">
            <FiCalendar /> {date || "Not Available"}
          </p>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">{postData.title}</h1>

        <div className="flex flex-wrap gap-6 border-b border-gray-700 pb-8">
          <p className="flex items-center gap-2"><IoMdHeartEmpty /> Like</p>
          <p className="flex items-center gap-2"><GoBookmark /> Save</p>
          <p className="flex items-center gap-2"><LuShare2 /> Share</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {Array.isArray(postData.image) && postData.image.length > 0 ? (
            postData.image.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Post Image ${index + 1}`}
                className="w-full sm:w-[80%] md:w-80 max-h-80 object-cover rounded-lg shadow-md"
              />
            ))
          ) : (
            <img
              src={sample_image}
              alt="Default Post"
              className="w-full sm:w-96 h-80 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        <div className="md:text-xl mb-4 text-wrap mx-4 prose prose-invert max-w-none">
          {parse(he.decode(postData.content))}
        </div>
      </div>
    </div>
  );
};

export default PostView;
