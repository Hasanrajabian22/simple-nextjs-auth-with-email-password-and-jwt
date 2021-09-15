import nextConnect from 'next-connect'

// services
import { apiEmailAndPasswordValidation } from '../../services/ApiValidation.service'
import {isUserExist, findUser} from '../../services/Mongodb.service'
import { comparePassword } from "../../services/Bcrypt.service";
import { jwtSign } from "../../services/Token.service";

const handler = nextConnect()

handler
    // login
    .post(async (req, res) => {
        const { email } = req.body
        const { password } = req.body

        if (apiEmailAndPasswordValidation(email, password)) {
            if (!await isUserExist(email)) {
                res.json({success: false, msg: 'email or password is wrong.'})
            } else {
                const user = await findUser(email);
                if( await comparePassword(password, user.password)) {
                    const token = await jwtSign(user)
                    res.status(200).json({success: true, token})
                } else {
                    res.json({success: false, msg: '2email or password is wrong.'})
                }
            }
        } else {
            res.json({success: false, msg: 'email or password wrong.'})
        }

    })

export default handler