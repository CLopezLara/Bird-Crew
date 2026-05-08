import {
  deletePostById,
  getAllPosts,
  getPostById,
  savePost,
  updatePost,
} from "../Models/PostsModel.js";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import r2Client from "../Config/r2Config.js";
import crypto from "crypto";

export const CreateNewPost = async (req, res) => {
  try {
    const { title, content, delta, author, image_url, image_key } = req.body;

    const result = await savePost(
      title,
      content,
      author,
      delta,
      image_url,
      image_key,
    );
    res.status(201).json({ post: result, message: "Post creado exitosamente" });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ errors: ["El título ya existe. Por favor elige otro."] });
    }
    res.status(500).json({ errors: ["Error al crear el post"] });
  }
};
export const ReadPost = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errors: ["Error al obtener los posts"] });
  }
};
export const ReadPostById = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ errors: ["Error al obtener el post"] });
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
    const { id } = req.params;
    await deletePostById(id);
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ errors: ["Error al eliminar el post"] });
  }
};

///////////////////////////////////////////////////////////////////////////////

export const GetPutPresignedUrl = async (req, res) => {
  const { contentType } = req.query;
  if (!contentType) {
    return res.status(400).json({ errors: ["Content Type es requerido"] });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(contentType)) {
    return res.status(400).json({ errors: ["Content Type invalido"] });
  }

  try {
    const extension = contentType.split("/")[1];
    const key = `posts/${crypto.randomUUID()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 120,
    });
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    res.status(200).json({ presignedUrl, publicUrl, key });
  } catch (error) {
    res.status(500).json({ errors: ["Error al obtener la url"] });
  }
};

export const GetDeletePresignedUrl = async (req, res) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: req.query.key,
    });

    const presignedUrl = await getSignedUrl(r2Client, command, {
      expiresIn: 60,
    });

    res.status(200).json({ presignedUrl });
  } catch (error) {
    res.status(500).json({ errors: ["Error al generar la url"] });
  }
};
