const route = require("express").Router();
const { renderToView } = require("../utils/childRouting")
const Exam = require("../models/exam");
const { render } = require("ejs");
const Role = require("../models/role");
route.get("/",(req, res) =>{
    renderToView( req, res, 'dashboard/pages/manager-user.ejs')
})

/*
============================== ADD ROLE ==========================
*/

route.get("/add-role", async (req, res) =>{
    renderToView(req, res , "dashboard/pages/add-role.ejs")
})
route.post("/add-role", async (req, res) =>{
    let { role_name, role_description} = req.body;
    console.log({ role_name, role_description})
    const newRole = new Role({
        role_name : role_name,
        role_description : role_description
    })
    Role.Create(newRole, (err , data) =>{
        res.send(data)
    })
})


route.get("/manager-quiz",(req, res) =>{
    renderToView( req, res, 'dashboard/pages/manager-quiz.ejs')
})

/*
============================== ADD EXAM ==========================
*/

route.get("/add-exam", async (req, res) =>{
   let listExam = await Exam.getList()
   console.log({listExam:listExam})
    renderToView(req, res , "dashboard/pages/add-exam.ejs")
})
route.post('/add-exam', (req, res)=>{
    let { examname, examdescription } = req.body
    const newExam = new Exam({
        exam_name : examname,
        exam_description : examdescription
    })
    Exam.Create( newExam,( err, data)=>{
        res.send( data ) 
    })
})

/*
============================== ADD QUESTION ==========================
*/

route.get("/add-question", async (req, res) =>{
    // let listQuestion = await Exam.getList()
    // console.log({listExam:listExam})
     renderToView(req, res , "dashboard/pages/add-question.ejs")
 })
 
//  route.post('/add-exam', (req, res)=>{
//      let {examdescription, examname} = req.body
//      const newExam = new Exam({
//          exam_name : examname,
//          exam_description : examdescription
//      })
//      Exam.Create( newExam,( err, data)=>{
//          res.send( data ) 
//      })
//  })

module.exports = route