
const con = require("../database/db")

const Exam = function(exam){
    this.exam_name = exam.exam_name,
    this.exam_description = exam.exam_description
}

Exam.Create = async (newExam, result)=>{

    let { exam_name } = newExam
     con.query( ` SELECT exam_name FROM exam WHERE exam_name = "${exam_name}"`, (err, data) => {
        if(err){
            return result(null,{error : 'can not find'})
        }
        // console.log({data})
        if(data.length > 0){
            return result(null, {data : 'exam exist'})
        }

        con.query(`INSERT INTO exam SET ?`,newExam ,(err, data)=>{
            if(err)
            {
                return result(err,null)
            }else{
                return result(null, {data : 'sucess'})
            }
           
        })
    })
     
}

Exam.getList = async ( ) =>{
   await con.query(`SELECT * FROM exam`,( err, data) =>{
        if(err){
            result(null, {err: "can not get list"})
        }else{
            console.log({data})
            return data
        }
        return data
    })
   
}
module.exports = Exam