import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield, 
  Mail, 
  Phone,
  Building,
  Calendar,
  MoreVertical,
  UserCheck,
  UserX,
  Key,
  Download
} from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { useTranslation } from '../utils/translations';
import { User, Company } from '../types';

const UsersPage: React.FC = () => {
  const { language } = useSettingsStore();
  const t = useTranslation(language);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState<string | null>(null);

  // Mock data for users
  const [users, setUsers] = useState<(User & { company: string; lastLogin: string; status: 'active' | 'inactive' | 'suspended' })[]>([
    {
      id: '1',
      email: 'admin@acme.com',
      name: 'John Smith',
      role: 'master_admin',
      companyId: 'acme-corp',
      company: 'Acme Corp',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      mfaEnabled: true,
      lastLogin: '2024-01-20T10:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      email: 'sarah.johnson@techstart.com',
      name: 'Sarah Johnson',
      role: 'company_admin',
      companyId: 'techstart',
      company: 'TechStart Inc',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      mfaEnabled: true,
      lastLogin: '2024-01-20T09:15:00Z',
      status: 'active'
    },
    {
      id: '3',
      email: 'mike.chen@innovate.co',
      name: 'Mike Chen',
      role: 'company_admin',
      companyId: 'innovate',
      company: 'Innovate Co',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      mfaEnabled: false,
      lastLogin: '2024-01-19T16:45:00Z',
      status: 'active'
    },
    {
      id: '4',
      email: 'lisa.wong@dataflow.io',
      name: 'Lisa Wong',
      role: 'viewer',
      companyId: 'dataflow',
      company: 'DataFlow Solutions',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      mfaEnabled: true,
      lastLogin: '2024-01-20T08:20:00Z',
      status: 'active'
    },
    {
      id: '5',
      email: 'robert.davis@cloudtech.net',
      name: 'Robert Davis',
      role: 'company_admin',
      companyId: 'cloudtech',
      company: 'CloudTech Networks',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
      mfaEnabled: true,
      lastLogin: '2024-01-18T14:30:00Z',
      status: 'inactive'
    },
    {
      id: '6',
      email: 'emma.taylor@startup.com',
      name: 'Emma Taylor',
      role: 'viewer',
      companyId: 'startup',
      company: 'Startup Ventures',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
      mfaEnabled: false,
      lastLogin: '2024-01-17T11:15:00Z',
      status: 'suspended'
    }
  ]);

  const companies = [
    { id: 'acme-corp', name: 'Acme Corp' },
    { id: 'techstart', name: 'TechStart Inc' },
    { id: 'innovate', name: 'Innovate Co' },
    { id: 'dataflow', name: 'DataFlow Solutions' },
    { id: 'cloudtech', name: 'CloudTech Networks' },
    { id: 'startup', name: 'Startup Ventures' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesCompany = !selectedCompany || user.companyId === selectedCompany;
    return matchesSearch && matchesRole && matchesCompany;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'master_admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'company_admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'viewer':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'activate':
            return { ...user, status: 'active' as const };
          case 'suspend':
            return { ...user, status: 'suspended' as const };
          case 'deactivate':
            return { ...user, status: 'inactive' as const };
          default:
            return user;
        }
      }
      return user;
    }));
    setShowUserMenu(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
    setShowUserMenu(null);
  };

  return (
    <div className={`h-full overflow-y-auto ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="bg-gray-950 min-h-full">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {t('users')}
              </h1>
              <p className="text-gray-400">
                Manage users across all companies and organizations
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add User</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {users.length}
                  </div>
                  <div className="text-sm text-gray-400">Total Users</div>
                </div>
                <Shield className="w-8 h-8 text-teal-500" />
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {users.filter(u => u.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {companies.length}
                  </div>
                  <div className="text-sm text-gray-400">Companies</div>
                </div>
                <Building className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {users.filter(u => u.mfaEnabled).length}
                  </div>
                  <div className="text-sm text-gray-400">MFA Enabled</div>
                </div>
                <Key className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users by name, email, or company..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>
              
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="">All Roles</option>
                <option value="master_admin">Master Admin</option>
                <option value="company_admin">Company Admin</option>
                <option value="viewer">Viewer</option>
              </select>

              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="">All Companies</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>

              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      MFA
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-gray-400 text-sm">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-md ${getRoleColor(user.role)}`}>
                          {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{user.company}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-md ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.mfaEnabled ? (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 rounded-md">
                            Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 rounded-md">
                            Disabled
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-300 text-sm">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(user.lastLogin).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="relative">
                          <button
                            onClick={() => setShowUserMenu(showUserMenu === user.id ? null : user.id)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          {showUserMenu === user.id && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                              <div className="p-2">
                                <button
                                  onClick={() => setSelectedUser(user)}
                                  className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                  <span>Edit User</span>
                                </button>
                                
                                {user.status === 'active' ? (
                                  <button
                                    onClick={() => handleUserAction('suspend', user.id)}
                                    className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                                  >
                                    <UserX className="w-4 h-4" />
                                    <span>Suspend</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleUserAction('activate', user.id)}
                                    className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                                  >
                                    <UserCheck className="w-4 h-4" />
                                    <span>Activate</span>
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => {/* Reset password logic */}}
                                  className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
                                >
                                  <Key className="w-4 h-4" />
                                  <span>Reset Password</span>
                                </button>
                                
                                <hr className="my-2 border-gray-700" />
                                
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="w-full flex items-center space-x-2 px-3 py-2 text-red-300 hover:bg-red-900 hover:text-red-100 rounded-md transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Delete User</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No users found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first user to get started'}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              >
                Add New User
              </button>
            </div>
          )}

          {/* Create User Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-lg border border-gray-800 w-full max-w-md">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-lg font-semibold text-white">Add New User</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role
                    </label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600">
                      <option value="viewer">Viewer</option>
                      <option value="company_admin">Company Admin</option>
                      <option value="master_admin">Master Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600">
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-800 flex space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Add user logic here
                      setShowCreateModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                  >
                    Create User
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-lg border border-gray-800 w-full max-w-md">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-lg font-semibold text-white">Edit User</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedUser.name}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={selectedUser.email}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role
                    </label>
                    <select 
                      defaultValue={selectedUser.role}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="company_admin">Company Admin</option>
                      <option value="master_admin">Master Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked={selectedUser.mfaEnabled}
                        className="rounded bg-gray-800 border-gray-700 text-teal-600 focus:ring-teal-600 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-300">Enable MFA</span>
                    </label>
                  </div>
                </div>
                
                <div className="p-6 border-t border-gray-800 flex space-x-3">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Update user logic here
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;