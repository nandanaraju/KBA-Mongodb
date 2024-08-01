const express = require('express');
const session = require('express-session')

const app = express();

const pageroute = require('./src/routes/pageroutes')

const loginroute = require('./src/routes/loginroutes')

const apiroute = require('./src/routes/apiroutes')

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));


app.use('/', pageroute, loginroute, apiroute);


app.listen(3001, () => {
    console.log("The server is starting at port 3001")
})