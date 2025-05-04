
import toast from "react-hot-toast";
import axiosInstance from "./../config/axios.jsx";
import { create } from "zustand";

export const useTaskStore = create((set,get)=>({
    tasks:[],
    addTask:async(taskData)=>{
        try{
            const res = await axiosInstance.post('/tasks/',taskData)
            set({tasks:[...get().tasks,res.data[0]]})
            toast.success("task created")
        }catch(err){
            console.log(err) 
            toast.error("something wrong") 
        }
    },
    allTasks:async()=>{
        try{
            const res = await axiosInstance.get('/tasks/')
            console.log(res.data.result)
            set({tasks:res.data.result}) 
            console.log("tasks",get().tasks)
        }catch(err){
            console.log("error occured:",err) 
        }
    },
    updateTask:async(taskId,taskData)=>{
        console.log(taskId,taskData)
        try{
            const res = await axiosInstance.put(`/tasks/${taskId}`,taskData) 
            const otherTasks = get().tasks.filter(task => task.id !== taskId)
            const Task = get().tasks.find(task => task.id === taskId)
            const updatedTask = {...Task, status:taskData.status}
            set({tasks:[...otherTasks,updatedTask]}) 
            toast.success("task updated")

        }catch(err){
            console.log(err)
            toast.error("something wrong")
        }
    },
    deleteTask:async(taskId)=>{
        try{
            const res = await axiosInstance.delete(`/tasks/${taskId}`) 
            const otherTasks = get().tasks.filter(task => task.id !== taskId)
            set({tasks:otherTasks})
            toast.success("task deleted")

        }catch(err){
            console.log(err)
            toast.error("something wrong")
        }
    },
    filterTasks:async(status, searchTerm, priority)=>{
        return get().tasks?.filter(task => {
            // Filter by status if provided
            if (status && task.status !== status) {
              return false;
            }
            
            // Filter by priority if provided
            if (priority && task.priority !== priority) {
              return false;
            }
            
            // Search in title and description if searchTerm is provided
            if (searchTerm) {
              const searchTermLower = searchTerm.toLowerCase();
              return (
                task.title.toLowerCase().includes(searchTermLower) ||
                task.description.toLowerCase().includes(searchTermLower) ||
                task.tags?.some(tag => tag.toLowerCase().includes(searchTermLower))
              );
            }
            
            return true;
          });
    }
}))