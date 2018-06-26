const Post           = require('../models/Post');
const { deleteFile } = require('../helpers/images');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { text } = req.body;
      const newPost = await Post.create({
        user: req.decoded.id,
        text,
        image: req.file.cloudStoragePublicUrl,
        comments: [],
        like: []
      });

      res
        .status(201)
        .json({
          message: 'Create Post Success!',
          data: newPost
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Oops, Something Went Wrong!',
          error
        });
    }
  },
  getPost: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.decoded.id }).populate('user');

      res
        .status(200)
        .json({
          message: 'Get Post Success!',
          data: posts
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Oops, Something Went Wrong!',
          error
        });
    }
  },
  getAllPost: async (req, res) => {
    try {
      const posts = await Post.find().populate('user');

      res
        .status(200)
        .json({
          message: 'Get All Post Success!',
          data: posts
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Oops, Something Went Wrong!',
          error
        });
    }
  },
  updateLike: async (req, res) => {
    try {
      const { id } = req.params;

      const like = await Post.findOneAndUpdate({ _id: id }, { $addToSet: req.decoded.id });

      res
        .status(200)
        .json({
          message: 'Like Success!',
          data: like
        })
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Oops, Something Went Wrong!',
          error
        });
    }
  },
  updateDislike: async (req, res) => {
    try {
      const { id } = req.params;

      const like = await Post.findOneAndUpdate({ _id: id }, { $pull: req.decoded.id });

      res
        .status(200)
        .json({
          message: 'dislike Success!',
          data: like
        })
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Oops, Something Went Wrong!',
          error
        });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findOne({ _id: id })
      await post.remove();

      const filename = post.image.split('/');

      deleteFile(filename[filename.length - 1]);

      res
        .status(200)
        .json({
          message: 'Delete Post Success!',
          data: post
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Oops, Something Went Wrong!',
          error
        });
    }
  }
}