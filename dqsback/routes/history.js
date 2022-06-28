const express = require('express');

const { body } = require('express-validator');

const historyController = require('../controllers/history');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', historyController.fetchAll);


router.post(
  '/',
  [
   // auth,
    body('comment').trim().not().isEmpty(),
    body('question').trim().not().isEmpty(),
    body('answer').trim().not().isEmpty(),
    body('userid').trim().not().isEmpty(),

  ],
  historyController.posthistory
);




//router.get("/:id", questionController.findOne);



//router.get('/:id', questionController.compare);



module.exports = router;