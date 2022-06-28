const express = require('express');

const { body } = require('express-validator');

const answerController = require('../controllers/answer');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',  answerController.fetchAll);

router.post(
  '/',
  [
    body('answer').trim().isLength({ min: 5 }).not().isEmpty(),
    body('questionid').trim().not().isEmpty(),
    body('user').trim().not().isEmpty(),
  ],
  answerController.postanswer
);

router.put('/:id', answerController.putanswer);


router.delete('/:id', answerController.deleteanswer);

router.post('/:id', answerController.postanswer);

router.get("/question/:id", answerController.findOneByQuestionId);



module.exports = router;