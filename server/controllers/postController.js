import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getPostsFeed = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ userId: { $eq: id } });
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const postLikesUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);

    console.log(post);

    const isLikedByUser = await post.likes;

    console.log(isLikedByUser);

    const likes = await post.likes;

    if (isLikedByUser) {
      likes.delete(userId);
    } else {
      likes.set(userId, true);
    }

    const updatedPosts = Post.findByIdAndUpdate(
      id,
      {
        likes: likes,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
