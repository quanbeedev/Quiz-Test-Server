const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require("./config/index")
const mysql = require("mysql")
const DataBase = require("./config/database")
const STUDENT_ROUTE = require("./routes/question")
const USER_ROUTE = require("./routes/user")
const DASH_BOARD = require("./routes/dashboard")
const con = require('./database/db')

con.connect(function (err) {
    if (err) {
        // console.log('connecting error', err);
        return;
    }
    app.listen(config.app_port,() =>{
        console.log("App lisson add port 3000")
    })
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.set('views', './views');
app.use(cookieParser());

app.use('/employees', STUDENT_ROUTE)
app.use('/users', USER_ROUTE)
app.use('/admin',DASH_BOARD)

app.get("/", (req,res) =>{
    res.render("pages/home.ejs")
})

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    if(err.status == 404){
        res.render("pages/not-found.ejs")
    }

});



