import Post from "../../db/models.js/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, description, author_id } = req.body;
    const post = await Post.create({ title, description, author_id });
    res.status(201).json({
      data: post,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "author_id",
      select: "name",
    });
    res.status(200).json({
      data: posts,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    res.status(200).json({
      data: post,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json({
      data: updatedPost,
    });
  } catch (err) {
    console.log(err.message);
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const postExist = await Post.findById(id);
    if (postExist.author_id.toString() !== req.user_id.toString())
      return res.status(404).json({ message: "You are not allowed" });
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
  }
};
