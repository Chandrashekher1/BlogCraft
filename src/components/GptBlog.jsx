import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import TipTapEditor from './TipTapEditor';
import { BsStars } from "react-icons/bs";
import CopyToClipboard from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';

const GptBlog = () => {
  const [content, setContent] = useState('');
  const query = useRef();
  const [isLoading, setIsLoading] = useState(false)
  const [copied,setCopied] = useState(false)
  const [alertType, setAlertType] = useState('success');
  const [message, setMessage] = useState('')
  // const [showOption,setShowOption] = useState(false)

  const ai = new GoogleGenAI({ apiKey: "AIzaSyDKW283S24S-Fayeq5uGDvCUJPsHgeHv50"});

  const handleCopied =() => {
    setCopied(true)
    setAlertType('success')
    setMessage('Copied to clipboard')
  }

  async function main() {
    const inputText = query.current.value;
    if (!inputText.trim()) {
      setAlertType('error')
      setMessage("Please enter a prompt.");
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
    }catch(err){
      console.error(err)
      setAlertType('error');
      setMessage("Failed to generate content.");
    }
    finally{
      setIsLoading(false)
    }}

    useEffect(() => {
      if (copied || message) {
        const timer = setTimeout(() => {
          setCopied(false);
          setMessage('');
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [copied, message]);

    return (
    <div className=''>
      <div className='my-4 flex flex-col'>
        <label className='font-semibold text-lg'>Blog Topic</label>
        <input 
          ref={query}
          placeholder='Enter a topic for AI to generate'
          className='px-4 py-2 text-lg bg-gray-800 rounded-md focus:outline-pink-700 text-white mt-2  '
        />
        <span className='text-gray-400'>Describe what you want the AI to write about</span>
      </div>
      <button 
        onClick={() =>main()}
        disabled={isLoading}
        className='py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md px-8 mx-2 cursor-pointer hover:bg-blue-500 font-semibold flex'
      >
       <BsStars style={{marginTop:'4px',marginRight:'4px'}}/> {isLoading ? "Generating..." : "Generate with AI"}
      </button>
      { content? (<div className='w-full rounded-md border border-dashed border-pink-700 bg-gray-800 my-4 overflow-y-auto p-4 text-white'>
          <h1 className='font-semibold text-lg text-pink-200'>Generated Content Preview</h1>
          <h2 className='text-pink-500 mt-4'>Title: </h2>
          <p className='text-pink-400 mt-4'>Content: <span>
                  <CopyToClipboard text={content} onCopy={handleCopied} >
                          <button className='border border-gray-900 px-4 py-1 flex rounded-md text-sm '><MdContentCopy style={{marginTop:'4px'}}/> <span>Copy</span></button>
                  </CopyToClipboard>     
            </span></p>
         <textarea className='bg-gray-900 w-full focus:outline-none overflow-y-scroll min-h-60' value={content}></textarea>
         <div className='border-b border-b-pink-700 my-4'></div>
         <div className='my-4 flex justify-end'>
          <button className='bg-black px-4 py-1 rounded-md mx-2'>Reset</button>
          <button className='bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-md font-semibold '>Publish AI Post</button>
         </div>
      </div>) : null }
        {message && (
          <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
            <div
              className={`px-4 py-2 rounded-md shadow-md text-sm  
                ${alertType === 'success' ? 'bg-white text-black' : alertType === 'error' ? 'bg-red-600' : 'bg-yellow-600'}`}
            >
              {message}
            </div>
          </div>
        )}
    </div>
  );
};

export default GptBlog;
