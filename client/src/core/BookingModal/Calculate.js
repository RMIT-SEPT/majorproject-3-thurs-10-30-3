

const parseToInt = (time) => {
    var hour = parseInt(time.slice(0, 2));
    var minute = parseInt(time.slice(4, 6));
    return hour * 60 + minute
}

const parseToString = (time) => {
    var hour = parseInt(time / 60)
    var minute = time % 60

    hour = JSON.stringify(hour)
    minute = JSON.stringify(minute)

    if (hour.length === 1) {
        hour = `0${hour}`
    }
    if (minute.length === 1) {
        minute = `0${minute}`
    }

    return `${hour}:${minute}`
}

const removeUnavailableTime = (arr, schedules, totalServiceTime) => {
    schedules.map(s => {
        var scheduledTime = s.scheduledTime
        var startTime = scheduledTime.slice(0, 5);
        var finishTime = scheduledTime.slice(6, 11);
        var startTimeInMinute = parseToInt(startTime)
        var finishTimeInMinute = parseToInt(finishTime)

        // remove in array from start time to finish time
        arr = arr.filter(t => {
            if (t >= startTimeInMinute && t < finishTimeInMinute) {
                return false
            } else {
                return true
            }
        })
        // console.log("arr after filter1: ", arr)

        arr = arr.filter(t => {
            if (arr.includes(t + totalServiceTime)) {
                return true
            } else {
                return false
            }
        })
        // console.log("arr after filter2: ", arr)

    })

    // console.log("arr afte filtering :", arr)
    return arr
}

const populdateAvailableTime = (startTimeInMinute, finishTimeInMinute) => {
    var arr = []
    var a = startTimeInMinute
    while (a <= finishTimeInMinute) {
        // console.log("A : ", a, " | finishTimeInMinute : ", finishTimeInMinute)
        // newArr.push(parseToString(a))
        arr.push(a)
        a = a + 10
    }

    return arr
}

export const calculateAvailability = ({ shift, schedules, totalServiceTime, worker, date }) => {

    var filteredSchedule = filterScheduleOnDateAndWorker({ date, schedules, worker })
    if (filteredSchedule === false) return []

    var startTime = shift.slice(0, 5);
    var finishTime = shift.slice(6, 11);
    // console.log(startTime)
    // console.log(finishTime)
    var startTimeInMinute = parseToInt(startTime)
    var finishTimeInMinute = parseToInt(finishTime)

    // console.log(startTimeInMinute)
    // console.log(finishTimeInMinute)

    var availableTimeArr = populdateAvailableTime(startTimeInMinute, finishTimeInMinute)



    var filteredArr = removeUnavailableTime(availableTimeArr, filteredSchedule, totalServiceTime,)

    console.log("before parse to stirng : ", filteredArr)
    return filteredArr.map(t => parseToString(t))
}


const getDayOfWeek = (date) => {

    if (date === 0) {
        return 'sun'
    } else if (date === 1) {
        return 'mon'
    } else if (date === 2) {
        return 'tue'
    } else if (date === 3) {
        return 'wed'
    } else if (date === 4) {
        return 'thu'
    } else if (date === 5) {
        return 'fri'
    } else if (date === 6) {
        return 'sat'
    }
}

export const filterScheduleOnDateAndWorker = ({ date, schedules, worker }) => {

    if (!worker.days.includes(getDayOfWeek(date.getDay()))) return false

    const selectedDate =formatDate(date)

    var filteredSchedule = schedules.filter(s => {
        console.log("s.date : ", s.date, " selectedDate : ", selectedDate)
        console.log("s.name === worker.name ", s.workerId, worker._id)
        console.log(JSON.stringify(s.workerId) === JSON.stringify(worker._id))

        console.log(worker.days, getDayOfWeek(date.getDay()))
        console.log(worker.days.includes(getDayOfWeek(date.getDay())))
        if (JSON.stringify(s.workerId) === JSON.stringify(worker._id) && s.date === selectedDate) {
            return true
        } else {
            return false
        }
    })
    console.log("filteredSchedule : ", filteredSchedule)

    return filteredSchedule
}


export const formatDate = (date) => {
    var month = date?.getMonth() + 1
    if (JSON.stringify(month)?.length === 1) {
        month = `0${month}`
    }
    var day = date?.getDate()
    if (JSON.stringify(day)?.length === 1) {
        day = `0${day}`
    }

    return `${date?.getFullYear()}-${month}-${day}`
}