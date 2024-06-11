const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  itemId: String,
  episode: Number,
  rating: Number,
  seen: Boolean,
  reviewDate: Date,
  themes: String,
  summary: String,
  conclusion: String
});

const userReviewSchema = new Schema({
  userId: String,
  username: String,
  reviews: [reviewSchema]
});
module.exports = mongoose.model('Review', userReviewSchema)