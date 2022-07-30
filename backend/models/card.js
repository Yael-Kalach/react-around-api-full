const mongoose = require('mongoose');
const { ErrorHandler } = require('../utils/error');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Owner ID is required'],
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

cardSchema.statics.authorizeAndDelete = function authorizeAndDelete({
  cardId,
  reqUserId,
  ownerId,
}) {
  if (reqUserId === ownerId.toString()) {
    return this.deleteOne({ _id: cardId }).orFail(() => {
      throw new ErrorHandler(404, `No card found with ${cardId}`);
    });
  }
  return Promise.reject(new ErrorHandler(403, 'Access denied'));
};

module.exports = mongoose.model('card', cardSchema);
