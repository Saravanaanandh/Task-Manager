import mysql from 'mysql2'

const conn = mysql.createConnection({
    host:"localhost",
    port:3307,
    user:"user",
    password:"password",
    database:"tasksDB",
})

export const connectDB = async()=>{
    conn.connect(err => {
        if (err) throw err;
        console.log('MySQL Connected!');
    });
}
export default conn;