const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const secret = '!@$f%#swkf%^$%&$*wsdWE#SeCReT$UdfhWETYuo*$@#$^%Rerv&$bsKGhj;hjsdf';

module.exports.jwtSign = async (dataFromDb) => {
    const cryptr = new Cryptr(secret);
    const data = {
        id: cryptr.encrypt(dataFromDb._id),
        email: dataFromDb.email
    }
    const token = await jwt.sign({ data }, secret, { expiresIn: '1h' });
    return token
}