import {
  deletePostById,
  getAllPosts,
  getPostById,
  savePost,
  updatePost,
} from "../Models/PostsModel.js";

export const CreateNewPost = async (req, res) => {
  try {
    const { title, content, delta, author } = req.body;

    const result = await savePost(title, content, author, delta);
    res
      .status(201)
      .json({ post: result, message: "Post created successfully" });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ errors: ["El título ya existe. Por favor elige otro."] });
    }
    res.status(500).json({ error: "Failed to create post" });
  }
};
export const ReadPost = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
export const ReadPostById = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};
export const EditPost = async (req, res) => {
  try {
    const { title, content, author, delta } = req.body;
    const { id } = req.params;

    await updatePost(id, title, content, author, delta);
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const DeletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await deletePostById(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
