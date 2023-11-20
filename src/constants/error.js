const LOGIN_ERROR = {
    LOGIN_FAIL: { 
        errorMessage: "Error. Please try again."
    }
}

const REGISTER_ERROR = {
    INVALID_NAME: { 
        errorTitle: "INVALID_NAME",
        errorMessage: "Please enter a valid username."
    },
    INVALID_EMAIL: {
        errorTitle: "INVALID_EMAIL",
        errorMessage: "Please enter a valid email."
    },
    INVALID_ADDRESS: {
        errorTitle: "INVALID_ADDRESS",
        errorMessage: "Please enter a valid address."
    },
    INVALID_PW: {
        errorTitle: "INVALID_PW",
        errorMessage: "Your password must be 8-20 characters long."
    },
    INVALID_PW_MATCH: {
        errorTitle: "INVALID_PW_MATCH",
        errorMessage: "Passwords do not match."
    }
}

export {
    LOGIN_ERROR,
    REGISTER_ERROR,
}