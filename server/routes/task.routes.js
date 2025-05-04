import express from 'express'
import { createNewTask, deleteTask, getAllTasks, getSingleTask, updateTask } from '../controllers/task.controller.js'

const router = express.Router()

router.get('/',getAllTasks)
router.get('/:id',getSingleTask)
router.post('/', createNewTask)
router.put('/:id',updateTask)
router.delete('/:id',deleteTask)

export default router