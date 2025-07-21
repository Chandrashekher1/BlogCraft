import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { post_API, sample_image } from "../utils/constant"
import parse from 'html-react-parser';
import { FiUser, FiCalendar } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoBookmark } from "react-icons/go";
import { LuShare2 } from "react-icons/lu";
import he from 'he';
import Skeleton from "@mui/material/Skeleton";

const PostView = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const token = localStorage.getItem("authorization");
  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate('/login');
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

  const date = postData && new Date(postData.date).toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-6xl mx-auto p-4 px-8 min-h-screen bg-gray-950 text-white">
      <div className="flex flex-col justify-between items-start gap-6 mb-6">
        <div className="flex mt-4">
          <p className="font-semibold -mt-4">
            <span className="text-gray-400 flex">
              <FiUser style={{ marginTop: '4px', marginRight: '8px' }} />
              {postData ? postData.author || "Unknown" : <Skeleton width={100} height={20} />}
            </span>
          </p>
          <p className="font-medium text-gray-400 -mt-4 flex">
            <span className="mx-2">
              <FiCalendar style={{ marginTop: '4px', marginLeft: '8px' }} />
            </span>
            {postData ? date : <Skeleton width={120} height={20} />}
          </p>
        </div>

        {postData ? (
          <h1 className="text-3xl md:text-4xl font-bold flex-1">{postData.title}</h1>
        ) : (
          <Skeleton variant="text" width="80%" height={40} />
        )}

        <div className="flex justify-evenly border-b border-b-gray-700 pb-8 w-full">
          <p className="flex"><IoMdHeartEmpty className="mt-1 mr-2" /> Like</p>
          <p className="flex mx-6"><GoBookmark className="mt-1 mr-2" /> Save</p>
          <p className="flex mx-6"><LuShare2 className="mt-1 mr-2" /> Share</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {postData ? (
          Array.isArray(postData.image) && postData.image.length > 0 ? (
            postData.image.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Post Image ${index + 1}`}
                className="w-80 object-cover rounded-lg shadow-md max-h-80 my-2 md:mx-4"
              />
            ))
          ) : (
            <img
              src={sample_image}
              alt="Default Post"
              className="w-96 h-80 object-cover rounded-lg shadow-md md:mx-4"
            />
          )
        ) : (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={320} height={240} className="rounded-lg" />
          ))
        )}
      </div>

      <div className="mt-6">
        {postData ? (
          <div className="md:text-xl mb-4 text-wrap mx-4 prose prose-invert max-w-none">
            {parse(he.decode(postData.content))}
          </div>
        ) : (
          <div className="space-y-4 mx-4">
            <Skeleton variant="text" width="90%" height={30} />
            <Skeleton variant="text" width="80%" height={25} />
            <Skeleton variant="text" width="95%" height={25} />
            <Skeleton variant="text" width="60%" height={25} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostView;
