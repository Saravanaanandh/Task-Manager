import { useState } from "react"
import useAuthStore from "./../store/UseAuthStore.jsx"
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react" 
import { toast } from "sonner"
import { Link } from "react-router-dom"
// import {Link} from 'react-router'

const LoginPage = () => {
  const {login} = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ 
    email:"",
    password:""
  })

  const validatedForm = ()=>{ 
    if(!formData.email) return toast.error('email is required')
    if(formData.password.length<6) return toast.error('password length must be atleast 6 characters')
    if(!formData.password) return toast.error('password is required') 

    return true
  }

  const handleSubmit = (e)=>{
    e.preventDefault() 
    const success = validatedForm() 
    
    if(success === true) login(formData)  
  }
    return (
      <div className="h-screen pt-1 w-full bg-gray-900 flex flex-1 items-center justify-center text-blue-500 max-sm:text-[12px] overflow-hidden">
        <div className="h-full flex  flex-1 flex-col items-center justify-center overflow-y-scroll  gap-10 max-sm:gap-5">
          <div className="text-center space-y-3 max-sm:space-y-1">
            <div className="w-12 h-12 max-sm:size-8 rounded-full mx-auto flex  flex-1 items-center justify-center"> 
              <MessageSquare className="text-blue-300 size-6 max-sm:size-4"/>
            </div>
            <h2>Login</h2>
            <p>Get start with your free account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-5/5 flex flex-col items-center justify-center gap-5"> 
                
                <div className=" border-blue-300 border-b-[1px] w-auto flex gap-1 items-center px-1 sm:gap-2"> 
                  <Mail className="size-3.5 mr-1 text-blue-200 max-sm:size-3"/>
                  <input
                  className="outline-none border-none py-0.5 text-white"
                  type="email" 
                  placeholder="email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  /> 
                </div> 
                <div className=" border-blue-300 border-b-[1px] w-auto flex  items-center justify-between "> 
                  <div className="flex items-center gap-1 ">
                    <Lock className="size-3.5 text-blue-200 max-sm:size-3"/>
                    <input
                    className="outline-none border-none py-0.5 text-white"
                    type={showPassword? "text":"password"} 
                    placeholder="password"
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                    />
                  </div>
                  <div className="cursor-pointer" onClick={()=>{setShowPassword(!showPassword)}}>
                  {
                    showPassword ? 
                      <Eye className="size-3.5"/> : <EyeOff className="size-3.5"/>
                  }
                  </div>
                </div>  
              <button 
                className="mt-2 cursor-pointer w-5/5 border-[1px] rounded-[5px] py-1 text-amber-400 hover:bg-amber-300 hover:text-black transition-colors duration-200" 
                type="submit" 
                onClick={handleSubmit}
              >
                <span>Login</span> 
              </button>
            </div>
          </form>
          <div className="text-[10px] sm:text-[16px]">
            <p>Create an Account?
            <Link to="/register"><span className="underline"> signup</span></Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default LoginPage
  