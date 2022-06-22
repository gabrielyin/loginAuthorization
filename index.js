const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const user = require('./models/Users')
const ua = require('./middlewares/userAuth')
const jwt = require('jsonwebtoken')
const SECRET = 'gy'

const userRoles = {
    admin: 'admin',
    user: 'user'
}

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend/public')))

user.createTableUsers();

//rendering login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/index.html'))
})

//rendering create account page
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/createAccount.html'))
})

//render admin page
// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend/view/admin.html'))
// })

//rednering admin page
app.get('/api/admin/:token', (req, res) => {
    // const token = req.headers['x-access-token']
    let token = req.params.token
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            res.send('TOKEN NULL OR INVALID')
        } else {
            if (decoded.userRole == userRoles.user) {
                req.userRole = decoded.userRole
                res.sendFile(path.join(__dirname, 'frontend/view/admin.html'))
            } else {
                res.send("ACCESS NOT ALLOWED")
            }
        }
    })
    // console.log(req.userRole + ' IS THE ROLE OF CLIENT');
    // res.json({
    //     message: 'ok'
    // })
    // res.sendFile(path.join(__dirname, 'frontend/view/createAccount.html'))
})

//create account api
app.post('/api/create', user.addUser)

// app.get('/api/login/:username', user.loginUser, ua.userAuthentication, (req, res) => {
//     console.log(req.userRole + ' IS THE ROLE OF CLIENT');
//     res.sendFile(path.join(__dirname, 'frontend/view/admin.html'))
// })

function verifyjwt(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            console.log(`ESSE É O TOKEN ${token}`);
            res.send('ERRO')
        } else {
            req.userRole = decoded.userRole
            next()
        }
    })
}

app.get('/api/login/:username', (req, res) => {
    if (req.params.username == 'gabriel') {
        const token = jwt.sign({userRole: "user"}, SECRET, { expiresIn:300 })
        res.json({
            auth: true,
            token
        })
    } else {
        res.json("ACCESS DENIED")
    }
})

app.listen(3000, () => {
    console.log(`Server running http://localhost:3000`);
})