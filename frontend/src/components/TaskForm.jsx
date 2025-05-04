
import React, { useState, useEffect } from 'react';
import { Button } from './../components/ui/button.jsx';
import { Input } from './../components/ui/input.jsx';
import { Textarea } from './../components/ui/textarea.jsx';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './../components/ui/select.jsx';
import { Calendar } from './../components/ui/calendar.jsx';
import { Popover, PopoverContent, PopoverTrigger } from './../components/ui/popover.jsx';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from './../components/ui/badge.jsx';
import { cn } from './../lib/utils.js';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate:"", 
  });
  
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
        tags: task.tags
      }); 
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  // const handleTagKeyPress = (e) => {
  //   if (e.key === 'Enter' && newTag.trim()) {
  //     e.preventDefault();
  //     addTag();
  //   }
  // };

  // const addTag = () => {
  //   if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
  //     setFormData({
  //       ...formData,
  //       tags: [...(formData.tags || []), newTag.trim()]
  //     });
  //     setNewTag('');
  //   }
  // };

  // const removeTag = (tagToRemove) => {
  //   setFormData({
  //     ...formData,
  //     tags: formData.tags?.filter(tag => tag !== tagToRemove)
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`formdata`,formData)
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className=" space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Task Title <span className="text-destructive">*</span>
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={(e)=> setFormData({...formData, title:e.target.value})}
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={(e)=> setFormData({...formData, description:e.target.value})}
          placeholder="Enter task description"
          rows={3}

        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1">
            Priority <span className="text-destructive">*</span>
          </label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleSelectChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status <span className="text-destructive">*</span>
          </label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Due Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dueDate ? format(formData.dueDate, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              className='bg-white'
              mode="single"
              selected={formData.dueDate}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* <div>
        <label className="block text-sm font-medium mb-1">
          Tags
        </label> */}
        {/* <div className="flex items-center gap-2 mb-2"> */}
          {/* <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="Add tag and press Enter"
            className="flex-1"
          /> */}
          {/* <Button 
            type="button"
            onClick={addTag}
            variant="outline"
          >
            Add
          </Button> */}
        {/* </div> */}
        {/* <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-1">
              {tag}
              <button
                type="button"
                className="ml-2 hover:text-destructive"
                onClick={() => removeTag(tag)}
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div> */}
      {/* </div> */}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
