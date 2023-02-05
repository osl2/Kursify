const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

const Course = require('../models/Course')
const Account = require('../models/Account')
const Screen = require('../models/Screen').Screen

const getCourse = asyncHandler(async (req, res) => {
    /**
     * TO DO: populate elements
     */
    const course = await Course.findById(req.params.id)//.populate('Element')

    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    } else if (course.account != req.account.id) {
        res.status(400)
        throw new Error('Acces denied')
    }
    
    res.status(200).json(course)
})

const setCourse = asyncHandler(async (req, res) => {
    const { courseName } = req.body
    const accountId  = req.account.id
    try {
        if (!courseName) {
            res.status(400)
            throw new Error('Please add course name')
        }

        // checks if there already exists an document with the given filters
        const count = await Course.countDocuments({account: accountId, courseName: courseName})
        if (count > 0) {
            throw new Error('This course already exists')
        }

        // create Welcome screen and course
        const screen = await Screen.create({template: 'Welcome'})
        const course = await Course.create({
            account: accountId,
            courseName: courseName
        })
        // push screen
        course.screens.push(screen)
        course.save()
        res.status(201).json(course._id)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

const getAllCourses = asyncHandler(async (req, res) => {
    try {
        const courses = await Course.find({ account: req.account.id})
        res.status(200).json({courses})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

const updateCourse = asyncHandler(async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        const courseName = req.body.courseName
        if (!courseName) {
            throw new Error('Please add course name')
        }    
        if (!course) {
            throw new Error('Course not found')
        } else if (course.account != req.account.id) {
            res.status(401)
            throw new Error('Acces denied')
        }
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {"courseName": courseName}, { new: true})
        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

const deleteCourse = asyncHandler(async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if (!course) {
            res.status(400)
            throw new Error('Course not found')
        } else if (course.account != req.account.id) {
            res.status(401)
            throw new Error('Acces denied')
        }
        /**
         * TO DO: delete elements of all screens
         */

        await course.remove()
        res.status(200).json({message: `Deleted course ${req.params.id}`})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

/**
 * To DO: share
 */
const shareCourse = asyncHandler( async (req, res) => {
    //api/share/:id/:email
    const email = req.body

    const account = Account.find({email: email})

    if (!account) {
        res.status(400)
        throw new Error('Account not found')
    }

    
})

module.exports = {
    getCourse,
    setCourse,
    getAllCourses,
    updateCourse, 
    deleteCourse,
    shareCourse,
}


