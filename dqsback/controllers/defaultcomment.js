const { validationResult } = require('express-validator');

const defaultcomment = require('../models/defaultcomment');

exports.fetchAll = async (req, res, next) => {
  try {
    const [alldefaultcomments] = await defaultcomment.fetchAll();
    res.status(200).json(alldefaultcomments);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.postdefaultcomment = async (req, res, next) => {
  try {
    const postResponse = await defaultcomment.post(req.body.description);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};





/*
exports.postdefaultcomment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const defaultcomment = req.body.defaultcomment;
  const description = req.body.description;
  const userid = req.body.userid;

  try {
    const defaultcomment = {
      defaultcomment: defaultcomment,
      description: description,
      userid: userid,
    };
    const result = await defaultcomment.save(defaultcomment);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};*/

exports.putdefaultcomment = async (req, res, next) => {
  try {
    const putResponse = await defaultcomment.update(req.body.id, req.body.description);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletedefaultcomment = async (req, res, next) => {
  try {
    const deleteResponse = await defaultcomment.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
