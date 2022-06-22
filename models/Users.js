const openDb = require('../configdb')
const jwt = require('jsonwebtoken')
const SECRET = 'gy'

async function createTableUsers() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT)')
    });
}

async function addUser(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    openDb().then(db => {
        db.run('INSERT INTO users (username, password, role) VALUES (?,?,?)', [username, password, role])
    }).then(() => {
        res.status(200).json({
            "statusCode": 200,
        })
    }).catch((err) => {
        res.json(err)
    })
}

async function loginUser(req, res) {
    let username = req.params.username
    openDb().then(db => {
        db.get('SELECT * FROM users WHERE username=?', [username])
            .then(user => {
                if (user == null) {
                    res.status(404).json({
                        "statusCode": "User not found"
                    })
                } else {
                    const token = jwt.sign({userRole: user.role}, SECRET, { expiresIn: 300 })
                    req.headers['x-access-token'] = token
                    res.status(200).json({
                        auth: true,
                        token
                    })
                    next()
                }
            })
            .catch((err) => res.json(err))
    });
};

module.exports = {
    createTableUsers,
    addUser,
    loginUser
}