
import React, { useState } from 'react';
import { Input } from './ui/input.jsx';
import { Button } from './ui/button.jsx';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar.jsx';
import { 
  Bell, 
  Search,
  Plus,
  LogOut
} from 'lucide-react';
import useAuthStore from './../store/UseAuthStore.jsx';

const Header = ({ onCreateTask, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {authUser,logout} = useAuthStore()
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="w-full bg-background border-b border-border py-4 px-6 flex items-center justify-between">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search tasks..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="default" 
          size="sm" 
          className="gap-2 bg-blue-400"
          onClick={onCreateTask}
        >
          <Plus size={16} />
          <span>New Task</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative border-[1px]">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{authUser?.name?.split(' ') 
    .map(part => part[0]?.toUpperCase())
    .join('')}</AvatarFallback>
        </Avatar>
        <Button  onClick={logout}>
          <LogOut/>
        </Button>
      </div>
    </header>
  );
};

export default Header;
