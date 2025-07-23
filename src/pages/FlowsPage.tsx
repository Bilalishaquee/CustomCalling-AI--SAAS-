import React, { useEffect, useState } from 'react';
import { Plus, Play, Pause, Copy, Trash2, Search } from 'lucide-react';
import { useFlowStore } from '../store/flowStore';
import { Flow } from '../types';
import FlowBuilderPage from './FlowBuilderPage';

const FlowsPage: React.FC = () => {
  const { flows, setFlows, setCurrentFlow, currentFlow } = useFlowStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFlows, setSelectedFlows] = useState<string[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockFlows: Flow[] = [
      {
        id: '1',
        name: 'Customer Support Flow',
        description: 'Handle customer inquiries and route to appropriate agents',
        companyId: 'company-1',
        blocks: [
          {
            id: 'block-1',
            type: 'text_prompt',
            position: { x: 200, y: 200 },
            data: {
              label: 'Welcome Message',
              config: { text: 'Hello! How can I help you today?' }
            }
          },
          {
            id: 'block-2',
            type: 'condition',
            position: { x: 500, y: 200 },
            data: {
              label: 'Check Intent',
              config: { condition: 'user_intent == "billing"' }
            }
          }
        ],
        connections: [
          {
            id: 'conn-1',
            source: 'block-1',
            target: 'block-2'
          }
        ],
        variables: [],
        status: 'active',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      },
      {
        id: '2',
        name: 'Sales Qualification',
        description: 'Qualify leads and schedule appointments',
        companyId: 'company-1',
        blocks: [
          {
            id: 'block-3',
            type: 'text_prompt',
            position: { x: 200, y: 200 },
            data: {
              label: 'Greeting',
              config: { text: 'Hi! Are you interested in our products?' }
            }
          },
          {
            id: 'block-4',
            type: 'condition',
            position: { x: 500, y: 200 },
            data: {
              label: 'Check Interest',
              config: { condition: 'user_interest == true' }
            }
          }
        ],
        connections: [
          {
            id: 'conn-2',
            source: 'block-3',
            target: 'block-4'
          }
        ],
        variables: [],
        status: 'draft',
        createdAt: '2024-01-18T09:15:00Z',
        updatedAt: '2024-01-18T09:15:00Z'
      },
      {
        id: '3',
        name: 'Appointment Booking',
        description: 'Schedule appointments and send confirmations',
        companyId: 'company-1',
        blocks: [
          {
            id: 'block-5',
            type: 'text_prompt',
            position: { x: 200, y: 200 },
            data: {
              label: 'Ask for Date',
              config: { text: 'What date would you like to book?' }
            }
          },
          {
            id: 'block-6',
            type: 'api_call',
            position: { x: 500, y: 200 },
            data: {
              label: 'Book Appointment',
              config: { endpoint: '/api/book' }
            }
          }
        ],
        connections: [
          {
            id: 'conn-3',
            source: 'block-5',
            target: 'block-6'
          }
        ],
        variables: [],
        status: 'paused',
        createdAt: '2024-01-10T16:45:00Z',
        updatedAt: '2024-01-19T11:20:00Z'
      }
    ];
    setFlows(mockFlows);
  }, [setFlows]);

  const filteredFlows = flows.filter(flow =>
    flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFlowSelect = (flow: Flow) => {
    setCurrentFlow(flow);
    // Navigate to flow builder - this would be handled by routing in a real app
  };

  const handleBackToList = () => {
    setCurrentFlow(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-3 h-3" />;
      case 'paused':
        return <Pause className="w-3 h-3" />;
      default:
        return null;
    }
  };

  if (currentFlow) {
    return (
      <div className="h-full bg-gray-950">
        <button
          onClick={handleBackToList}
          className="m-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          ← Back to Flows
        </button>
        <FlowBuilderPage />
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-950 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Voice Flows</h1>
          <p className="text-gray-400">Create and manage your AI voice call flows</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Flow</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search flows..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlows.map((flow) => (
          <div
            key={flow.id}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer"
            onClick={() => handleFlowSelect(flow)}
          >
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(flow.status)}`}>
                {getStatusIcon(flow.status)}
                <span className="capitalize">{flow.status}</span>
              </span>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Flow Info */}
            <h3 className="text-lg font-semibold text-white mb-2">{flow.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{flow.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Blocks</div>
                <div className="text-white font-semibold">{flow.blocks.length}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Variables</div>
                <div className="text-white font-semibold">{flow.variables.length}</div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="text-xs text-gray-500">
              Updated {new Date(flow.updatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFlows.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-12 h-12 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No flows found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first voice flow to get started'}
          </p>
          <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
            Create New Flow
          </button>
        </div>
      )}
    </div>
  );
};

export default FlowsPage;