// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');
const winston = require('winston');
// Logger setup with timestamps
const logger = winston.createLogger({
 level: 'info',
 format: winston.format.combine(
   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
   winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
 ),
 transports: [
   new winston.transports.Console(),
   new winston.transports.File({ filename: 'logs/room-actions.log' })
 ]
});
// Async error handler middleware
const asyncHandler = fn => (req, res, next) =>
 Promise.resolve(fn(req, res, next)).catch(next);
// ✅ GET: All rooms
router.get('/', asyncHandler(async (req, res) => {
 const rooms = await Room.find().sort({ roomNumber: 1 });
 res.render('rooms/all_rooms', { rooms });
}));
// ✅ GET: Add new room form
router.get('/new', (req, res) => {
 res.render('rooms/new_room');
});
// ✅ POST: Create a new room
router.post('/', asyncHandler(async (req, res) => {
 const { roomNumber, type, isOccupied } = req.body;
 if (!roomNumber || !type) {
   req.flash('error_msg', 'Room number and type are required.');
   return res.redirect('/rooms/new');
 }
 const existingRoom = await Room.findOne({ roomNumber: roomNumber.trim() });
 if (existingRoom) {
   req.flash('error_msg', 'Room number already exists. Please use a unique number.');
   return res.redirect('/rooms/new');
 }
 const newRoom = new Room({
   roomNumber: roomNumber.trim(),
   type: type.trim(),
   isOccupied: isOccupied === 'on'
 });
 await newRoom.save();
 logger.info(`Room created: ${newRoom.roomNumber}`);
 req.flash('success_msg', `Room ${newRoom.roomNumber} added successfully.`);
 res.redirect('/rooms');
}));
// ✅ GET: View room by ID
router.get('/:id', asyncHandler(async (req, res) => {
 const room = await Room.findById(req.params.id);
 if (!room) {
   req.flash('error_msg', 'Room not found.');
   return res.redirect('/rooms');
 }
 res.render('rooms/view_room', { room });
}));
// ✅ GET: Edit room form
router.get('/:id/edit', asyncHandler(async (req, res) => {
 const room = await Room.findById(req.params.id);
 if (!room) {
   req.flash('error_msg', 'Room not found.');
   return res.redirect('/rooms');
 }
 res.render('rooms/edit_room', { room });
}));
// ✅ PUT: Update room details
router.put('/:id', asyncHandler(async (req, res) => {
 const { roomNumber, type, isOccupied } = req.body;
 const room = await Room.findById(req.params.id);
 if (!room) {
   req.flash('error_msg', 'Room not found.');
   return res.redirect('/rooms');
 }
 const duplicate = await Room.findOne({ roomNumber: roomNumber.trim(), _id: { $ne: room._id } });
 if (duplicate) {
   req.flash('error_msg', 'Another room with that number already exists.');
   return res.redirect(`/rooms/${req.params.id}/edit`);
 }
 room.roomNumber = roomNumber.trim();
 room.type = type.trim();
 room.isOccupied = isOccupied === 'on';
 await room.save();
 logger.info(`Room updated: ${room.roomNumber}`);
 req.flash('success_msg', `Room ${room.roomNumber} updated successfully.`);
 res.redirect('/rooms');
}));
// ✅ DELETE: Remove room
router.delete('/:id', asyncHandler(async (req, res) => {
 const room = await Room.findByIdAndDelete(req.params.id);
 if (!room) {
   req.flash('error_msg', 'Room not found.');
   return res.redirect('/rooms');
 }
 logger.warn(`Room deleted: ${room.roomNumber}`);
 req.flash('success_msg', `Room ${room.roomNumber} deleted successfully.`);
 res.redirect('/rooms');
}));
module.exports = router;