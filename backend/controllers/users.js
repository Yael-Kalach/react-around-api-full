const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(500).send({ message: 'An error has occurred on the server' });
      }
    })
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res) => {
  const userId = req.params.userId ? req.params.userId : req.user._id;
  User.findById(req.params.id)
    .orFail(() => {
      throw new ErrorHandler(404, `No user found with ID ${userId}`);
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.params, about: req.params },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    })
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.params },
    { new: true, runValidators: true }
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

const getUserInfo = (req, res) => {
  User.find({})
    .then((users) => {res.send({ data: users });})
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};
