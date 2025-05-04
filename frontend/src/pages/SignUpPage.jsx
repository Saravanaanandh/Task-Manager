import { useState } from "react"
import useAuthStore from "./../store/UseAuthStore.jsx"
import { Eye, EyeOff, Lock, Mail, MessageSquare, User2 } from "lucide-react" 
import { toast } from "sonner"
import { Link } from "react-router-dom" 

const SignUpPage = () => {

    const {signup} = useAuthStore()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
      username:"",
      email:"",
      password:""
    })

    const validatedForm = ()=>{
      if(!formData.username) return toast.error('username is required')
      if(!formData.email) return toast.error('email is required')
      if(formData.password.length<6) return toast.error('password length must be atleast 6 characters')
      if(!formData.password) return toast.error('password is required') 

      return true
    }

    const handleSubmit = (e)=>{
      e.preventDefault() 
      const success = validatedForm() 

      if(success === true) signup(formData)  
    }
    return (
      <div className="h-screen w-full pt-2 bg-gray-900 flex flex-1 items-center justify-center text-blue-500 max-sm:text-[12px]">
        <div className="h-full flex flex-col justify-center items-center gap-10 max-sm:gap-5">
          <div className="text-center space-y-3 max-sm:space-y-1">
            <div className="w-12 h-12 max-sm:size-8  rounded-full mx-auto flex items-center justify-center"> 
              <MessageSquare className="text-blue-300 size-4 sm:size-6"/>
            </div>
            <h2>create Account</h2>
            <p>Get start with your free account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 items-center w-5/5 max-sm:gap-3"> 
                <div className="pr-2 px-1 gap-1 sm:gap-2 border-blue-300 border-b-[1px] w-auto flex items-center"> 
                  <User2 className="size-3.5 text-blue-200"/>
                  <input
                  className="outline-none  border-none py-0.5 text-white"
                  type="text" 
                  placeholder="username"
                  value={formData.username}
                  onChange={(e)=>setFormData({...formData,username:e.target.value})}
                  /> 
                </div> 
                <div className="pr-2 px-1 gap-1 sm:gap-2 border-blue-300 border-b-[1px] w-auto flex items-center"> 
                  <Mail className="size-3.5 text-blue-200"/>
                  <input
                  className="outline-none  text-sidebar-foreground border-none py-0.5 text-white"
                  type="email" 
                  placeholder="email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  /> 
                </div> 
                <div className="gap-1 sm:gap-2 border-blue-300 border-b-[1px] w-auto flex items-center justify-between"> 
                  <div className="flex items-center gap-1">
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
                className="mt-2 cursor-pointer w-4/5 border-[1px] rounded-[5px] py-1 text-amber-400 hover:bg-amber-300 hover:text-black transition-colors duration-200" 
                type="submit" 
                onClick={handleSubmit}
              >
                <span>Create Account</span> 
              </button>
            </div>
          </form>
          <div className="text-[10px] sm:text-[14px]">
            <p>Already have an account?
            <Link to="/login"><span className="underline"> login</span></Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default SignUpPage
  