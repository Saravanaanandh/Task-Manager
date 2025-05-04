
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './../components/ui/dialog.jsx';
import Sidebar from './../components/Sidebar.jsx';
import Header from './../components/Header.jsx';
// import TaskList from './../components/TaskList.jsx';
import TaskForm from './../components/TaskForm.jsx';
import { useTaskStore } from './../store/useTaskStore.jsx';
import TaskCard from './../components/TaskCard.jsx';

const Index = () => {

  const { tasks,allTasks, addTask, updateTask, deleteTask, filterTasks } = useTaskStore();
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTasks = searchTerm ? filterTasks(undefined, searchTerm) : tasks;
  useEffect(()=>{
    allTasks()
  },[allTasks])
  console.log("tasks inside home:", tasks)
  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowTaskDialog(true);
  };

  const handleEditTask = (id) => {
    setSelectedTask(id);
    setShowTaskDialog(true);
  };

  const handleSaveTask = (taskData) => {
    if (selectedTask) {
      updateTask(selectedTask, taskData);
    } else {
      addTask(taskData);
    }
    setShowTaskDialog(false);
  };

  const handleStatusChange = (id, status) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { status });
    }

  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Get the task being edited, if any
  const taskBeingEdited = selectedTask ? tasks.find(t => t.id === selectedTask) : undefined;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onCreateTask={handleCreateTask}
          onSearch={handleSearch}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* {!tasks?.length ? (<TaskList 
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />):(
            <div>
              No Tasks are There.
            </div>
          )} */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks ? (tasks?.map((task,index) => (
            <TaskCard
              key={task?.id || index}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))):(
            <div>
              No Tasks are There.
            </div>
          )} 
        </div>
        </main>
      </div>

      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="bg-white sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {selectedTask ? 'Edit Task' : 'Create New Task'}
            </DialogTitle>
          </DialogHeader>
          <TaskForm 
            // task={taskBeingEdited}
            onSave={handleSaveTask}
            onCancel={() => setShowTaskDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
