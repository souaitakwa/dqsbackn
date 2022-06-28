const { validationResult } = require('express-validator');

const comment = require('../models/comment');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allcomments] = await comment.fetchAll(req.query.reportId);
    res.status(200).json(allcomments);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.postcomment = async (req, res, next) => {
  try {
    const postResponse = await comment.post(req.body.description, req.body.defaultcomment, req.body.picture, req.body.userid, req.body.reportId);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};





/*
exports.postcomment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const comment = req.body.comment;
  const description = req.body.description;
  const userid = req.body.userid;

  try {
    const comment = {
      comment: comment,
      description: description,
      userid: userid,
    };
    const result = await comment.save(comment);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};*/

exports.putcomment = async (req, res, next) => {
  try {
    const putResponse = await comment.update(req.body.id, req.body.description, req.body.defaultcomment);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletecomment = async (req, res, next) => {
  try {
    const deleteResponse = await comment.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
