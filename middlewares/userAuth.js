const userRoles = {
    admin: 'admin',
    user: 'user'
}

function userAuthentication(req, res, next) {
    if (req.session.userRole == 'user') {
        next()
    } else {
        res.send('ACCESS NOT ALLOWED')
    }
}

module.exports = {
    userAuthentication
}