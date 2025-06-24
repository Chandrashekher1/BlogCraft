import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2 flex-wrap mb-4 ">
      <button onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`px-3 py-1 rounded ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}>
        Underline
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}>
        H1
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}>
        Bullet
      </button>
      
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 rounded ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}>
        Numbered
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1 rounded ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}>
        Quote
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1 rounded ${editor.isActive('codeBlock') ? 'bg-blue-600 text-white' : 'bg-gray-600'}`}>
        Code
      </button>
      <button onClick={() => editor.chain().focus().undo().run()} className="px-3 py-1 rounded bg-red-500">
        Undo
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} className="px-3 py-1 rounded bg-green-500">
        Redo
      </button>
    </div>
  );
};

const TipTapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [StarterKit,Underline],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  return (
    <div className="bg-gray-800 text-white rounded p-4 border border-cyan-700">
      <MenuBar editor={editor} />
      <div className="border-t border-t-gray-600">
        <EditorContent editor={editor} className="p-3 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none text-xl"placeholder='Start Writing here...' />
      </div>
    </div>
  );
};

export default TipTapEditor;
