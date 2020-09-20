
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
