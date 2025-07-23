import React, { useRef, useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MdContentCopy } from "react-icons/md";
import { BsStars } from 'react-icons/bs';
import { FaRobot, FaWandMagicSparkles } from "react-icons/fa6";
import { GoLightBulb } from "react-icons/go";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import Quill from './Quill';


const BlogGenerator = () => {
  const [content, setContent] = useState('');
  const query = useRef();
  const tone = useRef();
  const contentLength = useRef();
  const keywords = useRef();
  const [loading,setLoading] = useState(false)
  const [copied,setCopied] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('authorization')

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GPT_API_KEY
  });

  const handleGenerate = async (e) => {
    e.preventDefault();

    const topic = query.current.value.trim();
    const selectedTone = tone.current.value;
    const selectedLength = contentLength.current.value;
    const keywordInput = keywords.current.value.trim();

    if (!topic) {
      alert("Please enter a blog topic.");
      return;
    }
    setLoading(true)

    try {
      const response = await ai.models.generateContent({ 
        model: "gemini-2.5-flash" ,
        contents: `
Write a beautifully structured blog post on the topic: "${topic}".

Use the writing tone: "${selectedTone}" and length: "${selectedLength}".

Include keywords: "${keywordInput}".

The blog must include:

Break it into:
- Introduction
- Key sections with meaningful subheadings
- A thoughtful conclusion

Also:
- Start with a <h1> title containing the topic.
- Use <h2> and <h3> for section headers.
- Use valid HTML content only (e.g., <p>, <ul>, <li>, <strong>, <em>, etc.).
- Do NOT include <!DOCTYPE>, <html>, <head>, or <body> tags.
- Do NOT include markdown or any explanation.
- The result must be **pure HTML blog content**, directly usable inside a web editor or component.
- Avoid listicle or search-style formatting. Focus on storytelling, readability, and depth of thought.
`
    })
      setContent(response.text)
    } catch (err) {
      console.error(err);
      alert("Failed to generate content.");
    } 
    finally{
        setLoading(false)
    }
  }

  setTimeout(() => {
    setCopied(false)
  }, 3000)

  if(!token){
    navigate('/login')
  }

  return (
    <div className='min-h-screen mx-4 text-white'>
      <div className='flex flex-col justify-center items-center my-8'>
        <span className='border p-4 rounded-full bg-gradient-to-r from-zinc-400 to-zinc-950 border-transparent'>
          <FaRobot style={{ fontSize: '30px' }} />
        </span>
        <h1 className='font-bold text-3xl my-4'>AI Blog Generator</h1>
        <p className='text-center text-gray-400 text-xl'>
          Create compelling blog content with the power of AI. Just provide a topic and let our AI craft an engaging post for you.
        </p>
      </div>

      <div className='md:flex justify-center'>

        <div className='border border-gray-800 p-4 rounded-md md:w-[40vw]'>
          <p className='flex text-xl font-bold'>
            <FaWandMagicSparkles style={{ marginTop: '4px', marginRight: '8px' }} /> Content Settings
          </p>
          <form onSubmit={handleGenerate} className='flex flex-col'>
            <label className='font-semibold mt-6'>Blog Topic*</label>
            <input
              type="text"
              ref={query}
              placeholder='e.g., Artificial Intelligence in Healthcare.'
              required
              className='rounded-md px-4 py-2 border border-gray-800 bg-gray-900 text-white mt-2'
            />

            <label className='font-semibold mt-6'>Writing Tone</label>
            <select className='border rounded-md py-1 px-2 border-gray-900 mt-2 bg-gray-950 cursor-pointer' ref={tone}>
              <option value="Professional">Professional</option>
              <option value="Casual">Casual</option>
              <option value="Humorous">Humorous</option>
              <option value="Academic">Academic</option>
            </select>

            <label className='font-semibold mt-6'>Current Length</label>
            <select className='border rounded-md py-1 px-2 border-gray-900 mt-2 bg-gray-950 cursor-pointer' ref={contentLength}>
              <option value="Short">Short (500 words)</option>
              <option value="Medium">Medium (1000 words)</option>
              <option value="Long">Long (1500+)</option>
            </select>

            <label className='font-semibold mt-6'>Keywords (optional)</label>
            <input
              type="text"
              ref={keywords}
              placeholder='e.g., AI, deep learning, hospital efficiency'
              className='rounded-md px-4 py-2 border border-gray-800 bg-gray-900 text-white'
            />

            <button
              type="submit"
              className='flex bg-white px-16 cursor-pointer py-2 rounded-md text-black font-semibold my-4 items-center justify-center'
            >
              <BsStars style={{ marginTop: '4px', marginRight: '4px' }} /> {`${loading ? 'Generating...' : 'Generate with AI'}`}
            </button>
          </form>

        <div className='bg-gray-900 rounded-md p-4 my-4'>
          <div className='flex'>
            <GoLightBulb style={{ marginTop: '4px', marginRight: '6px' }} />
            <span className='font-semibold text-lg'>Pro Tips:</span>
          </div>
          <div className='mx-4 text-gray-400'>
            <li>Be specific with your topic for better results</li>
            <li>Include relevant keywords to improve SEO</li>
            <li>Choose the right tone for your audience</li>
          </div>
        </div>
        </div>

      <div className='my-8 flex flex-col items-center border mx-2 border-gray-800 rounded-md p-4 md:w-[30vw] md:mx-4 md:my-0'>
        <p className='flex  text-xl font-bold mb-4'>
          <FaRobot style={{ marginTop: '4px', marginRight: '8px' }} /> <span>Generated Content</span>
        </p>

        {!loading ? (
          <div>
           {content &&  <Quill content={content}/>}
            {content &&  
              <CopyToClipboard text={content} onCopy={() => setCopied(true)} >
                  <button className='border border-gray-900 px-4 py-1 flex rounded-md text-sm cursor-pointer my-4'><MdContentCopy style={{marginTop:'4px'}}/> <span>Copy</span></button>
              </CopyToClipboard>     
            }
          </div>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
        )}
      </div>
      </div>

      {copied && <div className="fixed bottom-2 rounded-md z-50">
        <div className="bg-white text-gray-700 px-4 mx-20 rounded-md py-2 shadow-md">
            <div className="flex items-center justify-between">
            <div>
                <span className="text-sm text-center">Copied to clipboard!</span>
            </div>
            </div>
        </div>
        </div>}
    </div>
  );
};

export default BlogGenerator;
