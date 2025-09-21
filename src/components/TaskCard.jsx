import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../store/slices/taskSlice';
import { Edit, Trash2, Calendar, Flag } from 'lucide-react';

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  
  const handleStatusChange = (newStatus) => {
    dispatch(updateTask({ id: task._id, updates: { status: newStatus } }));
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'inprogress': return 'bg-blue-100 text-blue-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-gray-600">
            <Edit size={16} />
          </button>
          <button onClick={handleDelete} className="text-gray-400 hover:text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <div className="flex items-center">
          <Flag size={14} className={`mr-1 ${getPriorityColor(task.priority)}`} />
          <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
        </div>
      </div>
      
      {task.dueDate && (
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <Calendar size={14} className="mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
      
      <div className="flex justify-between">
        <select 
          value={task.status} 
          onChange={(e) => handleStatusChange(e.target.value)}
          className="text-xs border rounded px-2 py-1"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        
        <span className="text-xs px-2 py-1 bg-gray-100 rounded capitalize">
          {task.category}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;