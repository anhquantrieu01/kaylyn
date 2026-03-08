"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";

type Props = {
  value?: string;
  slug?: string;
  onChange: (content: string) => void;
};

export default function Tiptap({ value, slug, onChange }: Props) {
  const [, forceUpdate] = useState({});

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update toolbar active state
  useEffect(() => {
    if (!editor) return;

    const update = () => {
      forceUpdate({});
    };

    editor.on("selectionUpdate", update);
    editor.on("update", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("update", update);
    };
  }, [editor]);

  // Sync content từ form vào editor (quan trọng khi edit bài viết)
  useEffect(() => {
    if (!editor) return;

    const html = value || "";

    if (html !== editor.getHTML()) {
      editor.commands.setContent(html);
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `px-3 py-1 rounded-lg border text-sm ${
      active ? "bg-blue-500 text-white border-blue-500" : "bg-white"
    }`;

  const uploadImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", slug || "spa");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      editor
        .chain()
        .focus()
        .setImage({
          src: data.url,
          alt: slug ? slug.replace(/-/g, " ") : "spa image",
        })
        .run();
    };

    input.click();
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      {/* TOOLBAR */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive("bold"))}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive("italic"))}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={btn(editor.isActive("underline"))}
        >
          Underline
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={btn(editor.isActive("heading", { level: 1 }))}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={btn(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={btn(editor.isActive("heading", { level: 3 }))}
        >
          H3
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive("bulletList"))}
        >
          List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btn(editor.isActive("orderedList"))}
        >
          Number
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btn(editor.isActive("blockquote"))}
        >
          Quote
        </button>

        <button
          type="button"
          onClick={uploadImage}
          className="px-3 py-1 rounded-lg bg-green-500 text-white"
        >
          Upload Image
        </button>
      </div>

      {/* EDITOR */}
      <div className="p-4 min-h-75 max-h-125 overflow-y-auto prose max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}