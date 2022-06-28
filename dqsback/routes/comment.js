const express = require('express');

const { body } = require('express-validator');

const commentController = require('../controllers/comment');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',  commentController.fetchAll);

router.post(
  '/',
  [
  //  auth,
    body('description').trim().isLength({ min: 5 }).not().isEmpty(),
    body('defaultcomment').trim().isLength({ min: 10 }).not().isEmpty(),
    body('picture').trim().isLength({ min: 10 }).not().isEmpty(),
    body('userid').trim().not().isEmpty(),
  ],
  commentController.postcomment
);

router.put('/:id', commentController.putcomment);


router.delete('/:id',  commentController.deletecomment);

module.exports = router;