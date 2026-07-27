import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  [{ header: 1 }, { header: 2 }, { header: 3 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['clean'],
];

const modules = { toolbar: toolbarOptions };

const Quill = ({ content = '', setContent = () => {} }) => {
  return (
    <div>
      <style>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #EAE7E2 !important;
          background: #F6F4EF !important;
          padding: 10px 12px !important;
          font-family: 'Inter', sans-serif !important;
        }
        .ql-container.ql-snow {
          border: none !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 15px !important;
          color: #1D1D1B !important;
        }
        .ql-editor {
          min-height: 280px;
          padding: 20px !important;
          line-height: 1.8 !important;
          color: #1D1D1B !important;
          background: #FFFFFF !important;
        }
        .ql-editor.ql-blank::before {
          color: #9A9A94 !important;
          font-style: normal !important;
          font-size: 15px !important;
        }
        .ql-snow .ql-stroke {
          stroke: #6B6B63 !important;
        }
        .ql-snow .ql-fill {
          fill: #6B6B63 !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke {
          stroke: #1D1D1B !important;
        }
        .ql-snow.ql-toolbar button:hover,
        .ql-snow.ql-toolbar button.ql-active {
          background: #EFEAE2 !important;
          border-radius: 6px !important;
        }
        .ql-snow .ql-picker {
          color: #6B6B63 !important;
        }
        .ql-editor p, .ql-editor li {
          font-size: 15px !important;
          line-height: 1.8 !important;
          color: #1D1D1B !important;
        }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 {
          font-family: 'Instrument Serif', serif !important;
          color: #1D1D1B !important;
          font-weight: 400 !important;
        }
        .ql-editor blockquote {
          border-left: 3px solid #A8B58A !important;
          padding-left: 16px !important;
          color: #6B6B63 !important;
          font-style: italic !important;
        }
        .ql-editor code, .ql-editor pre {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 13px !important;
          background: #F6F4EF !important;
          color: #B88C64 !important;
          border-radius: 6px !important;
        }
      `}</style>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Start writing your story..."
      />
    </div>
  );
};

export default Quill;
