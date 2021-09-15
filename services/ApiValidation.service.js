module.exports.apiEmailAndPasswordValidation = (email, password) => {
    if (
        !email || email == '' || email == undefined ||
        !password || password == '' || password == undefined
    ) {
        return false
    } else {
        return true
    }
}