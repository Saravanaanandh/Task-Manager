import { Toaster as Sonner } from "./components/ui/sonner.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Index from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import useAuthStore from "./store/UseAuthStore.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { useEffect } from "react";
import './index.css'
import { useTaskStore } from "./store/useTaskStore.jsx";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

function App() { 
  const {checkAuth, authUser,isCheckAuth} = useAuthStore() 
  useEffect(()=>{
    checkAuth() 
  },[checkAuth]) 
  if(isCheckAuth && !authUser){
    return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className="size-12 animate-spin"/>
    </div>)
  }
  return (
    <QueryClientProvider client={queryClient}> 
      <TooltipProvider> 
        <Sonner /> 
          <Routes>
            <Route path="/" element={authUser ? <Index /> : <LoginPage/>} />
            <Route path="/register" element={!authUser ? <SignUpPage/> :<Index />}/>
            <Route path="/login" element={!authUser ?<LoginPage/> : <Index />}/>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes> 
          <Toaster/>
      </TooltipProvider> 
  </QueryClientProvider>
  )
}

export default App
