import bcrypt from 'bcryptjs'
import db from './../config/dbConn.js'
import jwt from 'jsonwebtoken';

export const register = async(req, res)=>{

    const {username, email, password} = req.body;
    if(!username || !email || !password) return res.status(400).json({msg: "provide the valid credentials"})
    if(password.length<6) return res.status(400).json({msg:'password must be length above 6!'})
    const dupSql = 'SELECT * FROM users WHERE email=?'
    db.query(dupSql, [email],async(err, result)=>{
        console.log(result)
        if(err) throw err;
        if(!result.length){
            const encryptPass = await bcrypt.hash(password,10)
            const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?)'
            db.query(sql, [username, email, encryptPass],(err, result)=>{
                if(err) throw err;  
                const token = jwt.sign({userId: result.insertId},process.env.JWT_SECRET,{expiresIn: '30d'})
                res.cookie("jwt",token, {httpOnly:true,maxAge:30*24*60*60*1000,secure:true,sameSite: "Strict"})
                res.status(201).json(result);
            }) 
            return;
        }
        res.status(409).json({msg:'User already with that email'})
    })
}
export const login = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json({msg: "provide the valid credentials"})
    
    const sql = 'SELECT * FROM users WHERE email=?'
    db.query(sql, [email],async(err, result)=>{
        console.log("result inside:"+result[0]) 
        if(err) throw err; 
        const isMatch = await bcrypt.compare(password, result[0]?.password)
        if(!isMatch) return res.status(400).json({msg:"Invalid credentials!"})
        
        const token  = jwt.sign({userId: result[0].id},process.env.JWT_SECRET,{expiresIn:'30d'})
        res.cookie("jwt",token, {httpOnly:true,maxAge:30*24*60*60*1000,secure:true,sameSite: "Strict"})
        res.status(200).json(result)
    })
}
export const logout = async(req, res)=>{

    const user = req.user;
    const sql = "SELECT * FROM users WHERE id = ?"
    db.query(sql,[user.id],(err,result)=>{
        if(err){
            res.status(403).json({msg:"forbidden"})
        }
        res.cookie("jwt","",{httpOnly:true,maxAge:30*24*60*60*1000,secure:true,sameSite: "Strict"})
        res.status(204).json(result)
    }) 
}

export const checkAuth = async (req, res)=>{
    if(!req.user) return res.status(401).json({message:'unauthorized user'})
    res.status(200).json(req.user)
}