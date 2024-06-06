const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      body: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('Review', ReviewSchema)