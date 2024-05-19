import React from "react";
import { Input } from "../ui/input";
import { CSSFrameworks, UseCases, Webframeworks } from "@/data";
import { Label } from "../ui/label";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video", "code-block"],
    ["clean"],
    [{ color: [] }],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "code",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

const TemplateForm = () => {
  return (
    <>
      <form action="" className="p-3 space-y-6">
        <Input type="text" placeholder="Template Name" />
        <div className="grid grid-cols-3 gap-4">
          <select className="border rounded-md px-3 p-2 w-full">
            <option value="">Select Framework</option>
            {Webframeworks.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select className="border rounded-md px-3 p-2 w-full">
            <option value="">Select Css</option>
            {CSSFrameworks.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select className="border rounded-md px-3 p-2 w-full">
            <option value="">Select UseCases</option>
            {UseCases.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input type="url" placeholder="Github Repository Link" />
          <Input type="url" placeholder="Deployed Link" />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label>Template Images</Label>
          <Input type="file" />
          {/* selected images yha bshow krna hai  */}
        </div>
        <ReactQuill
          theme="snow"
          modules={Modules}
          formats={formats}
          placeholder="Describe about your template"
          className="flex-grow my-3 h-auto"
        />
        <Button>
          Create
        </Button>
      </form>
    </>
  );
};

export default TemplateForm;
