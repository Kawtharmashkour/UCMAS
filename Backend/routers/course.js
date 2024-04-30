const express = require('express');
const { Program } = require('../models/program');
const { Course } = require('../models/course');
//Router class in Express.js is used to create modular route handlers. 
//It allows you to define 1.routes, 2.middleware, and 3.request handlers in a separate file or module, 
//making your code more organized and maintainable.
const router = express.Router();

// Get all courses
router.get(`/`, async (req, res) =>{
    //http://localhost:3000/api/v1/course?program= 1,2 the part ?program= 1,1 
    // is called query parameters which always after ? mark
    let filter={}; // make it as object instead of array to not inforse user to have category params
    if (req.query.program){
        filter = {program: req.query.program.split(',')} // means if there program return array of programs IDs
    }
    const courseList = await Course.find(filter).populate('program'); // if no program then filter is an 
                                                    //empty object so will not affect on the get method

    if (!courseList){
        res.status(500).json({success : false})
    }
    res.send(courseList);
})

//get course by id
router.get('/:id', async(req, res) =>{
    const course = await Course.findById(req.params.id).populate('program');

    if (!course){
        res.status(500).json({success : false, message: 'Course is not found with the given ID.'})
    }
    res.status(200).send(course);

})

//Exporting the whole module (file)
module.exports = router;