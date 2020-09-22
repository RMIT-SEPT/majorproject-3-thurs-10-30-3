
export const createWorker = user => {
    console.log("what is user : ", user)
    // const { email,name, password, address, phone,businessId } = req.body;

    return fetch(`/auth/api/worker/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const editWorker = (data) => {

    return fetch(`/auth/api/worker/${data.workerId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
