import { mongooseConnect } from "@/lib/mongoose";
import { Template } from "@/models/Template";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;
 

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
      images: images.map((image) => image.toString()),
    });
    res.status(201).json(newTemplate);
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
    res.status(201).json(true);
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Template.findOne({ _id: req.query.id }));
    } else {
      const templates = await Template.find();
      res.status(201).json(templates);
    }
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Template.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
