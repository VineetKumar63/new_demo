import mysql from 'mysql'
let conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tnplab1',
    port:3306
})
conn.connect((err)=>{
    if(err)
        throw err.sqlMessage
    else
        console.log("Connected");
})
export default conn;