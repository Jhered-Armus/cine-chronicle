const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibraryEntrySchema = new Schema({
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

const LibrarySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  entries: [LibraryEntrySchema]
});

module.exports = mongoose.model('Library', LibrarySchema);