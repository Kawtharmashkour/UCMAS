const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

//Route to render the login page
router.get("/login", (req,res) => {
    res.render('login', {
        messages: {
            error: req.flash('error')
        }
    });
});

//Route to handle user login
/*router.post("/login", async (req, res) => {
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
            } else if (user.userType === 'admin') {
                res.redirect('/dashboardAdmin'); // Redirect to admin dashboard
            } else {
                res.redirect('/'); // Default redirect if role is not specified
            }
        } else {
            res.status(401).send("Incorrect password"); // Use HTTP 401 for incorrect credentials
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during login"); // Use HTTP 500 for server errors
    }
});*/
router.post("/login", async (req, res) => {
    try {
        const email = req.body.email.trim();
        console.log("Searching for user with email:", email);
        const user = await User.findOne({ email: email });
        if (!user) {
            req.flash('error', 'User account cannot be found.');
            return res.redirect('/api/v1/user/login');
        }

        // Compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordMatch) {
            req.session.user = user;  // Store user information in session

            // Redirect based on user role
            switch (user.userType) {
                case 'student':
                    res.redirect('/dashboard');
                    break;
                case 'teacher':
                    res.redirect('/dashboardTeacher');
                    break;
                case 'admin':
                    res.redirect('/dashboardAdmin');
                    break;
                default:
                    res.redirect('/');
            }
        } else {
            req.flash('error', 'Incorrect password');
            res.redirect('/api/v1/user/login');
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred during login');
        res.redirect('/api/v1/user/login');
    }
});

// Route to render the signup page
router.get("/signup", (req, res) => {
    res.render('signup', {
        messages: {
            error: req.flash('error'),
            success: req.flash('success')
        }
    });
});


// Route to handle user registration
/*router.post('/signup', async (req, res) => {
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
});*/
router.post('/signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.flash('error', 'Email already in use, please try another email');
            return res.redirect('/api/v1/user/signup');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            userType: req.body.userType,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        req.flash('success', 'User created successfully. Please login.');
        res.redirect('/api/v1/user/signup');
    } catch (error) {
        console.error(error);
        req.flash('error', error.message);
        res.redirect('/api/v1/user/signup');
    }
});




// Export the router
module.exports = router;