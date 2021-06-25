const express = require('express')

const router = express.Router()
const Schedule = require('../models/schedule.model')
const Teacher = require('../models/teacher.model')

router.get('/day/:date', (req, res) => {
    // Find schedules which are on date = req.params.date
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

router.get('/schedule/:teacherId', (req, res) => {
    Schedule.findBy('teacherId', req.params.teacherId, (err, foundSchedule) => {
        if (err) {
            return res.redirect('/404')
        }
        return res.render('teacherEvents', {
            data: foundSchedule,
            teacherId: req.params.teacherId,
        })
    })
})

module.exports = router
