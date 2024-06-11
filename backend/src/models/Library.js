const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Favorito', 'Viendo', 'En Espera', 'Abandonado'],
    required: true
  }
});

module.exports = mongoose.model('Library', LibrarySchema);