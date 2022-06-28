const { validationResult } = require('express-validator');

const history = require('../models/history');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allhistory] = await history.fetchAll();
    res.status(200).json(allhistory);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};





exports.posthistory = async (req, res, next) => {
  try {
    const postResponse = await history.post(req.body.comment, req.body.question, req.body.answer, req.body.userid);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
