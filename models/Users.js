const openDb = require('../configdb')

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
                    res.status(404).json("USER NOT FOUND")
                } else {
                    req.session.userRole = user.role
                    res.status(200).json("USER FOUND")
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