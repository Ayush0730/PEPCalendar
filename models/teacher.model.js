const sql = require('../dbconfig/db.config')

// constructor
// eslint-disable-next-line
const Teacher = function (teacher) {
    this.email = teacher.email
    this.name = teacher.name
    this.subject = teacher.subject
}
// Basic functions

Teacher.create = (newTeacher, result) => {
    sql.query('INSERT INTO teachers SET ?', newTeacher, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, { id: res.insertId, ...newTeacher })
    })
}

Teacher.findById = (teacherId, result) => {
    sql.query(`SELECT * FROM teachers WHERE id = ${teacherId}`, (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        if (res.length) {
            result(null, res[0])
            return
        }

        // not found Teacher with the id
        result({ kind: 'not_found' }, null)
    })
}

Teacher.getAll = (result) => {
    sql.query('SELECT * FROM teachers', (err, res) => {
        if (err) {
            result(null, err)
            return
        }

        result(null, res)
    })
}

module.exports = Teacher
