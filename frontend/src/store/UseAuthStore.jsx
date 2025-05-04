import {create} from 'zustand'
import axiosInstance from './../config/axios.jsx' 
import toast from 'react-hot-toast'
const useAuthStore = create((set)=>({

    authUser:null,

    isSigningUp:false,
    isLoggingIn:false,
    isLoggingOut:false,
    isupdatingProfile:false,
    isCheckAuth:true, 

    checkAuth: async()=>{
        try{ 
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res?.data}) 
        }catch(err){
            console.log(`Error : ${err.message}`)
            set({authUser:null})
        }finally{
            set({isCheckAuth:false}) 
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try{
            const res = await axiosInstance.post('/auth/register',data)
            console.log(res)
            set({authUser:res.data[0]})  
            toast.success('signup success!')
        }catch(err){
            console.log(`error ${err}`) 
            toast.error('error in sign up')
        }finally{
        set({isSigningUp:false})
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true})
        try{
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser:res.data[0]})
            console.log(`res inside login`,res.data[0]) 
            toast.success('login success!')
        }catch(err){
            console.log(`error inside login ${err}`) 
            toast.error('error in login')

        }finally{
            set({isLoggingIn:false})
        }
    },

    logout:async()=>{
        set({isLoggingOut:true})
        try{ 
            await axiosInstance.delete("/auth/logout")
            set({authUser:null}) 
            toast.success('logout success!')
        }catch(err){
            console.log(err) 
            toast.error('error in logout')

        }finally{
            set({isLoggingOut:false})
        }
    },
    // updateProfile:async(data)=>{ 
    //     set({isupdatingProfile:true})
    //     try{ 
    //         const res = await axiosInstance.put("/auth/update-profile",data)
    //         set({authUser:res.data})
    //         toast.success('profile picture updated')
    //     }catch(err){ 
    //         toast.error(err.response.data.message)
    //     }finally{
    //         set({isupdatingProfile:false})
    //     }
    // },

}))

export default useAuthStore