const sql = require('../dbconfig/db.config')

// constructor
// eslint-disable-next-line
const Schedule = function (schedule) {
    this.startTime = schedule.startTime
    this.endTime = schedule.endTime
    this.date = schedule.date
    this.title = schedule.title
    this.teacherId = schedule.teacherId
    this.teacherName = schedule.teacherName
}

Schedule.create = (newSched, result) => {
    sql.query('INSERT INTO schedule SET ?', newSched, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, { id: res.insertId, ...newSched })
    })
}

Schedule.findBy = (property, scheduleValue, result) => {
    sql.query(
        `SELECT * FROM schedule WHERE ${property}='${scheduleValue}';`,
        (err, res) => {
            if (err) {
                result(err, null)
                return
            }
            result(null, res)
        }
    )
}

Schedule.getAll = (result) => {
    sql.query('SELECT * FROM schedule', (err, res) => {
        if (err) {
            result(null, err)
            return
        }
        result(null, res)
    })
}

Schedule.updateById = (id, newSchedule, result) => {
    sql.query(
        'UPDATE schedule SET title = ?, startTime = ?, endTime = ?, date = ?, teacherId = ?, teacherName = ? WHERE id = ?',
        [
            newSchedule.title,
            newSchedule.startTime,
            newSchedule.endTime,
            newSchedule.date,
            newSchedule.teacherId,
            newSchedule.teacherName,
            id,
        ],
        (err, res) => {
            if (err) {
                result(err, null)
                return
            }

            if (res.affectedRows === 0) {
                // Not found
                result({ kind: 'not_found' }, null)
                return
            }

            result(null, { id, ...newSchedule })
        }
    )
}

Schedule.remove = (id, result) => {
    sql.query('DELETE FROM schedule WHERE id = ?', id, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        if (res.affectedRows === 0) {
            // not found Schedule with the id
            result({ kind: 'not_found' }, null)
            return
        }
        result(null, res)
    })
}

module.exports = Schedule
