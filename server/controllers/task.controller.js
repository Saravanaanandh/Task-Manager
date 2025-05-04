import db from './../config/dbConn.js'

export const getAllTasks = async(req, res)=>{
    console.log("userID:",req.user)
    const getQuery = "SELECT * FROM tasks"
    db.query(getQuery, (err,result)=>{
        console.log(result)
        if(err){
          res.status(403).json({msg:"task fetching error"})
        }
        if(!result.length>0) return res.status(200).json({msg:'No tasks are there!'})
        res.status(200).json({result})
    }) 
}
export const getSingleTask = async(req, res)=>{
    const {id:taskId} = req.params;
    const getQuery = "SELECT * FROM tasks WHERE id = ?"
    db.query(getQuery,[taskId], (err,result)=>{
        if(err){
          res.status(403).json({msg:"task fetching error"})
        }
        if(!result.length) return res.status(200).json({msg:'tasks not found!'})
        res.status(200).json(result)
    }) 
}
export const createNewTask = async(req, res)=>{
    const {title, description, priority, status, dueDate} = req.body;
    const {id:userId} = req.user
    console.log("userID:",req.user)
    if(!title || !description || !dueDate ) return res.status(400).json({msg:"please give task details"})
    
    const insertQuery = 'INSERT INTO tasks (title, description, due_date,user_id,priority, status ) VALUES (?,?,?,?,?,?)'
    db.query(insertQuery, [title, description, new Date(dueDate).toISOString().split('T')[0], userId, priority,status], (err, result) => {
      if (err) {
          console.log(err);
          return res.status(403).json({ msg: "Task insertion error" });
      }
  
      const insertedId = result.insertId; // <-- This is the correct way to access the inserted ID
  
      db.query("SELECT * FROM tasks WHERE id = ?", [insertedId], (err, result) => {
          if (err) {
              console.log(err);
              return res.status(500).json({ msg: "Error fetching inserted task" });
          }
  
          console.log(result);
          res.status(201).json(result);
      });
  });
  
}
export const updateTask = async (req, res) => {
    const { status, priority, due_date } = req.body;
    const { id: taskId } = req.params;

    const fields = [];
    const values = [];
  
    if (status !== undefined) {
      fields.push('status = ?');
      values.push(status);
    }
  
    if (priority !== undefined) {
      fields.push('priority = ?');
      values.push(priority);
    }
  
    if (due_date !== undefined) {
      fields.push('due_date = ?');
      values.push(due_date);
    }
  
    if (fields.length === 0) {
      return res.status(400).json({ msg: 'No fields provided for update.' });
    }
  
    const updateQuery = `UPDATE tasks SET status = ?, updated = ? WHERE id = ?`;
    values.push(taskId); 
  
    db.query(updateQuery, [status,new Date().toISOString().split('T')[0], taskId], (err, result) => {
      console.log(result)
      if (err) {
        return res.status(500).json({ msg: 'Update error', error: err });
      }
      res.status(200).json({ msg: 'Task updated successfully', result });
    });
  };
  
export const deleteTask = async(req, res)=>{
    const {id:taskId} = req.params
    const deleteQuery = "DELETE FROM tasks WHERE id = ?" 
    db.query(deleteQuery, [taskId],(err, result)=>{
        if(err){
            res.status(403).json({msg:"deletion error"})
        }
        res.status(204).json({msg:"task deleted!"})
    }) 
}
