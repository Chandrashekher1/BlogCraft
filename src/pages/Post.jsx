import React, { useState } from 'react';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [media, setMedia] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleData = async () => {
    const token = localStorage.getItem("authorization");
    
    if (!token) {
      setMessage({ type: 'error', text: "Please log in first." });
      return;
    }
    if (!title || !content || !author || !tags || !media) {
      setMessage({ type: 'error', text: "All fields are required!" });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("https://cp-blog.onrender.com/api/post", {
        method: "POST",
        headers: {
          "Authorization": `${token}`, 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content, author, tags, media })
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Failed to create post");
      }

      setMessage({ type: 'success', text: "Post Created Successfully!" });
      setTitle('');
      setContent('');
      setAuthor('');
      setTags('');
      setMedia('');

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

          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author" 
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input 
            type="text" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)" 
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input 
            type="url" 
            value={media} 
            onChange={(e) => setMedia(e.target.value)}
            placeholder="Media URL (image or video)" 
            className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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

      {(title || content || media) && (
        <div className="w-full max-w-3xl bg-gray-800 mt-8 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">{title || "Post Title Preview"}</h2>
          <p className="mt-2 text-gray-300">{content || "Post content will appear here..."}</p>
          <p className="mt-2 text-sm italic text-gray-400">{author ? `By ${author}` : "Author Name"}</p>
          <p className="mt-2 text-sm text-gray-400">{tags ? `Tags: ${tags}` : "Tags will appear here"}</p>

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

export default Post;