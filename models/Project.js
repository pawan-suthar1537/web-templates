import mongoose from "mongoose";
import { Schema } from "mongoose";

const TemplateSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.Mixed,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    framework: {
      type: String,
    },
    css: {
      type: String,
    },
    usecase: {
      type: String,
    },
    githubrepolink: {
      type: String,
    },
    deployedlink: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Template = models.Template || model("Template", TemplateSchema);
