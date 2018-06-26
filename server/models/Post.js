const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  image: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }] 
}, {
  timestamps: true
});

postSchema.pre('save', function (next) {
  this
    .model('User')
    .update({
        _id: this.user
      }, {
        $push: {
          posts: this._id
        }
      }, {
        multi: true
      },
      next
    );
});

postSchema.pre('remove', function (next) {
  this
    .model('User')
    .update({
        _id: this.user
      }, {
        $pull: {
          posts: this._id
        }
      }, {
        multi: true
      },
      next
    )

  this
    .model('Comment')
    .deleteMany({
        post: this._id
      },
      next
    );
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;