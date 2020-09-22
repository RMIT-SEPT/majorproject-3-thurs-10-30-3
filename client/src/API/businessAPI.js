
export const createBusiness = (form) => {
    return fetch(`/business/api/business`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
    })
        .then(data => {
            return data.json()
        })
        .catch(err => console.log(err));
};

export const getListOfBusiness = () => {
    return fetch(`/business/api/business`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(data => {
            return data.json()
        })
        .catch(err => console.log(err));
};


export const getBusiness = ({ businessId }) => {
    return fetch(`/business/api/business/${businessId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(data => {
            return data.json()
        })
        .catch(err => console.log(err));
};


export const createSchedule = ({ businessId, userId, workerId, scheduledTime, serviceType, date }) => {
    return fetch(`/business/api/business/create/schedule/${businessId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, workerId, scheduledTime, serviceType, date })
    })
        .then(data => {
            return data.json()
        })
        .catch(err => console.log(err));
};

export const cancelSchedule = ({ userId, scheduleId, businessId }) => {
    return fetch(`/business/api/business/cancel/schedule/${businessId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, scheduleId })
    })
        .then(data => {
            return data.json()
        })
        .catch(err => console.log(err));
};