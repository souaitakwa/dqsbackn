const express = require('express');

const { body } = require('express-validator');

const defaultcommentController = require('../controllers/defaultcomment');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, defaultcommentController.fetchAll);

router.post(
  '/',
  [
    auth,
    body('description').trim().isLength({ min: 5 }).not().isEmpty(),
  ],
  defaultcommentController.postdefaultcomment
);

router.put('/', defaultcommentController.putdefaultcomment);


router.delete('/:id', auth, defaultcommentController.deletedefaultcomment);

module.exports = router;