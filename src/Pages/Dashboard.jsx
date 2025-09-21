import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/slices/taskSlice';
import StatusColumn from '../components/StatusColumn';
import FilterBar from '../components/FilterBar';
import AddTaskModal from '../components/AddTaskModal';
import { Plus, Calendar, User, Bell, Search, Filter, ChevronDown, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { filteredTasks, isLoading } = useSelector(state => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    overdue: 0
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (filteredTasks) {
      const total = filteredTasks.length;
      const completed = filteredTasks.filter(task => task.status === 'done').length;
      const inProgress = filteredTasks.filter(task => task.status === 'inprogress').length;
      const overdue = filteredTasks.filter(task => 
        new Date(task.dueDate) < new Date() && task.status !== 'done'
      ).length;
      
      setStats({ total, completed, inProgress, overdue });
    }
  }, [filteredTasks]);

  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'inprogress');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <header className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Quick search..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <span className="pr-2 text-sm font-medium">John Doe</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total Tasks</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <TrendingUp size={12} className="inline mr-1 text-green-500" />
              <span className="text-green-500">12%</span> from last week
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">In Progress</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.inProgress}</h3>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Clock size={20} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <TrendingUp size={12} className="inline mr-1 text-green-500" />
              <span className="text-green-500">5%</span> from last week
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.completed}</h3>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <TrendingUp size={12} className="inline mr-1 text-green-500" />
              <span className="text-green-500">8%</span> from last week
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Overdue</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.overdue}</h3>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <AlertCircle size={20} className="text-red-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <TrendingUp size={12} className="inline mr-1 text-red-500" />
              <span className="text-red-500">3%</span> from last week
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Task Board</h2>
              <p className="text-gray-500">Manage your team's tasks and projects</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter size={18} className="mr-2" />
                Filter
                <ChevronDown size={16} className="ml-2" />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md hover:shadow-lg"
              >
                <Plus size={20} className="mr-2" />
                Add Task
              </button>
            </div>
          </div>

          <FilterBar />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <StatusColumn title="To Do" status="todo" tasks={todoTasks} />
            <StatusColumn title="In Progress" status="inprogress" tasks={inProgressTasks} />
            <StatusColumn title="Done" status="done" tasks={doneTasks} />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <User size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">John Doe</span> created a new task "Design Homepage"
                  </p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock size={12} className="mr-1" />
                    2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;