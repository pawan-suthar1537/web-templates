import { mongooseConnect } from "@/lib/mongoose";
import { Template } from "@/models/Template";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return res.status(503).json({
      error: "Template service is temporarily unavailable",
      // Keep the production response useful without exposing the connection
      // string or credentials. This makes a missing Vercel env var obvious in
      // the Network panel while preserving the generic public error message.
      code: process.env.MONGODB_URI ? "DATABASE_CONNECTION_FAILED" : "MONGODB_URI_MISSING",
    });
  }

  const { method } = req;

  try {
   if (method === "POST") {
    const {
      user,
      title,
      description,
      framework,
      css,
      usecase,
      githubrepolink,
      deployedlink,
      images,
    } = req.body;

    const newTemplate = await Template.create({
      user,
      title,
      description,
      framework,
      css,
      usecase,
      githubrepolink,
      deployedlink,
      images: Array.isArray(images) ? images.map((image) => image.toString()) : [],
    });
    return res.status(201).json(newTemplate);
  }
   if (method === "PUT") {
    const {
      _id,
      user,
      title,
      description,
      framework,
      css,
      usecase,
      githubrepolink,
      deployedlink,
      images,
    } = req.body;
    const updatednewtemp = await Template.updateOne(
      { _id },
      {
        user,
        title,
        description,
        framework,
        css,
        usecase,
        githubrepolink,
        deployedlink,
        images,
      }
    );
    return res.status(200).json(true);
  }

   if (method === "GET") {
    if (req.query?.id) {
      return res.status(200).json(await Template.findOne({ _id: req.query.id }).lean());
    } else {
      const templates = await Template.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json(templates);
    }
  }
   if (method === "DELETE") {
    if (req.query?.id) {
      await Template.deleteOne({ _id: req.query.id });
      return res.status(200).json(true);
    }
    return res.status(400).json({ error: "Template id is required" });
  }

   return res.status(405).json({ error: `Method ${method} is not allowed` });
  } catch (error) {
    console.error(`Template ${method} request failed:`, error);
    return res.status(500).json({ error: "Unable to process template request" });
  }
}
