const jwt = require('jsonwebtoken')
const SECRET = 'gy'

const userRoles = {
    admin: 'admin',
    user: 'user'
}

function userAuthentication(req, res, next) {
    const token = req.headers['x-access-token']
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            res.send('TOKEN NULL OR INVALID')
        } else {
            if (decoded.userRole == userRoles.user) {
                req.userRole = decoded.userRole
                next()
            } else {
                res.send("ACCESS NOT ALLOWED")
            }
        }
    })
}

module.exports = {
    userAuthentication
}