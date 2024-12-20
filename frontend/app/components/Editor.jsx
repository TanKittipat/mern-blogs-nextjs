"use client";

import dynamic from "next/dynamic";
import { forwardRef, useRef, useImperativeHandle } from "react";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getQuill: () => {
      return quillRef.current.getEditor();
    },
  }));

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="contents h-full max-h-screen overflow-y-auto">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        bounds="#scrolling-container"
        scrollingContainer=".parent-scroll"
      />
    </div>
  );
});

export default Editor;
