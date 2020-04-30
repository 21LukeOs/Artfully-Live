const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  uploader: {
    type: String,
    required: true
  },
  vote_count: {
    type: Number,
    default: 0
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Photo = mongoose.model('photo', PhotoSchema);