import express from "express"
import { checkAuth, login, logout, register } from "../controllers/auth.controller.js"
import verifyJWT from './../middleware/auth.middleware.js'

const router = express.Router()

router.get('/check',verifyJWT,checkAuth)
router.post('/register',register)
router.post('/login',login)
router.delete('/logout',verifyJWT,logout)

export default router;