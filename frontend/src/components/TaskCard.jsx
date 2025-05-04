
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter } from './ui/card.jsx';
import { Badge } from './ui/badge.jsx';
import { cn } from '../lib/utils.js';
import {
  Clock,
  CalendarRange,
  MoreHorizontal,
  Check,
  Pencil,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu.jsx';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const priorityColor = {
    low: 'bg-task-low text-emerald-900',
    medium: 'bg-task-medium text-amber-900',
    high: 'bg-task-high text-rose-900'
  };

  const statusLabels = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  const statusColors = {
    'todo': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800'
  };
  console.log(task); //[object object]
  console.log(typeof task.description);//string
  
  return (
    <Card className={cn(
      'task-card-transition',
      task?.status === 'completed' ? 'opacity-70' : 'opacity-100',
      'hover:shadow-md'
    )}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 flex-wrap mb-2">
            <Badge className={statusColors[task.status]}>{statusLabels[task.status]}</Badge>
            <Badge className={priorityColor[task.priority]}>{task.priority}</Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-black rounded-full">
                <MoreHorizontal size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white' align="end">
              {/* <DropdownMenuItem onClick={() => onEdit(task?.id)}>
                <Pencil size={16} className="mr-2" />
                Edit
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => onDelete(task.id)}>
                <Trash2 size={16} className="mr-2" />
                Delete
              </DropdownMenuItem>
              {task.status !== 'todo' && (
                <DropdownMenuItem onClick={() => onStatusChange(task.id, 'todo')}>
                  <Clock size={16} className="mr-2" />
                  Mark as To Do
                </DropdownMenuItem>
              )}
              {task.status !== 'in-progress' && (
                <DropdownMenuItem onClick={() => onStatusChange(task.id, 'in-progress')}>
                  <Clock size={16} className="mr-2" />
                  Mark as In Progress
                </DropdownMenuItem>
              )}
              {task.status !== 'completed' && (
                <DropdownMenuItem onClick={() => onStatusChange(task.id, 'completed')}>
                  <Check size={16} className="mr-2" />
                  Mark as Completed
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h3 className={cn(
          "font-medium text-lg mb-2", 
          task.status === 'completed' && "line-through text-task-completed"
        )}>
          {task.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{task.description}</p>
        
        {/* <div className="flex flex-wrap gap-1 mt-2">
          {task?.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div> */}
      </CardContent>
      
      <CardFooter className="px-4 py-2 border-t flex justify-between text-xs text-muted-foreground">
        {task.due_date && (
          <div className="flex items-center gap-1">
            <CalendarRange size={14} />
            <span>Due: {format(new Date(task.due_date), 'MMM d, yyyy')}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>Updated: {format(new Date(task.updated), 'MMM d')}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
