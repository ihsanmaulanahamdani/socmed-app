const Comment = require('../models/Comment');

module.exports = {
  addComment: async (req, res) => {
    try {
      const { id }    = req.params;
      const { text }  = req.body;

      const newComment = await Comment.create({
        user: req.decoded.id,
        post: id,
        text
      });

      res
        .status(201)
        .json({
          message: 'Create Comment Success!',
          data: newComment
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
  getComment: async (req, res) => {
    try {
      const { id } = req.params;

      const comments = await Comment.find({ post: id }).populate('User');

      res
        .status(200)
        .json({
          message: 'Get All Comment Success!',
          data: comments
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
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findOne({ _id: id });
      await comment.remove();

      res
      .status(200)
      .json({
        message: 'Delete Comment Success!',
        data: comment
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