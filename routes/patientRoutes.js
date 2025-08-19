// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel');
const winston = require('winston');
// ✅ Logger setup (Winston)
const patientLogger = winston.createLogger({
 transports: [
   new winston.transports.File({
     filename: 'logs/patient-actions.log',
     level: 'info',
     format: winston.format.combine(
       winston.format.timestamp(),
       winston.format.json()
     )
   })
 ]
});
// ✅ GET all patients (with optional ?search= query)
router.get('/', async (req, res) => {
 try {
   const searchQuery = req.query.search;
   let patients;
   if (searchQuery) {
     const regex = new RegExp(searchQuery.trim(), 'i');
     patients = await Patient.find({ name: regex }).sort({ name: 1 });
     patientLogger.info({
       message: `Search performed: "${searchQuery}" returned ${patients.length} result(s).`,
       query: searchQuery
     });
   } else {
     patients = await Patient.find().sort({ name: 1 });
   }
   res.render('patients/all_patients', { patients, searchQuery });
 } catch (err) {
   console.error('Error fetching patients:', err.message);
   req.flash('error', 'Failed to load patients.');
   res.redirect('/');
 }
});
// ✅ GET: New patient form
router.get('/new', (req, res) => {
 res.render('patients/new_patient');
});
// ✅ POST: Create new patient
router.post('/', async (req, res) => {
 const { name, age, gender, contactNumber, address } = req.body;
 if (!name || !age || !gender || !contactNumber || !address) {
   req.flash('error', 'All fields are required.');
   return res.redirect('/patients/new');
 }
 const newPatient = new Patient({
   name: name.trim(),
   age: parseInt(age),
   gender: gender.trim(),
   contactNumber: contactNumber.trim(),
   address: address.trim()
 });
 try {
   await newPatient.save();
   patientLogger.info({ message: `New patient added`, name: newPatient.name });
   req.flash('success', `Patient ${newPatient.name} added successfully.`);
   res.redirect('/patients');
 } catch (err) {
   console.error('Error saving patient:', err.message);
   req.flash('error', 'Failed to add patient. Please try again.');
   res.redirect('/patients/new');
 }
});
// ✅ GET: View a single patient
router.get('/:id', async (req, res) => {
 try {
   const patient = await Patient.findById(req.params.id);
   if (!patient) {
     req.flash('error', 'Patient not found.');
     return res.redirect('/patients');
   }
   res.render('patients/view_patient', { patient });
 } catch (err) {
   console.error('Error fetching patient:', err.message);
   req.flash('error', 'Failed to load patient.');
   res.redirect('/patients');
 }
});
// ✅ GET: Edit patient form
router.get('/:id/edit', async (req, res) => {
 try {
   const patient = await Patient.findById(req.params.id);
   if (!patient) {
     req.flash('error', 'Patient not found.');
     return res.redirect('/patients');
   }
   res.render('patients/edit_patient', { patient });
 } catch (err) {
   console.error('Error loading edit form:', err.message);
   req.flash('error', 'Failed to load edit form.');
   res.redirect('/patients');
 }
});
// ✅ POST: Update patient details
router.post('/:id', async (req, res) => {
 const { name, age, gender, contactNumber, address } = req.body;
 if (!name || !age || !gender || !contactNumber || !address) {
   req.flash('error', 'All fields are required.');
   return res.redirect(`/patients/${req.params.id}/edit`);
 }
 try {
   const updatedPatient = await Patient.findByIdAndUpdate(
     req.params.id,
     {
       name: name.trim(),
       age: parseInt(age),
       gender: gender.trim(),
       contactNumber: contactNumber.trim(),
       address: address.trim()
     },
     { new: true }
   );
   if (!updatedPatient) {
     req.flash('error', 'Patient not found.');
     return res.redirect('/patients');
   }
   patientLogger.info({ message: `Patient updated`, name: updatedPatient.name });
   req.flash('success', `Patient ${updatedPatient.name} updated successfully.`);
   res.redirect(`/patients/${updatedPatient._id}`);
 } catch (err) {
   console.error('Error updating patient:', err.message);
   req.flash('error', 'Failed to update patient.');
   res.redirect(`/patients/${req.params.id}/edit`);
 }
});
module.exports = router;