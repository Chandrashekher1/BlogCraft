import React, { useRef, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import TipTapEditor from './TipTapEditor';

const GptBlog = () => {
  const [content, setContent] = useState('');
  const query = useRef();
  const [isLoading, setIsLoading] = useState(false)
  // const [showOption,setShowOption] = useState(false)

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GPT_API_KEY});

  async function main() {
    const inputText = query.current.value;
    if (!inputText.trim()) {
      alert("Please enter a prompt.");
      return;
    }
    setIsLoading(true)

    try{
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Write a beautifully structured blog post on the topic: "${inputText}". 
          The blog must include:

          - An engaging introduction wrapped in appropriate <p> tags.
          - Well-organized sections with <h2> and <h3> headings.
          - Informative content with properly formatted <p> paragraphs.
          - Use <strong>, <em>, <ul>, <li>, or <blockquote> where relevant.
          - A thoughtful conclusion.

          Ensure the response is written entirely in valid, semantic HTML. 
          Do not include markdown or explanation—only return clean HTML content that can be directly rendered in a web editor.
          Avoid listicle or search-style formatting. Focus on storytelling, readability, and depth of content.`
        
      });
      setContent(response.text)
      setShowOption(true)
    }catch(err){
      console.error(err)
      alert("Failed to generate content.")
    }
    finally{
      setIsLoading(false)
    }}

    return (
    <div className=''>
      <textarea 
        ref={query}
        placeholder='What do you want to write about?'
        className='px-4 py-2 w-full my-4 h-40 bg-gray-800 rounded-md focus:outline-none text-white'
      />
      <button 
        onClick={() =>main()}
        disabled={isLoading}
        className='py-2 bg-blue-600 rounded-md px-8 mx-2 cursor-pointer hover:bg-blue-500 font-semibold'
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
      <div className='w-full min-h-60 rounded-md bg-gray-800 my-4 overflow-y-auto p-4 text-white'>
        <TipTapEditor content={content} setContent={setContent} />
      </div>
        {/* {showOption && <div className='flex'>
            <h1 className='text-xl'>Would you like to post this content ? </h1>
            <button className='mx-4 px-4  rounded-md cursor-pointer bg-gray-700' >Yes</button> 
            <button className=' px-4  rounded-md cursor-pointer bg-gray-700'>No</button>
        </div>} */}
    </div>
  );
};

export default GptBlog;
