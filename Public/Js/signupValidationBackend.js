const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/signup', [
  body('email').isEmail().withMessage('Enter a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('FirstName').not().isEmpty().trim().escape().withMessage('First name is required'),
  body('LastName').not().isEmpty().trim().escape().withMessage('Last name is required'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed to save the user data to database.
  res.send('Signup successful!');
});

