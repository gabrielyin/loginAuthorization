const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const user = require('./models/Users')
const session = require('express-session')
const mid = require('./middlewares/userAuth')


const userRoles = {
    admin: 'admin',
    user: 'user'
}

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend/public')))
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}))

user.createTableUsers();

//rendering login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/index.html'))
})

//rendering create account page
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/createAccount.html'))
})

//rendering admin page
app.get('/admin',mid.userAuthentication , (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/admin.html'))
})

//create account api
app.post('/api/create', user.addUser)

app.get('/api/login/:username', user.loginUser)

app.listen(3000, () => {
    console.log(`Server running http://localhost:3000`);
})