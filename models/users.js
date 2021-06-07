
const { compare, hash } = require('bcrypt')
const con = require('../database/db')

const User = function(user) {
    this.fullname = user.fullname
    this.username = user.username
    this.password = user.password
}

User.create = async (newUser, result) => {
  
    let sql = `SELECT username FROM user where username = "${newUser.username}"`
      await con.query(sql, async function(err,data){
      if(data.length !== 0){
        return result(err);
      } else {
       await con.query("INSERT INTO user SET ?", newUser, (err,data) => {
        if (err) {
          result(err, null);
          return;
        }else{
          return result(null,{data:"sucess"})
        }
    })
  }
  });
  };

  User.SignIn = async (username,password, result) => {
    let sql = `SELECT password FROM user WHERE username = "${username}"`
    await con.query(sql, async (err, data) =>{
      // console.log(err)
      if(data.length == 0)
      {
        return result(null,{err :"User not Exist" })
      }else{
        let checkPass = await compare(password, data[0].password)
        if(checkPass == false){
          return result(null,{err : "Wrong Password"})
        }
        return result(null,{data : "susscess"})
      }
    })
  };

  module.exports = User