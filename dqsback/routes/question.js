const express = require('express');

const { body } = require('express-validator');

const questionController = require('../controllers/question');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', questionController.fetchAll);


router.post(
  '/',
  [
   // auth,
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('description').trim().isLength({ min: 10 }).not().isEmpty(),
    body('userid').trim().not().isEmpty(),
  ],
  questionController.postquestion
);

router.put('/:id', questionController.putquestion);


router.delete('/:id', questionController.deletequestion);


router.get("/:id", questionController.findOne);



//router.get('/:id', questionController.compare);



module.exports = router;