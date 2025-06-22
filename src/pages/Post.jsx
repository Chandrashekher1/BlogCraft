import React, { useState } from 'react';
import { post_API } from '../utils/constant';
import JoditEditor from 'jodit-react';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [images,setImages] = useState('')
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
    <div className="min-h-screen flex flex-col items-center bg-gray-950 text-white p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Create a New Post</h1>

        {message && (
          <p className={`mb-4 text-center font-semibold ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message.text}
          </p>
        )}

        <div className="flex flex-col space-y-4">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title" 
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..." 
            className="p-2 rounded bg-gray-700 text-white h-32 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {/* <JoditEditor 
            // dangerouslySetInnerHTML={{ __html: content }}
              ref ={editor}
              // value={content}
              // tabIndex={1}
              config={{
                readonly: false,
                theme: 'dark', 
                style: {
                  background: '#1f2937',
                  color: 'white',
                  minHeight: '200px',
                  padding: '10px',
                },
              }}
              onBlur={newContent => setContent(newContent)}
              // onChange={newContent => setContent(newContent)}

          /> */}
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author" 
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input 
            type="file" 
            multiple
            accept='image/*'
            onChange={(e) => setImages([...e.target.files])}
            className='p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600'
          />
          <button 
            onClick={handleData} 
            disabled={loading}
            className={`p-2 rounded font-bold transition-colors ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Post"}
          </button>
        </div>
      </div>

      {(title || content  ) && (
        <div className="w-full max-w-3xl bg-gray-800 mt-8 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">{title || "Post Title Preview"}</h2>
          <p className="mt-2 text-gray-300">{content || "Post content will appear here..."}</p>
          <p className="mt-2 text-sm italic text-gray-400">{author ? `By ${author}` : "Author Name"}</p>

          {/* {media && (
            <div className="mt-4">
              <img 
                src={media} 
                alt="Media preview" 
                className="w-full max-h-48 object-contain rounded-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Media+URL';
                }}
              />
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Post