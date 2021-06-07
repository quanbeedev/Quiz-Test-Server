const route = require("express").Router();
const { renderToView }  = require("../utils/childRouting")

route.get("/" ,(req, res) =>{
    renderToView(req, res , 'pages/quiz')
})
route.get("/home" ,(req, res) =>{
  
    renderToView(req, res , 'pages/home')
})


module.exports = route