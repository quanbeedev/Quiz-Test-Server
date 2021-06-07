
const con = require("../database/db")


const Role = function(role){
    this.role_name = role.role_name,
    this.role_description = role.role_description
}

Role.Create = async (newRole, result)=>{

    let { role_name } = newRole
    console.log({ role:newRole })
     con.query( ` SELECT role_name FROM role WHERE role_name = "${role_name}"`, (err, data) => {
        if(err){
            return result(null,{error : 'can not find'})
        }
        if(data.length > 0){
            return result(null, {data : 'exam exist'})
        }

        con.query(`INSERT INTO role SET ?`,newRole ,(err, data)=>{
            if(err)
            {
                return result(err,null)
            }else{
                return result(null, {data : 'sucess'})
            }
           
        })
    })
     
}
module.exports = Role