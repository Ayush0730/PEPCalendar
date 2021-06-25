const days = document.querySelectorAll('.day')

days.forEach((day) => {
    day.addEventListener('click', (e) => {
        if (parseInt(e.target.textContent.substr(3), 10) / 10 < 1) {
            window.location = `/day/2021-06-0${e.target.textContent.substr(3)}`
        } else {
            window.location = `/day/2021-06-${e.target.textContent.substr(3)}`
        }
    })
})

const filterTeacher = document.getElementById('filter-teacher')

filterTeacher.addEventListener('change', (e) => {
    window.location = `/schedule/${e.target.value}`
})
