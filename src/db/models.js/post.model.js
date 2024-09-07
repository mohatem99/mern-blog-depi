import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required "],
  },
  description: {
    type: String,
    required: [true, "title is required "],
  },
  author_id: {
    type: Schema.Types.ObjectId,
    required: [true, "author id is required "],
    ref: "User",
  },
});

const Post = model("Post", postSchema);
export default Post;
