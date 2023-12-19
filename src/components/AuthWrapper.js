import React, { Fragment, useEffect, useState, useRef } from 'react'
import { renewToken } from '../utils/auth'
import { tokenInterval } from '../constants/common'
import API from '../constants/APIs'
import axios from "axios"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const useAuth = () => {
    const [isloggedIn, setLoggedIn] = useState(false)
    const [userData, setUser] = useState({})
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        validateSession()
    }, [])

    const validateSession = async () => {
        const accessToken = localStorage.getItem('accessToken')
        const userId = localStorage.getItem('id')
        if (accessToken) {
            renewToken()
            try {
                const response = await axios.get(BASE_URL + API.PROFILE, {
                    headers: {
                        authorization: "Bearer " + accessToken
                    }
                })
                if (response.status === 200) {
                    // check if the id and returning access token is the same
                    if (response.data.id === parseInt(userId)) {
                        setLoggedIn(true)
                        setUser(response.data)
                        setAuthChecked(true)
                    }
                } else {
                    throw response
                }
            } catch (error) {
                setAuthChecked(false)
                console.log("profile error", error)
            }
        }
    }
    return { isloggedIn, userData, authChecked }
}

export default function AuthWrapper({ children, loggedIn }) {
    const [startTimer, setStartTimer] = useState(false)
    const [timerId, setTimerId] = useState(0)
    const timerIdRef = useRef(0)

    useEffect(() => {
        timerIdRef.current = timerId
    })

    useEffect(() => {
        if (loggedIn){
            setStartTimer(true)
        } else {
            setStartTimer(false)
            clearTimeout(timerIdRef.current)
        }
    },[loggedIn])

    useEffect(() => {
        if (startTimer) {
            const tokenTimerId = window.setInterval(() => {
                renewToken()
            }, tokenInterval)
            setTimerId(tokenTimerId)
        }
    }, [startTimer])

    return (
       <Fragment>{children}</Fragment>
    )
}