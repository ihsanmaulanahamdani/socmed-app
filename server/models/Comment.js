const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  text: String
});

commentSchema.pre('save', function (next) {
  this
    .model('Post')
    .update({
        _id: this.post
      }, {
        $push: {
          comments: this._id
        }
      }, {
        multi: true
      },
      next
    );

  this
    .model('User')
    .update({
        _id: this.user
      }, {
        $push: {
          comments: this._id
        }
      }, {
        multi: true
      },
      next
    );
})

commentSchema.pre('remove', function (next) {
  this
    .model('Post')
    .update({
        _id: this.post
      }, {
        $pull: {
          comments: this._id
        }
      }, {
        multi: true
      },
      next
    );

  this
    .model('User')
    .update({
        _id: this.user
      }, {
        $pull: {
          comments: this._id
        }
      }, {
        multi: true
      },
      next
    );
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;