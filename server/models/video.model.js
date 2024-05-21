import { Schema, model } from "mongoose";

const VideoSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videoUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    tags: [{ type: String, default: [] }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        desc: { type: String },
        createdAt: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamps: true }
);

const Video = model("Video", VideoSchema);
export default Video;
