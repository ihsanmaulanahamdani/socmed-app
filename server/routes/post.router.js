const router = require('express').Router();
const { createPost, getPost, deletePost, getAllPost, updateLike, updateDislike } = require('../controllers/post.controller');
const { addComment, getComment, deleteComment } = require('../controllers/comment.controller');
const { loginAuthentication } = require('../middlewares/auth');
const { multer, sendUploadToGCS } = require('../helpers/images');

router.post('/create', loginAuthentication, multer.single('image'), sendUploadToGCS, createPost);
router.get('/user', loginAuthentication, getPost);
router.get('/', loginAuthentication, getAllPost);
router.patch('/like', loginAuthentication, updateLike);
router.patch('/dislike', loginAuthentication, updateDislike);
router.delete('/delete/:id', loginAuthentication, deletePost);

router.post('/:id/comment', loginAuthentication, addComment);
router.get('/:id/comments', loginAuthentication, getComment);
router.delete('/comment/delete/:id', loginAuthentication, deleteComment);

module.exports = router;