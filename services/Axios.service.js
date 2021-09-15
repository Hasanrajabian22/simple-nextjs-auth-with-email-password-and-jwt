import axios from 'axios'

module.exports.axiosSignup = async (form) => {
    const response = await axios.post('api/Signup', form)
    return response.data
}

module.exports.axiosLogin = async (form) => {
    const response = await axios.post('api/Login', form)
    return response.data
}