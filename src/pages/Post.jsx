import React, { useEffect, useState } from 'react';
import { post_API } from '../utils/constant';
import TipTapEditor from '../components/TipTapEditor';
import GptBlog from '../components/GptBlog';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postAdded } from '../utils/PostSlice';
import parse from 'html-react-parser';
import { IoDocumentTextOutline } from "react-icons/io5"

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [images,setImages] = useState('')
  const [isShow,setIshow] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem("authorization");
  const dispatch = useDispatch()
  const [alertType,setAlertType] = useState('success')
  const [error, setError] = useState('')  
  
  const handleData = async () => {
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
  }

  const handlenavigate = () => {
      setAlertType('error')
      setError("Login first to create blog.")
      navigate('/login')
  }
    useEffect(() => {
      if(!token){
        handlenavigate()
        return
      }
    },[])

    const handleSavePost = () => {
      dispatch(postAdded(parse(content)))
      dispatch(postAdded(title))
      dispatch(postAdded(author))

      setAlertType('error')
      setError("Saved Successfully.")
    }

    setTimeout(() => {
      setError('')
    },5000)

  return (
    <div className="min-h-screen flex flex-col items-center border border-transparent rounded-md mx-2 md:mx-60 my-8 text-white md:p-6 p-4">
      <div className="w-full max-w-3xl md:p-6 rounded-lg shadow-lg md:bg-gray-900">
        <h1 className="text-2xl font-bold text-center flex my-4"><span className='bg-blue-400 px-1 opacity-60 rounded-md'><IoDocumentTextOutline style={{marginTop:'4px', color:'blue'}}/></span> <span className='mx-2'>Create a New Post</span></h1>

        {message && (
          <p className={`mb-4 text-center font-semibold ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message.text}
          </p>
        )}
        <div className="flex mt-8 bg-gray-900 rounded-md overflow-hidden border border-gray-700">
          <button
            onClick={() => setIshow(true)}
            className={`w-1/2 py-2 cursor-pointer text-sm md:text-base font-semibold transition-all duration-300 ${
              isShow ? 'bg-gray-900 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            Manual Creation
          </button>
          <button
            onClick={() => setIshow(false)}
            className={`cursor-pointer w-1/2 py-2 text-sm md:text-base font-semibold transition-all duration-300 ${
              !isShow ? 'bg-gray-900 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            AI Generation
          </button>
        </div>

        {isShow ? (<div className="flex flex-col space-y-4 my-4">
          <div className='flex flex-col'>
              <label className='font-semibold text-lg mt-4'>Post Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title for your post" 
                className="px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700"
              />
          </div>
          <div>
            <label className='font-semibold text-lg'>Content</label>
            <TipTapEditor content={content} setContent={setContent} />
          </div>

          <div className='flex flex-col my-4'>
            <label className='font-semibold text-lg'>Author</label>
            <input 
              type="text" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author" 
              className="p-2 rounded-md bg-gray-900 text-white   border border-gray-700"
            />
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold text-lg'>Image</label>
            <input 
            type="file" 
            multiple
            accept='image/*'
            placeholder='Upload blog images'
            onChange={(e) => setImages([...e.target.files])}
            className='p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2  border border-gray-700'
          />
          </div>
          <div>
            <button className=' px-4 py-2 font-semibold cursor-pointer bg-black rounded-md active:scale-95' onClick={handleSavePost}>Cancel</button>
            <button 
              onClick={handleData} 
              disabled={loading}
              className={`py-2 px-6 bg-gradient-to-r from-blue-700 to-purple-700 rounded font-semibold transition-colors cursor-pointer mx-4 active:scale-95 ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
            {loading ? "Publishing..." : "Publish Post"}
          </button>
          </div>
          
        </div>):<GptBlog/>}
        {/* {parse(content)} */}
      </div>
      {error && (
          <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
            <div
              className={`px-4 py-2 rounded-md shadow-md text-sm  
                ${alertType === 'success' ? 'bg-white text-black' : alertType === 'error' ? 'bg-red-600' : 'bg-yellow-600'}`}
            >
              {error}
            </div>
          </div>
        )}
    </div>
  );
};

export default Post