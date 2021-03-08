import * as axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "04a4f1a6-bb03-41ad-8c50-a4b3e9bb8d43"
    }
});

export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    }

}
export const followAPI = {

    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    followUser(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    }

}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status: status})
            .then(response => response.data)
    }
}

export const authAPI = {
    getAuthUserProfile() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    postAuthLogin(email, password) {
        return instance.post(`auth/login`, {
            email: email,
            password: password
        })
            .then(response => response.data)
    }
}

