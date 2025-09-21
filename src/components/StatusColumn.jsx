import React from 'react';
import TaskCard from './TaskCard';

const StatusColumn = ({ title, status, tasks }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'border-gray-300';
      case 'inprogress': return 'border-blue-300';
      case 'done': return 'border-green-300';
      default: return 'border-gray-300';
    }
  };

  const getHeaderColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'inprogress': return 'bg-blue-100 text-blue-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`border rounded-lg ${getStatusColor(status)} bg-white`}>
      <div className={`p-4 rounded-t-lg ${getHeaderColor(status)}`}>
        <h2 className="font-semibold text-lg">{title}</h2>
        <span className="text-sm">({tasks.length} tasks)</span>
      </div>
      <div className="p-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks</p>
        ) : (
          tasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))
        )}
      </div>
    </div>
  );
};

export default StatusColumn;