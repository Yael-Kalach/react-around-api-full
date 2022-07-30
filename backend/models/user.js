const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../utils/error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg'
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'This email is already used'],
    validate: {
      validator: (v) => isEmail(v),
      message: `Wrong email format`,
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8
  }
});

userSchema.statics.findUserInfo = function findUserInfo(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new ErrorHandler(401, 'Incorrect email or password'),
        );
      }

      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          return Promise.reject(
            new ErrorHandler(401, 'Incorrect email or password'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
