import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { post_API, sample_image } from "../utils/constant"
import Shimmer from "../components/Shimmer";
import parse from 'html-react-parser';
import { FiUser } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi"
import { IoMdHeartEmpty } from "react-icons/io";
import { GoBookmark } from "react-icons/go";
import { LuShare2 } from "react-icons/lu";

const PostView = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const token = localStorage.getItem("authorization");
  const navigate = useNavigate()

  const handlenavigate = () => {
    navigate('/login')
  }
  useEffect(() => {
    if (!id || !token) {
      handlenavigate()
      return
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
  }, [id,token])

  if (!postData) {
    return (
      <div className="h-screen" >
        <Shimmer/>
      </div>
    )
  }

  const date = new Date(postData.date).toLocaleDateString([], {
    month: 'long',
    day: 'numeric',
    year:'numeric'
  })

  return (
    <div className="max-w-6xl mx-auto p-4 px-8 min-h-screen bg-gray-950">
      <div className="flex flex-col  justify-between items-start gap-6 mb-6">
        <div className="flex mt-4">
          <p className=" font-semibold -mt-4"> <span className="text-gray-400 flex ">{<FiUser style={{marginTop:'4px', marginRight:'8px'}}/>} {postData.author || "Unknown"}</span></p>
          <p className="font-medium text-gray-400 -mt-4 flex"> <span className="mx-2">{<FiCalendar style={{marginTop:'4px',marginLeft:'8px'}}/>}</span> {date || "Not Available"}</p>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold flex-1">{postData.title}</h1>
        <div className="flex justify-evenly border-b border-b-gray-700 pb-8">
            <p className="flex"><IoMdHeartEmpty style={{marginTop:'4px', marginRight:'6px'}}/> <span>Like</span></p>
            <p className="flex mx-6"><GoBookmark style={{marginTop:'4px', marginRight:'6px'}}/> <span>Save</span></p>
            <p className="flex mx-6"><LuShare2 style={{marginTop:'4px', marginRight:'6px'}}/> <span>Share</span></p>
        </div>
        
      </div>
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap">
        {Array.isArray(postData.image) && postData.image.length > 0 ? (
          postData.image.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Post Image ${index + 1}`}
              className="w-80 object-cover rounded-lg shadow-md max-h-80  my-2 md:mx-4"
            />
          ))
        ) : (
          <img
            src={sample_image}
            alt="Default Post"
            className="w-96 h-80 object-cover rounded-lg shadow-md md:mx-4"
          />
        )}
    </div>
    <div className="flex">
      <p className="md:text-2xl mb-4 text-wrap mx-4">{parse(postData.content)}</p>
    </div>
    </div>
    </div>
  );
};

export default PostView;
