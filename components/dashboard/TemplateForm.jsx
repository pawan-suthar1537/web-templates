import React, { useState } from "react";
import { Input } from "../ui/input";
import { CSSFrameworks, UseCases, Webframeworks } from "@/data";
import { Label } from "../ui/label";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Spinner from "../Spinner";
import { ReactSortable } from "react-sortablejs";
import { Trash } from "lucide-react";
import axios from "axios";
import Image from "next/image";

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

const TemplateForm = ({
  _id,
  title: existingtitle,
  description: existingdescription,
  images: existingimages,
  githubrepolink: existinggithubrepolink,
  deployedlink: existingdeployedlink,
  framework: existingframework,
  css: existingcss,
  usecase: existingusecase,
}) => {
  const [title, settitle] = useState(existingtitle || "");
  const [description, setdescription] = useState(existingdescription || "");
  const [images, setimages] = useState(existingimages || []);
  const [githubrepolink, setgithubrepolink] = useState(
    existinggithubrepolink || ""
  );
  const [deployedlink, setdeployedlink] = useState(existingdeployedlink || "");
  const [framework, setframework] = useState(existingframework || "");
  const [cssframework, setcssframework] = useState(existingcss || "");
  const [usecase, setusecase] = useState(existingusecase || "");
  const [uploading, setuploading] = useState(false);

  const { user } = useUser();
  const userId = user?.id;

  const [redirect, setredirect] = useState(false);
  const router = useRouter();

  function updateImagesOrder(images) {
    setimages(images);
  }

  function handledeleteimage(index) {
    const updateImages = [...images];
    updateImages.splice(index, 1);
    setimages(updateImages);
  }

  // async function upload(ev) {
  //   const files = ev.target?.files;
  //   if (files && files.length > 0) {
  //     setuploading(true);

  //     for (const file of files) {
  //       const data = new FormData();
  //       data.append("file", file);

  //       UploadImages.push(
  //         axios.post("/api/upload", data).then((res) => {
  //           setimages((oldImages) => [...oldImages, ...res.data.links]);
  //         })
  //       );
  //     }

  //     await Promise.all(UploadImages);
  //     setuploading(false);
  //   }
  // }

  async function upload(ev) {
    const files = ev.target.files;
    if (files && files.length > 0) {
      setuploading(true);
      try {
        for (const file of files) {
          const data = new FormData();
          data.append("file", file);
          const response = await axios.post("/api/upload", data);
          setimages((oldImages) => [...oldImages, ...(response.data.links || [])]);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setuploading(false);
        ev.target.value = "";
      }
    }
  }

  async function createtemplate(ev) {
    ev.preventDefault();
    const data = {
      title,
      description,
      images: images.map((image) => image.toString()),
      githubrepolink,
      deployedlink,
      framework,
      css:cssframework,
      usecase,
      user: userId,
    };

    try {
      if (_id) {
        await axios.put(`/api/template`, { ...data, _id });
      } else {
        await axios.post(`/api/template`, data);
      }
      setredirect(true);
    } catch (error) {
      console.error("Error creating template:", error);
    }
  }

  if (redirect) {
    router.push("/dashboard/");
    return null;
  }

  return (
    <>
      <form action="" className="space-y-6 rounded-2xl border border-border bg-card p-4 shadow-xs sm:p-6" onSubmit={createtemplate}>
        <Input
          type="text"
          placeholder="Template Name"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <select
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-shadow focus:border-ring focus:ring-4 focus:ring-ring/10"
            value={framework}
            onChange={(e) => setframework(e.target.value)}
          >
            <option value="">Select Framework</option>
            {Webframeworks.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-shadow focus:border-ring focus:ring-4 focus:ring-ring/10"
            value={cssframework}
            onChange={(e) => setcssframework(e.target.value)}
          >
            <option value="">Select Css</option>
            {CSSFrameworks.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-shadow focus:border-ring focus:ring-4 focus:ring-ring/10"
            value={usecase}
            onChange={(e) => setusecase(e.target.value)}
          >
            <option value="">Select UseCases</option>
            {UseCases.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            type="url"
            placeholder="Github Repository Link"
            value={githubrepolink}
            onChange={(e) => setgithubrepolink(e.target.value)}
          />
          <Input
            type="url"
            placeholder="Deployed Link"
            value={deployedlink}
            onChange={(e) => setdeployedlink(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="template-images">Template images</Label>
          <Input id="template-images" type="file" accept="image/*" multiple onChange={upload} />
          {/* selected images yha bshow krna hai  */}
          {uploading && (
            <div>
              <Spinner />
            </div>
          )}
          {!uploading && (
            <div className="w-full">
              <ReactSortable
                list={Array.isArray(images) ? images : []}
                setList={updateImagesOrder}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array.isArray(images) &&
                  images.map((link, index) => (
                    <div className="relative" key={link}>
                      <Image
                        src={link}
                        alt={`Template preview ${index + 1}`}
                        width={800}
                        height={600}
                        className="h-full w-full rounded-md border object-cover p-2 transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 cursor-pointer opacity-100">
                          <Button type="button" size="icon" variant="destructive" aria-label={`Delete image ${index + 1}`} onClick={() => handledeleteimage(index)}>
                          <Trash className="w-4 h-4 bg-white text-red-600 rounded-full p-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </ReactSortable>
            </div>
          )}
        </div>
        <ReactQuill
          value={description}
          onChange={(newvalue) => setdescription(newvalue)}
          theme="snow"
          modules={Modules}
          formats={formats}
          placeholder="Describe about your template"
          className="flex-grow my-3 h-auto"
        />
        <Button type="submit">
          {_id ? "Update Template" : "Create Template"}
        </Button>
      </form>
    </>
  );
};

export default TemplateForm;
