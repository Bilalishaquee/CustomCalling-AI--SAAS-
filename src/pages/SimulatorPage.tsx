import React, { useState } from 'react';
import { Play, Square, RotateCcw, Settings, Mic, Phone } from 'lucide-react';
import { useFlowStore } from '../store/flowStore';

const SimulatorPage: React.FC = () => {
  const { currentFlow, simulationResults, isSimulating, startSimulation, stopSimulation } = useFlowStore();
  const [simulationMode, setSimulationMode] = useState<'voice' | 'chat'>('voice');
  const [currentStep, setCurrentStep] = useState(0);

  const mockSimulationSteps = [
    {
      id: '1',
      blockType: 'text_prompt',
      blockName: 'Welcome Message',
      input: {},
      output: { message: "Hello! Thank you for calling. How can I assist you today?" },
      timestamp: Date.now() - 5000,
      duration: 2.5
    },
    {
      id: '2',
      blockType: 'user_input',
      blockName: 'User Response',
      input: { userSaid: "I need help with my billing" },
      output: { intent: 'billing_inquiry', confidence: 0.94 },
      timestamp: Date.now() - 3000,
      duration: 1.2
    },
    {
      id: '3',
      blockType: 'condition',
      blockName: 'Route Intent',
      input: { intent: 'billing_inquiry' },
      output: { branch: 'billing_support', condition_met: true },
      timestamp: Date.now() - 2000,
      duration: 0.3
    },
    {
      id: '4',
      blockType: 'text_prompt',
      blockName: 'Billing Response',
      input: { intent: 'billing_inquiry' },
      output: { message: "I'll connect you with our billing department. Please hold while I transfer your call." },
      timestamp: Date.now() - 1000,
      duration: 3.1
    }
  ];

  const handleStartSimulation = () => {
    if (!currentFlow) {
      alert('Please select a flow to simulate');
      return;
    }
    setCurrentStep(0);
    startSimulation();
  };

  const formatDuration = (duration: number) => {
    return `${duration.toFixed(1)}s`;
  };

  const getBlockIcon = (blockType: string) => {
    switch (blockType) {
      case 'text_prompt':
        return <Mic className="w-4 h-4" />;
      case 'user_input':
        return <Phone className="w-4 h-4" />;
      case 'condition':
        return <Settings className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getBlockColor = (blockType: string) => {
    switch (blockType) {
      case 'text_prompt':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'user_input':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'condition':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-full bg-gray-950 flex">
      {/* Left Panel - Controls */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white mb-2">Flow Simulator</h2>
          <p className="text-gray-400 text-sm">Test your flow in real-time</p>
        </div>

        {/* Flow Selection */}
        <div className="p-6 border-b border-gray-800">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Active Flow
          </label>
          <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600">
            <option>{currentFlow?.name || 'No flow selected'}</option>
          </select>
        </div>

        {/* Simulation Mode */}
        <div className="p-6 border-b border-gray-800">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Simulation Mode
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setSimulationMode('voice')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                simulationMode === 'voice'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Mic className="w-4 h-4 mx-auto mb-1" />
              Voice Call
            </button>
            <button
              onClick={() => setSimulationMode('chat')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                simulationMode === 'chat'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Phone className="w-4 h-4 mx-auto mb-1" />
              Text Chat
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-gray-800">
          <div className="space-y-3">
            <button
              onClick={handleStartSimulation}
              disabled={isSimulating}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>{isSimulating ? 'Running...' : 'Start Simulation'}</span>
            </button>
            
            <button
              onClick={stopSimulation}
              disabled={!isSimulating}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded-lg transition-colors"
            >
              <Square className="w-5 h-5" />
              <span>Stop</span>
            </button>

            <button
              onClick={() => setCurrentStep(0)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Simulation Settings */}
        <div className="p-6 flex-1">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Playback Speed</label>
              <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600">
                <option value="0.5">0.5x</option>
                <option value="1" selected>1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded bg-gray-800 border-gray-700 text-teal-600 focus:ring-teal-600 focus:ring-offset-0"
                  defaultChecked
                />
                <span className="text-xs text-gray-400">Auto-advance steps</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded bg-gray-800 border-gray-700 text-teal-600 focus:ring-teal-600 focus:ring-offset-0"
                />
                <span className="text-xs text-gray-400">Show debug info</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Simulation Display */}
      <div className="flex-1 flex flex-col">
        {/* Status Bar */}
        <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${isSimulating ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-white font-medium">
              {isSimulating ? 'Simulation Running' : 'Ready to Simulate'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {simulationMode === 'voice' ? 'Voice Call Mode' : 'Text Chat Mode'}
          </div>
        </div>

        {/* Simulation Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {!isSimulating && mockSimulationSteps.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Ready to Simulate</h3>
                <p className="text-gray-500 mb-6">
                  Click "Start Simulation" to test your flow with realistic call scenarios
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {(isSimulating ? mockSimulationSteps : mockSimulationSteps).map((step, index) => (
                  <div
                    key={step.id}
                    className={`bg-gray-900 rounded-lg p-6 border-2 transition-all ${
                      index === currentStep ? 'border-teal-600 shadow-lg shadow-teal-600/20' : 'border-gray-800'
                    }`}
                  >
                    {/* Step Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getBlockColor(step.blockType)}`}>
                          {getBlockIcon(step.blockType)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{step.blockName}</h3>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-md ${getBlockColor(step.blockType)}`}>
                            {step.blockType.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Duration: {formatDuration(step.duration)}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(step.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Input */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Input</h4>
                        <div className="bg-gray-800 rounded-lg p-3">
                          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                            {JSON.stringify(step.input, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* Output */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Output</h4>
                        <div className="bg-gray-800 rounded-lg p-3">
                          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                            {JSON.stringify(step.output, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Message Display for Voice/Chat */}
                    {(step.blockType === 'text_prompt' && step.output.message) && (
                      <div className="mt-4 p-4 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Mic className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-blue-300 mb-1">AI Assistant</div>
                            <div className="text-white">{step.output.message}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {(step.blockType === 'user_input' && step.input.userSaid) && (
                      <div className="mt-4 p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-green-300 mb-1">User</div>
                            <div className="text-white">{step.input.userSaid}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;