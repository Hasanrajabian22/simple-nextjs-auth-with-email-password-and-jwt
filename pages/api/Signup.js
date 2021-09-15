import nextConnect from 'next-connect'
import { apiEmailAndPasswordValidation } from '../../services/ApiValidation.service'
import {isUserExist, createUser} from '../../services/Mongodb.service'

const handler = nextConnect()

handler
    // register
    .post(async (req, res) => {
        const { email } = req.body
        const { password } = req.body

        if (apiEmailAndPasswordValidation(email, password)) {
            if (! await isUserExist(email)) {
                await createUser(email, password)
                res.status(200).json({success: true, msg: 'user registered.'})
            } else {
                res.json({success: false, msg: 'this email is taken.'})
            }
        } else {
            res.json({success: false, msg: 'email or password is wrong.'})
        }
    })

export default handler