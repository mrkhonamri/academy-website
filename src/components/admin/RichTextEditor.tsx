"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Undo, Redo } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[200px] px-3 py-2 focus:outline-none",
        dir: "rtl",
      },
    },
  });

  if (!editor) {
    return <div className="rounded-lg border border-slate-300 min-h-[200px] bg-slate-50" />;
  }

  return (
    <div className="rounded-lg border border-slate-300 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`rounded p-2 hover:bg-slate-200 ${editor.isActive("bold") ? "bg-slate-200" : ""}`}>
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`rounded p-2 hover:bg-slate-200 ${editor.isActive("italic") ? "bg-slate-200" : ""}`}>
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`rounded p-2 hover:bg-slate-200 ${editor.isActive("heading", { level: 1 }) ? "bg-slate-200" : ""}`}>
          <Heading1 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`rounded p-2 hover:bg-slate-200 ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200" : ""}`}>
          <Heading2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`rounded p-2 hover:bg-slate-200 ${editor.isActive("bulletList") ? "bg-slate-200" : ""}`}>
          <List className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`rounded p-2 hover:bg-slate-200 ${editor.isActive("orderedList") ? "bg-slate-200" : ""}`}>
          <ListOrdered className="h-4 w-4" />
        </button>
        <div className="mx-2 h-6 w-px bg-slate-300" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="rounded p-2 hover:bg-slate-200">
          <Undo className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="rounded p-2 hover:bg-slate-200">
          <Redo className="h-4 w-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}