import React from 'react';
import FlowCanvas from '../components/FlowBuilder/FlowCanvas';
import BlockPalette from '../components/FlowBuilder/BlockPalette';
import ConfigPanel from '../components/FlowBuilder/ConfigPanel';
import { useFlowStore } from '../store/flowStore';
import { Play, Save, Settings } from 'lucide-react';

const FlowBuilderPage: React.FC = () => {
  const { currentFlow, startSimulation, isSimulating } = useFlowStore();

  return (
    <div className="h-full flex">
      {/* Left Panel - Block Palette */}
      <BlockPalette />

      {/* Center - Flow Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                {currentFlow?.name || 'New Flow'}
              </h2>
              <div className="text-xs text-gray-400">
                {currentFlow?.blocks.length || 0} blocks, {currentFlow?.connections.length || 0} connections
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>{isSimulating ? 'Running...' : 'Test Flow'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <FlowCanvas />
      </div>

      {/* Right Panel - Configuration */}
      <ConfigPanel />
    </div>
  );
};

export default FlowBuilderPage;