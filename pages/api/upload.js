import { mongooseConnect } from "@/lib/mongoose";
import cloudinary from "cloudinary";
import multiparty from "multiparty";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handle(req, res) {
  await mongooseConnect();

  const form = new multiparty.Form();

  const { fields, files } = await new Promise((res, rej) => {
    form.parse(req, (err, fields, files) => {
      if (err) rej(err);
      res({ fields, files });
    });
  });

  const links = [];

  for (const file of files.file) {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "codecrafter",
      public_id: `file_${Date.now()}`,
      resource_type: "auto",
    });

    const link = result.secure_url;
    links.push(link);

    return res.json({ links });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
