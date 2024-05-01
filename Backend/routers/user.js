const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

//Route to render the login page
router.get("/login", (req,res) => {
    res.render("login");
})

//Route to handle user login
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email.trim();
        console.log("Searching for user with email:", email);
        const user = await User.findOne({ email: email });
        console.log("User found:", user);
        if (!user) {
            return res.status(404).send("User account cannot be found.");
        }

        // Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordMatch) {
            req.session.user = user;  // Store user information in session

            // Check user role and redirect accordingly
            if (user.userType === 'student') {
                res.redirect('/dashboard');  // Redirect to student dashboard
            } else if (user.userType === 'teacher') {
                res.redirect('/dashboardTeacher');  // Redirect to teacher dashboard
            } else {
                res.redirect('/dashboard');  // Default redirect if role is not specified
            }
        } else {
            res.status(401).send("Incorrect password"); // Use HTTP 401 for incorrect credentials
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during login"); // Use HTTP 500 for server errors
    }
});

// Route to render the signup page
router.get("/signup", (req, res) => {
    res.render("signup");
});


// Route to handle user registration
router.post('/signup', async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send('Email already in use, please try another email');
        }

        // If no existing user was found, proceed to create a new user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            userType: req.body.userType,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error(error); 
        res.status(400).send(error.message);
    }
});


// Export the router
module.exports = router;