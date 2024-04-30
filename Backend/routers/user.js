const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


/*router.get("/login", (req,res) => {
    res.render("login");
})*/

// Route to render the signup page
router.get("/signup", (req, res) => {
    res.render("signup");
});


// Route to handle user registration
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword  
        });
        await newUser.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Export the router
module.exports = router;