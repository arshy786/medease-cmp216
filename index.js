// Load environment variables

require('dotenv').config();

// Import logger for error logging

const logger = require('./logger');

// Core dependencies

const express = require('express');

const mongoose = require('mongoose');

const path = require('path');

const session = require('express-session');

const flash = require('connect-flash');

const helmet = require('helmet');              // ✅ Security

const compression = require('compression');    // ✅ Performance

// Initialise Express app

const app = express();

// ✅ Middleware: Security and performance

app.use(helmet());

app.use(compression());

// Middleware: Parse incoming form data

app.use(express.urlencoded({ extended: true }));

// Middleware: Serve static files from 'public' directory

app.use(express.static(path.join(__dirname, 'public')));

// Set view engine and views directory

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Middleware: Sessions and flash messages

app.use(session({

  secret: 'hospital_secret_key',

  resave: false,

  saveUninitialized: false

}));

app.use(flash());

// Global flash message middleware

app.use((req, res, next) => {

  res.locals.success_msg = req.flash('success_msg');

  res.locals.error_msg = req.flash('error_msg');

  next();

});

// Routes

const patientRoutes = require('./routes/patientRoutes');

const roomRoutes = require('./routes/roomRoutes');

app.use('/patients', patientRoutes);

app.use('/rooms', roomRoutes);

// Home route

app.get('/', (req, res) => {

  res.render('home');

});

// About route

app.get('/about', (req, res) => {

  res.render('about');

});

// 404 – Page not found

app.use((req, res) => {

  logger.error(`404 - Not Found - ${req.originalUrl}`);

  res.status(404).render('error', {

    statusCode: 404,

    message: "The page you're looking for doesn’t exist or may have been moved."

  });

});

// 500 – Internal server error

app.use((err, req, res, next) => {

  console.error('❌ Server Error:', err.stack);

  logger.error(`500 - ${err.message}`);

  res.status(500).render('error', {

    statusCode: 500,

    message: "Something went wrong on the server. Please try again later."

  });

});

// Connect to MongoDB Atlas

mongoose.connect(process.env.MONGODB_URI, {

  useNewUrlParser: true,

  useUnifiedTopology: true

})

.then(() => {

  console.log('✅ Connected to MongoDB');

  app.listen(3000, () => {

    console.log('🚀 Server running at http://localhost:3000');

  });

})

.catch(err => {

  console.error('❌ MongoDB connection failed:', err.message);

  logger.error(`MongoDB Connection Error: ${err.message}`);

});
 