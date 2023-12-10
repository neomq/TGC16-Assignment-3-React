import { pages } from "../constants/common"
import { refreshUserToken, loginUser, logoutUser } from "./API"

const renewToken = async () => {
    console.log("renewing token")
    const refreshToken = localStorage.getItem("refreshToken")
    try {
        const refreshResponse = await refreshUserToken(refreshToken)
        if (refreshResponse.status === 200){
            const { accessToken } = refreshResponse.data
            localStorage.setItem("accessToken", accessToken)
            console.log("token renewed")
        } else {
            throw refreshResponse
        }
    } catch (error) {
        console.log("refreshResponse error", error)
    }
}

const startAuth = async (email, password) => {
    try {
        const loginResponse = await loginUser(email, password)
        if (loginResponse.status === 200) {
            const { accessToken, refreshToken, user_id } = loginResponse.data
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            localStorage.setItem('id', user_id)
        }
        return loginResponse
    } catch (error) {
        console.log("loginResponse error", error)
    }
}

const endAuth = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    try {
        const logoutResponse = await logoutUser(refreshToken)
        if (logoutResponse.status === 200) {
            localStorage.clear()
            window.location.pathname = pages.home
        } else {
            throw logoutResponse
        }
    } catch (error) {
        console.log("logoutResponse error", error)
    }
}

export { renewToken, startAuth, endAuth }