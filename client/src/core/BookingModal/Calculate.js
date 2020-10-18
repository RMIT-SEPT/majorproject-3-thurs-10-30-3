

export const parseToInt = (time) => {
    var hour = parseInt(time.slice(0, 2));
    var minute = parseInt(time.slice(4, 6));
    return hour * 60 + minute
}

export const parseToString = (time) => {
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

        // Remove in array from start time to finish time
        arr = arr.filter(t => {
            if (t >= startTimeInMinute && t < finishTimeInMinute) {
                return false
            } else {
                return true
            }
        })

        arr = arr.filter(t => {
            if (arr.includes(t + totalServiceTime)) {
                return true
            } else {
                return false
            }
        })

    })

    return arr
}

const populdateAvailableTime = (startTimeInMinute, finishTimeInMinute) => {
    var arr = []
    var a = startTimeInMinute
    while (a <= finishTimeInMinute) {
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
   
    var startTimeInMinute = parseToInt(startTime)
    var finishTimeInMinute = parseToInt(finishTime)

    var availableTimeArr = populdateAvailableTime(startTimeInMinute, finishTimeInMinute)
    var filteredArr = removeUnavailableTime(availableTimeArr, filteredSchedule, totalServiceTime,)
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
    
        if (JSON.stringify(s.workerId) === JSON.stringify(worker._id) && s.date === selectedDate) {
            return true
        } else {
            return false
        }
    })

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