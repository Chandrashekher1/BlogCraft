import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Quill = ({ content = '', setContent = () => {} }) => {

  console.log(content);
  
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <div style={{ height: '50%', overflowY: 'auto' }}>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={content}
        onChange={setContent}
        style={{
          border: '1px solid #374151',
          borderRadius: '8px',
        }}
        className="bg-gray-900 text-white"
      />
    </div>
  );
};

export default Quill;
