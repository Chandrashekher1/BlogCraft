import React, { useState } from 'react';
import { post_API } from '../utils/constant';
import TipTapEditor from '../components/TipTapEditor';
import GptBlog from '../components/GptBlog';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [images,setImages] = useState('')
  const [isShow,setIshow] = useState(true)
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  const handleData = async () => {
    const token = localStorage.getItem("authorization");
    if (!token) {
      setMessage({ type: 'error', text: "Please log in first." });
      return;
    }
    if (!title || !content || !author ) {
      setMessage({ type: 'error', text: "All fields are required!" });
      return;
    }
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title",title)
      formData.append("content",content)
      formData.append("author",author)

      images.forEach((img) => {
        formData.append('blog',img)
      })

      // formData.append("blog",images)
      const response = await fetch(post_API, {
        method: "POST",
        headers: {
          "Authorization": `${token}`, 
        },
        body: formData
      });

      const json = await response.json()
      if (!response.ok) {
        throw new Error(json.message || "Failed to create post");
      }

      setMessage({ type: 'success', text: "Post Created Successfully!" });
      setTitle('');
      setContent('');
      setAuthor('');
      setImages(null)
     
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center  text-white p-6">
      <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Create a New Post</h1>

        {message && (
          <p className={`mb-4 text-center font-semibold ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message.text}
          </p>
        )}
        <div className='border-b border-gray-600 flex'>
          <h1 className={`font-semibold text-xl cursor-pointer px-4 py-2 rounded-t-md transition-colors ${
      isShow ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
    }`}    onClick={() => setIshow(true)}>Write</h1>
          <h1 className={`font-semibold text-xl cursor-pointer px-4 py-2 mx-4 rounded-t-md transition-colors ${
      !isShow ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
    }`} onClick={() => setIshow(false)}>AI Assistant</h1>
        </div>
        {isShow ? (<div className="flex flex-col space-y-4 my-4">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title" 
            className="px-4 py-4 rounded-lg bg-gray-700 text-white border border-cyan-800 active:outline-none focus:outline-none"
          />
         <TipTapEditor content={content} setContent={setContent} />

          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author" 
            className="p-2 rounded bg-gray-700 text-white focus:outline-none  border border-cyan-700"
          />
          <input 
            type="file" 
            multiple
            accept='image/*'
            placeholder='Upload blog images'
            onChange={(e) => setImages([...e.target.files])}
            className='p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 border border-cyan-600'
          />
          <div>
            <button className=' px-4 py-2 font-semibold cursor-pointer bg-gray-900 rounded-md active:scale-95'>Save Draft</button>
            <button 
              onClick={handleData} 
              disabled={loading}
              className={`py-2 px-6 rounded font-semibold transition-colors cursor-pointer mx-4 active:scale-95 ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
            {loading ? "Publishing..." : "Publish"}
          </button>
          </div>
          
        </div>):<GptBlog/>}

        
      </div>

    </div>
  );
};

export default Post