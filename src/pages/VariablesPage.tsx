import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Variable } from '../types';

const VariablesPage: React.FC = () => {
  const [variables, setVariables] = useState<Variable[]>([
    {
      id: '1',
      name: 'user_name',
      type: 'string',
      defaultValue: '',
      validation: { required: true },
      description: 'The name of the user calling'
    },
    {
      id: '2',
      name: 'user_age',
      type: 'number',
      defaultValue: 0,
      validation: { required: false, min: 0, max: 120 },
      description: 'Age of the user'
    },
    {
      id: '3',
      name: 'is_premium_customer',
      type: 'boolean',
      defaultValue: false,
      validation: { required: false },
      description: 'Whether the user has a premium subscription'
    },
    {
      id: '4',
      name: 'available_services',
      type: 'list',
      defaultValue: ['support', 'billing', 'sales'],
      validation: { required: true },
      description: 'List of available services'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVariable, setEditingVariable] = useState<Variable | null>(null);

  const filteredVariables = variables.filter(variable => {
    const matchesSearch = variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (variable.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesType = !selectedType || variable.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'string':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'number':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'boolean':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'list':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'context':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDefaultValue = (value: any, type: string) => {
    if (type === 'list' && Array.isArray(value)) {
      return `[${value.join(', ')}]`;
    }
    if (type === 'boolean') {
      return value ? 'true' : 'false';
    }
    return String(value);
  };

  const handleEdit = (variable: Variable) => {
    setEditingVariable(variable);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this variable?')) {
      setVariables(variables.filter(v => v.id !== id));
    }
  };

  return (
    <div className="h-full bg-gray-950 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Variables</h1>
          <p className="text-gray-400">Manage global variables used across your flows</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Variable</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search variables..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          >
            <option value="">All Types</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="list">List</option>
            <option value="context">Context</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Variables Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Default Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Required
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredVariables.map((variable) => (
                <tr key={variable.id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-white font-mono text-sm">{variable.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium border rounded-md ${getTypeColor(variable.type)}`}>
                      {variable.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm font-mono">
                      {formatDefaultValue(variable.defaultValue, variable.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {variable.validation?.required ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 rounded-md">
                        Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 rounded-md">
                        Optional
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">{variable.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(variable)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(variable.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredVariables.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No variables found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first variable to get started'}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
          >
            Create New Variable
          </button>
        </div>
      )}
    </div>
  );
};

export default VariablesPage;