const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    role: { type: String, default: 'Jacques Cousteau' },
    minlength: 2,
    maxlength: 30,
  },
  about: {
    role: { type: String, default: 'Explorer' },
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    role: { type: String, default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg' },
    validate: {
      validator(v) {
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'This email is already used'],
    validate: {
      validator: (v) => isEmail(v),
      message: (props) => `${props.value} is not a valid Email!`,
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
