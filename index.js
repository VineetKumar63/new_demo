import conn from "./config.js"
import express from 'express'
let app = express();
app.use(express.json())
////////Register new user//////
app.post("/register", (req, res)=>{
    let data = req.body;
    let sqlQuery = "INSERT INTO user SET ?";
    conn.query(sqlQuery, data, (err, result)=>{
        if(err)
            throw err.sqlMessage
        else
            res.send(result)
    })
})
////////Login/////////////////
app.get("/login", (req, res)=>{
  let uid = req.query.uid
  let pass = req.query.pass
  let sqlQuery = `SELECT uid, name, role, registeredon FROM user WHERE uid='${uid}' AND pasword='${pass}'`;
  conn.query(sqlQuery, (err, result)=>{
    if(err)
        throw err.sqlMessage
    else{
        let output = result;
        if(output.length === 1){
            let sqlQ;
            if(output[0].role === 'admin'){
                sqlQ = "SELECT uid, name, role, registeredon from user";
            }
            else if(output[0].role === 'manager'){
                sqlQ =  "SELECT uid, name, role, registeredon from user WHERE role != 'admin'";
            }
            else{
                sqlQ = `SELECT uid, name, role, registeredon from user WHERE role not in ('admin', 'manager') and uid = '${output[0].uid}'`;
            }
            conn.query(sqlQ, (err, rr)=>{
                if(err)
                    throw err.sqlMessage
                else
                    res.send(rr)
            })
        }
        else{
            res.send({message: "User id and password does not exist!!!"})
        }
    }
  })
})
//////////////
app.listen(4000, ()=>{
    console.log('Server running.........')
})