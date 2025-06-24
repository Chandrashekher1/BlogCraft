import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allPost_API, post_API, profile_APi } from '../utils/constant';

const Profile = () => {
  const token = localStorage.getItem("authorization");
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isShowPosts, setIsShowPosts] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
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
      if (!res.ok) throw new Error("Failed to delete post");
      fetchUserPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const fetchPostEdit = async (id) => {
    try {
      const res = await fetch(`${post_API}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent
        })
      });
      if (!res.ok) throw new Error("Failed to update post");
      setEditingPostId(null);
      fetchUserPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchUserPosts()
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:mx-40 bg-black text-white py-10 gap-10">
      <div className="flex flex-col items-center">
        <img 
          src={userData?.image} 
          alt="Profile" 
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto border border-cyan-400"
        />

        <div>
          <h1 className="text-xl sm:text-2xl font-bold mt-6 flex justify-center flex-wrap">
            {isLoading ? (
              <div className="w-32 h-5 bg-gray-700 rounded-md animate-pulse mx-2"></div>
            ) : (
              <span className="text-cyan-400 mx-2">{userData?.name}</span>
            )}
          </h1>

          <h2 className="text-base sm:text-xl mt-3 flex justify-center flex-wrap">
            {isLoading ? (
              <div className="w-44 h-5 bg-gray-700 rounded-md animate-pulse mx-2"></div>
            ) : (
              <a href="#"><span className="text-gray-300 mx-2">{userData?.email}</span></a>
            )}
          </h2>

          <button 
            className="mt-8 mx-16 bg-red-600 hover:bg-red-700 transition-all duration-300 text-white items-center text-lg font-semibold px-6 py-3 rounded-lg shadow-lg active:scale-95"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
        <section className="w-full  px-2">
          <h1 className='font-semibold text-3xl underline border-b border-gray-600 my-2 '>Posts</h1>
          <div className="mt-6 space-y-4  bg-opacity-40 rounded-lg "> 
            {userPosts.length === 0 ? (
              <p className="text-gray-400 text-center">No posts found.</p>
            ) : (
              userPosts.map((post) => (
                <div key={post._id} className="p-4 bg-gray-800 rounded-md border border-gray-700 shadow-md w-full">
                  {editingPostId === post._id ? (
                    <>
                      <input 
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full mb-2 p-2 bg-gray-700 rounded text-white"
                      />
                      <textarea 
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full mb-2 p-2 bg-gray-700 rounded text-white h-24"
                      />
                      <div className="flex justify-between mt-2">
                        <button
                          className="px-4 py-1 bg-green-600 rounded cursor-pointer"
                          onClick={() => fetchPostEdit(post._id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-4 py-1 bg-red-600 rounded cursor-pointer"
                          onClick={() => setEditingPostId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex justify-between'>
                        <div>
                          <h3 className="text-lg  font-semibold">{post.title}</h3>
                          <h3>{post.content.slice(0,150)}...</h3>
                        </div>
                      <img src={post.image[0]} alt="image" className='rounded-md w-40 h-20'/>
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <button 
                          className=" px-4 py-2 bg-gray-600 rounded-md cursor-pointer active:scale-90"
                          onClick={() => {
                            setEditingPostId(post._id);
                            setEditTitle(post.title);
                            setEditContent(post.content);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="p-1 bg-red-700 rounded-md cursor-pointer hover:bg-red-600"
                          onClick={() => fetchPostDelete(post._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
     
    </div>
  );
};

export default Profile;
