const { validationResult } = require('express-validator');

const answer = require('../models/answer');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allanswers] = await answer.fetchAll();
    res.status(200).json(allanswers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
/*
exports.findquestionid = async (req, res, next) => {
  const questionid = req.body.questionid;
  try {
    const question = await answer.find(questionid);

    if (question[0].length !== 1) {
      const error = new Error('An answer with this questionid could not be found.');
      error.statusCode = 401;
      throw error;
    }
    const storedquetion = question[0][0];

   
    res.status(200).json({ userId: storedquetion.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};*/


exports.findOne = (req, res) => {
  const questionid = req.params.questionid;

  answer.findOne(questionid)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + questionid
      });
    });
};


exports.postanswer = async (req, res, next) => {
  console.log(req.body.answer, req.body.questionid, req.body.userid);
  try {
    const postResponse = await answer.post(req.body.answer, req.body.questionid, req.body.user);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.findOneByQuestionId = async (req, res) => {
  const questionid = req.params.id;
    try {
      const [allanswers] = await answer.findOne(questionid);
      res.status(200).json(allanswers);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};



/*
exports.postanswer = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const answer = req.body.answer;
  const description = req.body.description;
  const userid = req.body.userid;

  try {
    const answer = {
      answer: answer,
      description: description,
      userid: userid,
    };
    const result = await answer.save(answer);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};*/

exports.putanswer = async (req, res, next) => {
  try {
    const putResponse = await answer.update(req.body.id, req.body.answer);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteanswer = async (req, res, next) => {
  try {
    const deleteResponse = await answer.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
