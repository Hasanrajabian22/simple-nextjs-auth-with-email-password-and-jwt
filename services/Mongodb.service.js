import {connectToDatabase} from '../lib/Mongodb.lib'
import { uid } from 'uid'
// import { } from 'bcrypt'

// services
import {hashPassword} from './Bcrypt.service'

module.exports.isUserExist = async (email) => {
    const {db} = await connectToDatabase()
    const response = await db.collection("user").find({email}).toArray()
    if(response.length > 0) {
        return true
    } else {
        return false
    }
}

module.exports.createUser = async (email, password) => {
    const {db} = await connectToDatabase()
    const hashedPassword = await hashPassword(password)
    const response = await db.collection("user").insertOne({_id:uid(32) ,email, password: hashedPassword})
    return true
}

module.exports.findUser = async (email) => {
    const {db} = await connectToDatabase()
    const response = await db.collection("user").find({email}).toArray()
    if(response.length > 0) {
        return response[0]
    } else {
        return false
    }
}
