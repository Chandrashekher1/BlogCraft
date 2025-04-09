import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allPost_API, post_API, profile_APi } from '../utils/constant';

const Profile = () => {
  const token = localStorage.getItem("authorization");
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowPosts, setIsShowPosts] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("userId");
    navigate("/login");
    location.reload();
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch(profile_APi, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`${allPost_API}/${userId}`, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Failed to fetch posts");
      const posts = await res.json();
      setUserPosts(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchPostDelete = async (id) => {
    try {

      const res = await fetch(`${post_API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Failed to fetch posts")
      location.reload()
      fetchUserPosts()
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  const handleTogglePosts = () => {
    setIsShowPosts(!isShowPosts);
    if (!isShowPosts) {
      fetchUserPosts();
    }
  };

  useEffect(() => {
    fetchUserData();
    // fetchUserPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-black text-white px-4 py-10 gap-10">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl px-6 py-10 bg-gray-900 bg-opacity-50 shadow-xl shadow-cyan-800 rounded-2xl backdrop-blur-md text-center">
        <img 
          src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg" 
          alt="Profile" 
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover mx-auto border-4 border-cyan-500"
        />

        <h1 className="text-xl sm:text-2xl font-bold mt-6 flex justify-center flex-wrap">
          Name: {isLoading ? (
            <div className="w-32 h-5 bg-gray-700 rounded-md animate-pulse mx-2"></div>
          ) : (
            <span className="text-cyan-400 mx-2">{userData?.name}</span>
          )}
        </h1>

        <h2 className="text-base sm:text-xl mt-3 flex justify-center flex-wrap">
          Email: {isLoading ? (
            <div className="w-44 h-5 bg-gray-700 rounded-md animate-pulse mx-2"></div>
          ) : (
            <span className="text-gray-300 mx-2">{userData?.email}</span>
          )}
        </h2>

        <button 
          className="mt-8 w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg active:scale-95"
          onClick={handleLogout}
        >
          Logout
        </button>

        <div 
          className="mt-6 w-full text-center border border-cyan-600 rounded-md py-3 px-4 cursor-pointer shadow font-semibold hover:bg-cyan-950"
          onClick={handleTogglePosts}
        >
          My blogs <span className='font-bold text-xl ml-2'>{isShowPosts ? "←" : "→"}</span>
        </div>
      </div>

      <section className="w-full max-w-2xl px-2">
        {isShowPosts && (
          <div className="mt-6 max-h-96 overflow-y-auto space-y-4 p-6 bg-gray-900 bg-opacity-40 rounded-lg ">
            {userPosts.length === 0 ? (
              <p className="text-gray-400 text-center">No posts found.</p>
            ) : (
              userPosts.map((post, index) => (
                <>
                  <div key={index} className="p-4 bg-gray-800 rounded-md border border-cyan-500 shadow-md hover:scale-[0.98] transition-all duration-200 cursor-pointer">
                    <h3 className="text-lg sm:text-xl text-cyan-300 font-semibold">{post.title}</h3>
                    {/* <p className="text-gray-300 mt-2 text-sm">{post.content}</p> */}
                  </div>
                  <div className='flex justify-between mx-2'>
                    <button className='border p-2 rouded-lg cursor-pointer border-cyan-600 text-cyan-500 active:scale-95' onClick={() => {fetchPostDelete(post._id)}}>Delete</button>
                    <button className='border p-2 rouded-lg border-cyan-600 text-cyan-500 cursor-pointer active:scale-95'>Edit</button>
                  </div>
                </>
                
              ))
            )}
          </div>
        )}
      </section>
    </div>

  );
};

export default Profile;
