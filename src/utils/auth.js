import axios from "axios"
const BASE_URL = process.env.REACT_APP_API_BASE_URL

const renewToken = async () => {
    console.log("renewing token")
    const refreshToken = localStorage.getItem("refreshToken")
    try {
        const refreshResponse = await axios.post(BASE_URL + "/api/users/refresh", {
            refreshToken: refreshToken,
        })
        if (refreshResponse.status === 200){
            localStorage.setItem("accessToken", refreshResponse.data.accessToken)
            console.log("token renewed")
        } else {
            throw refreshResponse
        }
    } catch (error) {
        console.log("refreshResponse Error", error)
    }
}

export { renewToken }