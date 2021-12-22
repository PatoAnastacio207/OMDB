import axios from "axios"

export const manageSubmitMovie = async (searchInput, filter) => {
    if(searchInput.value) {
        return axios.get(`/api/movies/search?search=${searchInput.value}&type=${filter}`)
    }
}

export const manageSubmitUser = async (searchInput) => {
    if(searchInput.value) {
        return axios.get(`/api/users/search?username=${searchInput.value}`)
    }
}