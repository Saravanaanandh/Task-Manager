import jwt from 'jsonwebtoken'
import db from './../config/dbConn.js'

const verifyJWT = (req, res, next)=>{ 
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(401).json({msg:'Unauthorized user'})
    
    const token = cookies.jwt
    const decode = jwt.verify(
        token,
        process.env.JWT_SECRET
    )
    console.log("decoded Id",decode.userId)
    const sql = 'SELECT * FROM users WHERE id=?'
    db.query(sql, [decode.userId],(err, result)=>{
        if(err){
            res.status(403).json({msg:'unauthorized user'})
        }
        console.log("Result:",result)
        req.user = result[0]
        next()
    })
}

export default verifyJWT