
import React, { useState } from 'react';
import { cn } from './../lib/utils.js';
import { Button } from './../components/ui/button.jsx';
import { 
  CheckSquare, 
  Clock, 
  ListTodo, 
  ChevronLeft, 
  ChevronRight, 
  CalendarRange,
  Tag,
  Settings,
  Home
} from 'lucide-react';

const Sidebar = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        'h-screen bg-gray-800  text-white transition-all duration-300 flex flex-col',
        collapsed ? 'w-[60px]' : 'w-[250px]',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-6">
        {!collapsed && (
          <h2 className="text-xl font-bold text-sidebar-foreground">TaskMaster</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-2">
          <SidebarItem icon={Home} label="Dashboard" isCollapsed={collapsed} isActive />
          <SidebarItem icon={ListTodo} label="All Tasks" isCollapsed={collapsed} />
          <SidebarItem icon={Clock} label="Today" isCollapsed={collapsed} />
          <SidebarItem icon={CheckSquare} label="Completed" isCollapsed={collapsed} />
          <SidebarItem icon={CalendarRange} label="Calendar" isCollapsed={collapsed} />
          <SidebarItem icon={Tag} label="Tags" isCollapsed={collapsed} />
        </nav>
      </div>

      <div className="mt-auto p-4">
        <SidebarItem icon={Settings} label="Settings" isCollapsed={collapsed} />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, isCollapsed, isActive }) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
      )}
    >
      <Icon size={20} />
      {!isCollapsed && <span>{label}</span>}
    </Button>
  );
};

export default Sidebar;
