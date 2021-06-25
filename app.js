const express = require('express')
const routes = require('./routes/schedule.router')
const Teacher = require('./models/teacher.model')

const app = express()
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    Teacher.getAll((err, allTeachers) => {
        res.render('calendar', { data: allTeachers })
    })
})

app.use(routes)

app.get('*', (req, res) => {
    res.render('404', { message: 'Something went wrong' })
})

app.listen(process.env.PORT || 3000, () => {
    // eslint-disable-next-line
    console.log('Server started')
})
