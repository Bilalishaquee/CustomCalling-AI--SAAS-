import React, { useState } from 'react';
import { Search, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const TopBar: React.FC = () => {
  const { user, company, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProjectMenu, setShowProjectMenu] = useState(false);

  const projects = [
    { id: '1', name: 'Customer Support Flow' },
    { id: '2', name: 'Sales Qualification' },
    { id: '3', name: 'Appointment Booking' }
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      {/* Left Section - Project Selector */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
          >
            <span className="font-medium">Customer Support Flow</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showProjectMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-2">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                  >
                    {project.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search flows, variables, or documentation..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>
      </div>

      {/* Right Section - User Menu */}
      <div className="flex items-center space-x-4">
        {/* Credits Display */}
        <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-300">{company?.credits || 0} credits</span>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <img
              src={user?.avatar || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150`}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-left">
              <div className="text-sm font-medium text-white">{user?.name}</div>
              <div className="text-xs text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showUserMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-2 border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-red-300 hover:bg-red-900 hover:text-red-100 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;