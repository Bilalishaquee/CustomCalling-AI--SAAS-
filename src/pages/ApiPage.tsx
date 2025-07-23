import React, { useState } from 'react';
import { Code, Copy, Play, Book, Key, Settings } from 'lucide-react';

const ApiPage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('flows');
  const [activeTab, setActiveTab] = useState('documentation');

  const endpoints = {
    flows: {
      title: 'Flows API',
      description: 'Manage voice call flows',
      methods: [
        {
          method: 'GET',
          path: '/api/v1/flows',
          description: 'List all flows',
          parameters: [
            { name: 'page', type: 'number', required: false, description: 'Page number' },
            { name: 'limit', type: 'number', required: false, description: 'Items per page' },
            { name: 'status', type: 'string', required: false, description: 'Filter by status' }
          ],
          response: {
            status: 200,
            example: {
              flows: [
                {
                  id: 'flow-123',
                  name: 'Customer Support Flow',
                  status: 'active',
                  created_at: '2024-01-15T10:00:00Z'
                }
              ],
              total: 1,
              page: 1,
              limit: 20
            }
          }
        },
        {
          method: 'POST',
          path: '/api/v1/flows',
          description: 'Create a new flow',
          parameters: [
            { name: 'name', type: 'string', required: true, description: 'Flow name' },
            { name: 'description', type: 'string', required: false, description: 'Flow description' },
            { name: 'blocks', type: 'array', required: true, description: 'Flow blocks configuration' }
          ],
          response: {
            status: 201,
            example: {
              id: 'flow-456',
              name: 'New Flow',
              status: 'draft',
              created_at: '2024-01-20T15:30:00Z'
            }
          }
        }
      ]
    },
    variables: {
      title: 'Variables API',
      description: 'Manage flow variables',
      methods: [
        {
          method: 'GET',
          path: '/api/v1/variables',
          description: 'List all variables',
          parameters: [
            { name: 'type', type: 'string', required: false, description: 'Filter by variable type' }
          ],
          response: {
            status: 200,
            example: {
              variables: [
                {
                  id: 'var-123',
                  name: 'user_name',
                  type: 'string',
                  default_value: '',
                  required: true
                }
              ]
            }
          }
        }
      ]
    },
    calls: {
      title: 'Calls API',
      description: 'Trigger and manage voice calls',
      methods: [
        {
          method: 'POST',
          path: '/api/v1/calls/trigger',
          description: 'Trigger a voice call',
          parameters: [
            { name: 'flow_id', type: 'string', required: true, description: 'Flow ID to execute' },
            { name: 'phone_number', type: 'string', required: true, description: 'Destination phone number' },
            { name: 'variables', type: 'object', required: false, description: 'Initial variables' }
          ],
          response: {
            status: 200,
            example: {
              call_id: 'call-789',
              status: 'initiated',
              flow_id: 'flow-123',
              phone_number: '+1234567890'
            }
          }
        }
      ]
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'POST':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-full bg-gray-950 flex">
      {/* Left Sidebar - API Categories */}
      <div className="w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white mb-2">API Reference</h2>
          <p className="text-gray-400 text-sm">RESTful API documentation</p>
        </div>

        <nav className="p-4">
          {Object.entries(endpoints).map(([key, endpoint]) => (
            <button
              key={key}
              onClick={() => setSelectedEndpoint(key)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                selectedEndpoint === key
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="font-medium">{endpoint.title}</div>
              <div className="text-xs opacity-80 mt-1">{endpoint.description}</div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Tabs */}
        <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('documentation')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'documentation'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Book className="w-4 h-4" />
              <span>Documentation</span>
            </button>
            <button
              onClick={() => setActiveTab('testing')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'testing'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>API Tester</span>
            </button>
            <button
              onClick={() => setActiveTab('authentication')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'authentication'
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Authentication</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'documentation' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {endpoints[selectedEndpoint as keyof typeof endpoints].title}
                  </h1>
                  <p className="text-gray-400">
                    {endpoints[selectedEndpoint as keyof typeof endpoints].description}
                  </p>
                </div>

                {/* Methods */}
                <div className="space-y-8">
                  {endpoints[selectedEndpoint as keyof typeof endpoints].methods.map((method, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg border border-gray-800">
                      {/* Method Header */}
                      <div className="p-6 border-b border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md ${getMethodColor(method.method)}`}>
                              {method.method}
                            </span>
                            <code className="text-lg text-white font-mono">{method.path}</code>
                          </div>
                          <button
                            onClick={() => copyToClipboard(`${method.method} ${method.path}`)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-300">{method.description}</p>
                      </div>

                      {/* Parameters */}
                      <div className="p-6 border-b border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-4">Parameters</h3>
                        {method.parameters.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-gray-800">
                                  <th className="text-left py-2 text-sm font-medium text-gray-300">Name</th>
                                  <th className="text-left py-2 text-sm font-medium text-gray-300">Type</th>
                                  <th className="text-left py-2 text-sm font-medium text-gray-300">Required</th>
                                  <th className="text-left py-2 text-sm font-medium text-gray-300">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {method.parameters.map((param, paramIndex) => (
                                  <tr key={paramIndex} className="border-b border-gray-800">
                                    <td className="py-2 text-white font-mono text-sm">{param.name}</td>
                                    <td className="py-2 text-gray-300 text-sm">{param.type}</td>
                                    <td className="py-2">
                                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded ${
                                        param.required 
                                          ? 'bg-red-100 text-red-800 border-red-200' 
                                          : 'bg-gray-100 text-gray-800 border-gray-200'
                                      }`}>
                                        {param.required ? 'Required' : 'Optional'}
                                      </span>
                                    </td>
                                    <td className="py-2 text-gray-300 text-sm">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">No parameters required</p>
                        )}
                      </div>

                      {/* Response */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Response</h3>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-300">
                              Status: {method.response.status}
                            </span>
                            <button
                              onClick={() => copyToClipboard(JSON.stringify(method.response.example, null, 2))}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <pre className="text-sm text-gray-300 overflow-x-auto">
                            {JSON.stringify(method.response.example, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testing' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">API Testing Interface</h2>
                
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Request Configuration */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Request</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Method</label>
                          <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600">
                            <option>GET</option>
                            <option>POST</option>
                            <option>PUT</option>
                            <option>DELETE</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Endpoint</label>
                          <input
                            type="text"
                            value="/api/v1/flows"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Headers</label>
                          <textarea
                            rows={4}
                            value={`{\n  "Authorization": "Bearer your-token-here",\n  "Content-Type": "application/json"\n}`}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Body</label>
                          <textarea
                            rows={6}
                            placeholder="Request body (JSON)"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                          />
                        </div>

                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                          <Play className="w-5 h-5" />
                          <span>Send Request</span>
                        </button>
                      </div>
                    </div>

                    {/* Response */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Response</h3>
                      <div className="bg-gray-800 rounded-lg p-4 h-96 overflow-y-auto">
                        <div className="text-sm text-gray-400 mb-2">Status: 200 OK</div>
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                          {JSON.stringify({
                            flows: [
                              {
                                id: 'flow-123',
                                name: 'Customer Support Flow',
                                status: 'active',
                                created_at: '2024-01-15T10:00:00Z'
                              }
                            ],
                            total: 1,
                            page: 1,
                            limit: 20
                          }, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'authentication' && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">Authentication</h2>

                <div className="space-y-8">
                  {/* API Key Section */}
                  <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">API Key Authentication</h3>
                    <p className="text-gray-400 mb-4">
                      Use your API key to authenticate requests. Include it in the Authorization header.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Your API Key</label>
                        <div className="flex">
                          <input
                            type="password"
                            value="vf_1234567890abcdef..."
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white font-mono focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                            readOnly
                          />
                          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-700 border-l-0 rounded-r-lg text-white transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Example Usage</h4>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -X GET "https://api.voiceflow.ai/v1/flows" \\
  -H "Authorization: Bearer vf_1234567890abcdef..." \\
  -H "Content-Type: application/json"`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Rate Limits */}
                  <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Rate Limits</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="text-2xl font-bold text-teal-500 mb-1">1,000</div>
                        <div className="text-sm text-gray-400">Requests per hour</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="text-2xl font-bold text-teal-500 mb-1">50</div>
                        <div className="text-sm text-gray-400">Concurrent calls</div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="text-2xl font-bold text-teal-500 mb-1">10MB</div>
                        <div className="text-sm text-gray-400">Max payload size</div>
                      </div>
                    </div>
                  </div>

                  {/* Error Codes */}
                  <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Common Error Codes</h3>
                    <div className="space-y-3">
                      {[
                        { code: 401, message: 'Unauthorized - Invalid API key' },
                        { code: 403, message: 'Forbidden - Insufficient permissions' },
                        { code: 429, message: 'Too Many Requests - Rate limit exceeded' },
                        { code: 500, message: 'Internal Server Error - Something went wrong' }
                      ].map((error) => (
                        <div key={error.code} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                          <span className="text-red-400 font-mono text-sm w-12">{error.code}</span>
                          <span className="text-gray-300 text-sm">{error.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiPage;