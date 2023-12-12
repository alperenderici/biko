// Import necessary modules
const express = require('express');
const session = require('express-session');

// Create an Express app
const app = express();


// Set up session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

// // Middleware to check if the user is authenticated
// const checkAuth = (req, res, next) => {
//   if (req.session.authenticated) {
//     next(); // User is authenticated, proceed to the next middleware or route handler
//   } else {
//     res.redirect('/auth'); // User is not authenticated, redirect to the login page
//   }
// };
const checkAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    if (req.path === '/register') {
      res.redirect('/auth'); // Redirect to the login page if accessing the /register page without authentication
    } else {
      res.redirect('/register'); // Redirect to the register page if accessing any other restricted page without authentication
    }
  }
};

// Login route
app.get('/auth', (req, res) => {
  // Render the login form
  res.render('auth');
});

// Registration route
app.get('/register', checkAuth, (req, res) => {
  // Render the registration form
  res.render('register');
});

// User's machines list route
app.get('/machines', checkAuth, (req, res) => {
  // Render the machines list page
  res.render('machines');
});

// Login form submission route
app.post('/auth', (req, res) => {
  // Perform authentication logic, e.g., check username and password
  const { username, password } = req.body;

  if (username === 'admin123@admin123.com' && password === 'admin123') {
    // Set the authenticated flag in the session
    req.session.authenticated = true;
    res.redirect('/machines'); // Redirect to the machines list page after successful login
  } else {
    res.redirect('/auth'); // Redirect back to the login page on failed login attempt
  }
});

// Start the server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});