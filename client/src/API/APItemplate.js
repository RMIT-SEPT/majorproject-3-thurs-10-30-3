import { BASE_URL } from "../config";
const API = BASE_URL + '/api'

export const readTours = ({ limit = 20, token }) => {
    return fetch(`${API}/tours?limit=${limit}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const readTour = ({ token, tourId }) => {
    return fetch(`${API}/tour/${tourId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const deleteTour = ({ token, id }) => {
    return fetch(`${API}/tour/remove/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const editTour = ({ token, tour, id }) => {
    return fetch(`${API}/tour/update/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tour)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createTour = ({ token, tour }) => {
    return fetch(`${API}/tour/create/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tour)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const addLocationToTour = ({ token, tourId, locationId }) => {
    return fetch(`${API}/tour/location/add`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tourId, locationId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const deleteLocationFromTour = ({ token, tourId, locationId }) => {
    return fetch(`${API}/tour/location/remove`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tourId, locationId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}