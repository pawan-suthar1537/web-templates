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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    const data = {
      title,
      description,
      images: images.map((image) => image.toString()),
      githubrepolink,
      deployedlink,
      framework,
      css: cssframework,
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
    } finally {
      setIsSubmitting(false);
    }
  }

  if (redirect) {
    router.push("/dashboard/");
    return null;
  }

  const selectClassName = "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20";

  return (
    <>
      <form action="" className="space-y-6 rounded-2xl border border-border bg-card p-5 shadow-xs sm:p-8" onSubmit={createtemplate}>
        <div className="border-b border-border/60 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            {_id ? "Edit Template" : "Upload New Template"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Provide the details and preview images of your template
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="template-name">Template Name</Label>
          <Input
            id="template-name"
            type="text"
            placeholder="e.g. Modern SaaS Landing Page"
            value={title}
            required
            onChange={(e) => settitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="select-framework">Framework</Label>
            <select
              id="select-framework"
              className={selectClassName}
              value={framework}
              required
              onChange={(e) => setframework(e.target.value)}
            >
              <option value="">Select Framework</option>
              {Webframeworks.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="select-css">CSS Framework</Label>
            <select
              id="select-css"
              className={selectClassName}
              value={cssframework}
              required
              onChange={(e) => setcssframework(e.target.value)}
            >
              <option value="">Select CSS</option>
              {CSSFrameworks.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="select-usecase">Use Case</Label>
            <select
              id="select-usecase"
              className={selectClassName}
              value={usecase}
              required
              onChange={(e) => setusecase(e.target.value)}
            >
              <option value="">Select Use Case</option>
              {UseCases.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="github-link">GitHub Repository Link</Label>
            <Input
              id="github-link"
              type="url"
              placeholder="https://github.com/username/repository"
              value={githubrepolink}
              onChange={(e) => setgithubrepolink(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="live-link">Live Deployed URL</Label>
            <Input
              id="live-link"
              type="url"
              placeholder="https://my-template.vercel.app"
              value={deployedlink}
              onChange={(e) => setdeployedlink(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="template-images">Template Images (Screenshots)</Label>
          <Input id="template-images" type="file" accept="image/*" multiple onChange={upload} />

          {uploading && (
            <div className="flex items-center justify-center p-8 bg-muted/20 rounded-xl border border-dashed border-border">
              <Spinner />
              <span className="ml-3 text-sm text-muted-foreground">Uploading images...</span>
            </div>
          )}

          {!uploading && images.length > 0 && (
            <div className="w-full pt-2">
              <ReactSortable
                list={Array.isArray(images) ? images : []}
                setList={updateImagesOrder}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array.isArray(images) &&
                  images.map((link, index) => (
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted group" key={link}>
                      <Image
                        src={link}
                        alt={`Template preview ${index + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full shadow-md"
                        aria-label={`Delete image ${index + 1}`}
                        onClick={() => handledeleteimage(index)}
                      >
                        <Trash size={13} />
                      </Button>
                    </div>
                  ))}
              </ReactSortable>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Detailed Description</Label>
          <div className="rounded-xl overflow-hidden border border-border">
            <ReactQuill
              value={description}
              onChange={(newvalue) => setdescription(newvalue)}
              theme="snow"
              modules={Modules}
              formats={formats}
              placeholder="Describe your template features, prerequisites, setup instructions..."
              className="bg-card min-h-[180px]"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button type="submit" disabled={isSubmitting || uploading} size="lg" className="w-full sm:w-auto px-8">
            {isSubmitting ? "Saving..." : _id ? "Update Template" : "Create Template"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TemplateForm;
