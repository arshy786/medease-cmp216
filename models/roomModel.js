// models/roomModel.js
const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Room number is required'],
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['General', 'Private', 'ICU', 'Emergency'],
    required: [true, 'Room type must be selected']
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  assignedPatient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// Add virtuals or indexes here if needed in future
module.exports = mongoose.model('Room', roomSchema);