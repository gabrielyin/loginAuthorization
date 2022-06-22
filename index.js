const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const user = require('./models/Users')
const ua = require('./middlewares/userAuth')

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
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/view/admin.html'))
})

//rednering admin page
app.get('/api/admin', ua.userAuthentication, (req, res) => {
    console.log(req.userRole + ' IS THE ROLE OF CLIENT');
    res.json({
        message: 'ok'
    })
    // res.sendFile(path.join(__dirname, 'frontend/view/createAccount.html'))
})

//create account api
app.post('/api/create', user.addUser)

app.get('/api/login/:username', user.loginUser)

app.listen(3000, () => {
    console.log(`Server running http://localhost:3000`);
})