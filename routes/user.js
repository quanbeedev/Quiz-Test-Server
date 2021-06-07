const route = require('express').Router();
const { renderToView } = require('../utils/childRouting');
const User = require("../models/users")
const { hash , compare } = require("bcrypt");


route.get("/sign-in", async (req, res) =>{
    renderToView( req, res, "pages/sign-in.ejs")
})

route.post("/sign-in", async (req, res) =>{
    let { username , password } = req.body;
    console.log({ username , password})
    User.SignIn(username,password,(err, data) => {
      console.log(data)
      res.send(data)
    })
    if (!req.body){
        res.status( 400 ).send({
          message: "Content can not be empty!"
        });
      }
    

})
route.post("/sign-up", async (req, res) =>{
    let { fullname, username, password } = req.body;
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      let Password = await hash(password,8)
      const user = new User({
        fullname : fullname,
        username : username,
        password : Password
      });
      User.create(user, (err, data) => {
        if (err){
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        }
        else
        res.send(data);
      });
})

route.get("/sign-up", async (req, res) =>{
    renderToView( req, res, "pages/sign-up.ejs")
})



module.exports = route