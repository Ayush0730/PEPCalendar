const sql = require('../dbconfig/db.config')

// constructor
const Teacher = function (teacher) {
    this.email = teacher.email
    this.name = teacher.name
    this.subject = teacher.subject
}
// Basic functions

Teacher.create = (newTeacher, result) => {
    sql.query('INSERT INTO teachers SET ?', newTeacher, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        console.log('created teacher: ', { id: res.insertId, ...newTeacher })
        result(null, { id: res.insertId, ...newTeacher })
    })
}

Teacher.findById = (teacherId, result) => {
    sql.query(`SELECT * FROM teachers WHERE id = ${teacherId}`, (err, res) => {
        if (err) {
            console.log('error: ', err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log('found teacher: ', res[0])
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
            console.log('error: ', err)
            result(null, err)
            return
        }

        console.log('teachers: ', res)
        result(null, res)
    })
}

module.exports = Teacher
