import React, { Fragment, useEffect, useState, useRef } from 'react'
import { renewToken } from '../utils/auth'
import API from '../constants/APIs'
import axios from "axios"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const useAuth = () => {
    const [isloggedIn, setLoggedIn] = useState(false)
    const [userData, setUser] = useState({})

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
                    }
                } else {
                    throw response
                }
            } catch (error) {
                console.log("profile Error", error)
            }
        }
    }
    return { isloggedIn, userData, validateSession }
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
            const interval = 108000
            const tokenTimerId = window.setInterval(() => {
                renewToken()
            }, interval)
            setTimerId(tokenTimerId)
        }
    }, [startTimer])

    return (
       <Fragment>{children}</Fragment>
    )
}