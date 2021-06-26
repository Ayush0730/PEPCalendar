const express = require('express')
const Teacher = require('../models/teacher.model')

const router = express.Router()

router.get('/teacher', (req, res) => {
    res.render('newTeacher')
})

router.post('/teacher', (req, res) => {
    Teacher.create(req.body, (err) => {
        if (err) {
            return res.render('404', { message: 'Something went wrong' })
        }
        return res.redirect('/')
    })
})

module.exports = router
