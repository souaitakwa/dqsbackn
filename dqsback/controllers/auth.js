const espress = require('express');
//const exphbs = require('express-handlerbars');
//const fileUpload = require('express-fileupload');
const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return;

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const picture = req.body.picture;
  const description = req.body.description;
  const element = req.body.element;

  try {
   // const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      password: password,
      role: role,
      picture: picture,
      description: description,
      element:element
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.find(email);

    if (user[0].length !== 1) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

   /* const isEqual = await bcrypt.compare(password, storedUser.password);


    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    */

    if (password !==storedUser.password) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
      },
      'secretfortoken',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: storedUser.id, role: storedUser.role });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.fetchAll = async (req, res, next) => {
  try {
    const [allUsers] = await User.fetchAll();
    res.status(200).json(allUsers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.deleteuser = async (req, res, next) => {
  try {
    const deleteResponse = await User.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
