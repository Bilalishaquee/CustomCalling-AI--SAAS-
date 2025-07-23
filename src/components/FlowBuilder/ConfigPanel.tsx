import React, { useState } from 'react';
import { useFlowStore } from '../../store/flowStore';
import { X, Save, Trash2 } from 'lucide-react';

const ConfigPanel: React.FC = () => {
  const { selectedBlock, updateBlock, deleteBlock, setSelectedBlock } = useFlowStore();
  const [config, setConfig] = useState(selectedBlock?.data.config || {});

  if (!selectedBlock) {
    return (
      <div className="w-80 lg:w-80 md:w-72 bg-gray-900 border-l border-gray-800 p-4 lg:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-gray-600 rounded border-dashed"></div>
          </div>
          <h3 className="text-base lg:text-lg font-medium text-gray-300 mb-2">No Block Selected</h3>
          <p className="text-xs lg:text-sm text-gray-500">Select a block to configure its settings</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateBlock(selectedBlock.id, {
      data: {
        ...selectedBlock.data,
        config
      }
    });
  };

  const handleDelete = () => {
    deleteBlock(selectedBlock.id);
    setSelectedBlock(null);
  };

  const renderConfigFields = () => {
    switch (selectedBlock.type) {
      case 'text_prompt':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message Text
              </label>
              <textarea
                value={config.message || ''}
                onChange={(e) => setConfig({ ...config, message: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                rows={4}
                placeholder="Enter the message to send to the user..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Voice Settings
              </label>
              <select
                value={config.voice || 'default'}
                onChange={(e) => setConfig({ ...config, voice: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="default">Default Voice</option>
                <option value="female">Female Voice</option>
                <option value="male">Male Voice</option>
              </select>
            </div>
          </>
        );

      case 'condition':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Condition Logic
              </label>
              <select
                value={config.operator || 'equals'}
                onChange={(e) => setConfig({ ...config, operator: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Variable Name
              </label>
              <input
                type="text"
                value={config.variable || ''}
                onChange={(e) => setConfig({ ...config, variable: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="e.g., user_input"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Compare Value
              </label>
              <input
                type="text"
                value={config.value || ''}
                onChange={(e) => setConfig({ ...config, value: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="Value to compare against"
              />
            </div>
          </>
        );

      case 'api_call':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                HTTP Method
              </label>
              <select
                value={config.method || 'GET'}
                onChange={(e) => setConfig({ ...config, method: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API URL
              </label>
              <input
                type="url"
                value={config.url || ''}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="https://api.example.com/endpoint"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Headers (JSON)
              </label>
              <textarea
                value={config.headers || '{\n  "Content-Type": "application/json"\n}'}
                onChange={(e) => setConfig({ ...config, headers: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 font-mono text-sm"
                rows={3}
              />
            </div>
          </>
        );

      case 'variable_assignment':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Variable Name
              </label>
              <input
                type="text"
                value={config.variableName || ''}
                onChange={(e) => setConfig({ ...config, variableName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="e.g., user_name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Value Source
              </label>
              <select
                value={config.source || 'static'}
                onChange={(e) => setConfig({ ...config, source: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                <option value="static">Static Value</option>
                <option value="user_input">User Input</option>
                <option value="api_response">API Response</option>
                <option value="expression">Expression</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Value
              </label>
              <input
                type="text"
                value={config.value || ''}
                onChange={(e) => setConfig({ ...config, value: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="Enter value or expression"
              />
            </div>
          </>
        );

      case 'webhook':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Webhook URL
              </label>
              <input
                type="url"
                value={config.webhookUrl || ''}
                onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                placeholder="https://your-webhook-endpoint.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Payload Template
              </label>
              <textarea
                value={config.payload || '{\n  "event": "call_event",\n  "data": {}\n}'}
                onChange={(e) => setConfig({ ...config, payload: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 font-mono text-sm"
                rows={4}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-80 lg:w-80 md:w-72 bg-gray-900 border-l border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-base lg:text-lg font-semibold text-white">
          Configure Block
        </h3>
        <button
          onClick={() => setSelectedBlock(null)}
          className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 lg:p-4 overflow-y-auto">
        <div className="mb-4">
          <label className="block text-xs lg:text-sm font-medium text-gray-300 mb-2">
            Block Label
          </label>
          <input
            type="text"
            value={selectedBlock.data.label}
            onChange={(e) => updateBlock(selectedBlock.id, {
              data: { ...selectedBlock.data, label: e.target.value }
            })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm lg:text-base"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs lg:text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={config.description || ''}
            onChange={(e) => setConfig({ ...config, description: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-sm lg:text-base"
            rows={2}
            placeholder="Brief description of this block's purpose"
          />
        </div>

        {renderConfigFields()}
      </div>

      {/* Footer */}
      <div className="p-3 lg:p-4 border-t border-gray-800 flex space-x-2">
        <button
          onClick={handleSave}
          className="flex-1 flex items-center justify-center space-x-2 px-3 lg:px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm lg:text-base"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
        <button
          onClick={handleDelete}
          className="px-3 lg:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ConfigPanel;