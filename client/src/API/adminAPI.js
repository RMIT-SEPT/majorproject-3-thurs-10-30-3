export const createAdmin = user => {
    console.log("what is user : ", user)
    // const { email,name, password, address, phone,businessId } = req.body;
    return fetch(`/auth/api/admin/signup`, {
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

