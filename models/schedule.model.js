const sql = require('../dbconfig/db.config')

// constructor
const Schedule = function (schedule) {
    this.time = schedule.time
    this.date = schedule.date
    this.title = schedule.title
    this.teacherId = schedule.teacherId
    this.teacherName = schedule.teacherName
}

Schedule.create = (newSched, result) => {
    sql.query('INSERT INTO schedule SET ?', newSched, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('created schedule: ', { id: res.insertId, ...newSched })
        result(null, { id: res.insertId, ...newSched })
    })
}

Schedule.findBy = (property, scheduleValue, result) => {
    sql.query(
        `SELECT * FROM schedule WHERE ${property}='${scheduleValue}';`,
        (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(err, null)
                return
            }
            console.log('found schedule: ', res[0])
            result(null, res)
        }
    )
}

Schedule.getAll = (result) => {
    sql.query('SELECT * FROM schedule', (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        console.log('schedule: ', res)
        result(null, res)
    })
}

Schedule.remove = (id, result) => {
    sql.query('DELETE FROM schedule WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(null, err)
            return
        }

        if (res.affectedRows === 0) {
            // not found Schedule with the id
            result({ kind: 'not_found' }, null)
            return
        }

        console.log('deleted schedule with id: ', id)
        result(null, res)
    })
}

module.exports = Schedule
