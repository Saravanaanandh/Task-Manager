
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './../components/ui/select.jsx';

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTasks = tasks?.filter(task => {
    if (statusFilter !== 'all' && task.status !== statusFilter) {
      return false;
    }
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
      return false;
    }
    return true;
  });

  // Sort tasks: first by status (todo, in-progress, completed), then by priority (high, medium, low)
  const sortedTasks =  filteredTasks?.sort((a, b) => {
    // Sort by status
    const statusOrder = { todo: 0, 'in-progress': 1, completed: 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    // Then sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold">Tasks {tasks?.length > 0 && `(${sortedTasks?.length})`}</h2>
        
        <div className="flex flex-wrap gap-2">
          <div className="w-[140px]">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-[140px]">
            <Select
              value={priorityFilter}
              onValueChange={(value) => setPriorityFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {sortedTasks?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No tasks found.</p>
          <p className="text-sm text-muted-foreground mt-2">
            {tasks?.length > 0
              ? "Try adjusting your filters."
              : "Create your first task to get started!"
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTasks?.map((task,index) => (
            <TaskCard
              key={task?.id || index}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
