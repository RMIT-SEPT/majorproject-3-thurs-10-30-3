import { BASE_URL } from "../config";
const API = BASE_URL 

export const getUsers = ({ token }) => {
    
    return fetch(`/auth/users`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const readUser = async ({userId}) => {

    var response = await fetch(`/auth/api/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    response = await response.json();
    
    if(response.error){

    } else{
        return response
    }
};

export const readCurrentUser = async () => {

    var response = await fetch(`/auth/api/user`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    response = await response.json();
    
    if(response.error){

    } else{
        return response
    }
};

export const currentUser = async () => {

    var response = await fetch(`/auth/api/users/currentuser`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    response = await response.json();
    
    if(response.error){

    } else{
        return response
    }
};

export const signup = user => {
    console.log("what is user : ", user)
    return fetch(`/auth/api/users/signup`, {
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

export const getBusiness = user => {

    return fetch(`/business/api/business`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = user => {
    return fetch(`/auth/api/users/signin`, {
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

export const signout = () => {
    return fetch('/auth/api/users/signout', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const isAuthenticated = async  () => {
    if (typeof window == "undefined") {
        return false;
    }

    var response = await fetch(`/auth/api/users/currentuser`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    if(response.currentUser===undefined){
        return false
    } else{
        return true
    }
};

