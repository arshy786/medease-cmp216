// models/patientModel.js
const mongoose = require('mongoose');
// Define the schema for a Patient
const patientSchema = new mongoose.Schema(
 {
   // Full name of the patient
   name: {
     type: String,
     required: [true, 'Patient name is required'],
     trim: true
   },
   // Patient's age, must be 0 or above
   age: {
     type: Number,
     required: [true, 'Patient age is required'],
     min: [0, 'Age cannot be negative']
   },
   // Patient's gender - only allowed values are listed
   gender: {
     type: String,
     enum: {
       values: ['Male', 'Female', 'Other'],
       message: 'Gender must be Male, Female, or Other'
     },
     required: [true, 'Gender is required']
   },
   // Contact number with validation to allow only digits, spaces, and plus sign
   contactNumber: {
     type: String,
     required: [true, 'Contact number is required'],
     match: [/^[\d\s+]+$/, 'Contact number can only contain digits, spaces, or "+"']
   },
   // Full residential address of the patient
   address: {
     type: String,
     required: [true, 'Address is required'],
     trim: true
   }
 },
 {
   // Automatically adds createdAt and updatedAt fields
   timestamps: true
 }
);
// Export the model to be used in routes and controllers
module.exports = mongoose.model('Patient', patientSchema);