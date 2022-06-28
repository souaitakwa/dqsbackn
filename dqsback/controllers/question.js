const { validationResult } = require('express-validator');

const question = require('../models/question');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allquestions] = await question.fetchAll();
    res.status(200).json(allquestions);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.postquestion = async (req, res, next) => {
  try {
    console.log(req.body.user);
    console.log('wahab');
    const postResponse = await question.post(req.body.title, req.body.description, req.body.user);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};







/*
exports.postquestion = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const title = req.body.title;
  const description = req.body.description;
  const userid = req.body.userid;

  try {
    const question = {
      title: title,
      description: description,
      userid: userid,
    };
    const result = await question.save(question);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};*/

exports.putquestion = async (req, res, next) => {
  try {
    const putResponse = await question.update(req.body.id, req.body.title, req.body.description);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/*
exports.putquestionn = async (req, res, next) => {
  try {
    const putResponse = await question.updatenew(req.body.id);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

*/

exports.deletequestion = async (req, res, next) => {
  try {
    const deleteResponse = await question.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



// Find a single question with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  question.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

/*

exports.compare = async (req, res, next) => {
  try {
    const [questionreponse] = await question.compare(req.body.id);
    res.status(200).json(questionreponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
*/
