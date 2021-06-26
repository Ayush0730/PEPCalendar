const express = require('express')
const methodOverride = require('method-override')
const Schedule = require('../models/schedule.model')
const Teacher = require('../models/teacher.model')

const router = express.Router()
router.use(methodOverride('_method'))

// Find schedules by date
router.get('/day/:date', (req, res) => {
    Schedule.findBy('date', req.params.date, (err, result) => {
        if (err) {
            return res.redirect('/')
        }
        return res.render('dayCalendar', {
            data: result,
            date: req.params.date,
        })
    })
})

// Get request to render schedule form
router.get('/schedule', (req, res) => {
    Teacher.getAll((err, allTeachers) => {
        res.render('scheduleForm', {
            data: allTeachers,
            date: req.query.date,
            teacherId: req.query.id,
            teacherName: req.query.name,
        })
    })
})

// Post request to create a schedule
router.post('/schedule', (req, res) => {
    const { teacher } = req.body
    const teachArray = teacher.split(' ')
    const data = {
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        title: req.body.title,
        teacherId: teachArray[0],
        teacherName: teachArray[1],
    }
    Schedule.findBy('teacherId', data.teacherId, (err, foundSchedule) => {
        let i
        for (i = 0; i < foundSchedule.length; i += 1) {
            // Logic to check if time if schedule clashes
            if (data.date === foundSchedule[i].date) {
                if (
                    data.startTime < foundSchedule[i].endTime &&
                    data.endTime > foundSchedule[i].startTime
                ) {
                    res.render('404', {
                        message: `${data.teacherName} is not free on requested time`,
                    })
                    break
                }
            }
        }
        if (i === foundSchedule.length) {
            Schedule.create(data, (er) => {
                if (er) {
                    return res.redirect('/404')
                }
                return res.redirect('/')
            })
        }
    })
})

// Get schedule of a teacher with teacherId
router.get('/schedule/:teacherId', (req, res) => {
    Teacher.findById(req.params.teacherId, (err, foundTeacher) => {
        Schedule.findBy('teacherId', foundTeacher.id, (er, foundSchedule) => {
            if (er) {
                return res.redirect('/404')
            }
            return res.render('teacherEvents', {
                data: foundSchedule,
                teacherId: foundTeacher.id,
                teacherName: foundTeacher.name,
            })
        })
    })
})

router.get('/schedule/update/:id', (req, res) => {
    Schedule.findBy('id', req.params.id, (err, foundSchedule) => {
        if (err) {
            return res.render('404', {
                message: 'Something went wrong, Please try again later',
            })
        }
        return res.render('updateForm', { data: foundSchedule[0] })
    })
})

router.put('/schedule/:schedId', (req, res) => {
    const { teacher } = req.body.schedule
    const teachArray = teacher.split(' ')
    ;[req.body.schedule.teacherId, req.body.schedule.teacherName] = teachArray

    Schedule.updateById(req.params.id, req.body.schedule, (err) => {
        if (err) {
            return res.render('404', {
                message: 'Something Went Wrong, Please try again later',
            })
        }
        return res.redirect('back')
    })
})

router.delete('/schedule/:schedId', (req, res) => {
    Schedule.remove(req.params.schedId, (err) => {
        if (err) {
            return res.render('404', {
                message: 'Unable to Delete, Please Try Again',
            })
        }
        return res.redirect('back')
    })
})

module.exports = router
