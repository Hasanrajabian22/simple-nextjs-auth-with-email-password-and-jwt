

module.exports.registerFormValidation = (email, password, passwordConfirm) => {
    if (
        !email || email == '' || email == undefined ||
        !password || password == '' || password == undefined ||
        !passwordConfirm || passwordConfirm == '' || passwordConfirm == undefined
    ) {
        return false
    } else {
        return true
    }
}

module.exports.emailValidation = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
        return true
    } else {
        return false
    }
}

module.exports.passwordConfirmationValidation = (password, passwordConfirm) => {

    if (password === passwordConfirm) {
        return true
    } else {
        return false
    }

}

module.exports.passwordLength = (password) => {
    if (password.toString().length < 8) {
        return false
    } else {
        return true
    }
}

module.exports.loginFormValidation = (email, password) => {
    if (
        !email || email == '' || email == undefined ||
        !password || password == '' || password == undefined
    ) {
        return false
    } else {
        return true
    }
}







