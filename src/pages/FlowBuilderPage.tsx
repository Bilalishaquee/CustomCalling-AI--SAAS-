import React from 'react';
import { useState, useEffect } from 'react';
import FlowCanvas from '../components/FlowBuilder/FlowCanvas';
import BlockPalette from '../components/FlowBuilder/BlockPalette';
import ConfigPanel from '../components/FlowBuilder/ConfigPanel';
import { useFlowStore } from '../store/flowStore';
import { Play, Save, Settings, Eye, Menu, X } from 'lucide-react';

const FlowBuilderPage: React.FC = () => {
  const { currentFlow, startSimulation, isSimulating } = useFlowStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);
  const [showMobileConfig, setShowMobileConfig] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="h-full flex">
      {/* Mobile Block Palette Overlay */}
      {isMobile && showMobilePalette && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute left-0 top-0 h-full w-80 bg-gray-900">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-semibold">Block Palette</h3>
              <button
                onClick={() => setShowMobilePalette(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <BlockPalette />
          </div>
        </div>
      )}

      {/* Mobile Config Panel Overlay */}
      {isMobile && showMobileConfig && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-gray-900">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white font-semibold">Configuration</h3>
              <button
                onClick={() => setShowMobileConfig(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ConfigPanel />
          </div>
        </div>
      )}

      {/* Desktop/Tablet Left Panel - Block Palette */}
      {!isMobile && <BlockPalette />}

      {/* Center - Flow Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 lg:h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-3 lg:px-6">
          <div className="flex items-center space-x-2 lg:space-x-4 flex-1 min-w-0">
            {/* Mobile Menu Buttons */}
            {isMobile && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowMobilePalette(true)}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded"
                >
                  <Menu className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowMobileConfig(true)}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <div>
              <h2 className="text-sm lg:text-lg font-semibold text-white truncate">
                {currentFlow?.name || 'New Flow'}
              </h2>
              <div className="text-xs text-gray-400 hidden lg:block">
                {currentFlow?.blocks.length || 0} blocks, {currentFlow?.connections.length || 0} connections
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Mobile: Show only essential buttons */}
            {isMobile ? (
              <button className="flex items-center space-x-1 px-3 py-2 bg-gray-800 text-white rounded-lg text-xs">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
            ) : (
              <>
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors text-sm lg:text-base"
            >
              <Play className="w-4 h-4" />
              <span className="hidden lg:inline">{isSimulating ? 'Running...' : 'Test Flow'}</span>
              <span className="lg:hidden">Test</span>
            </button>
            {!isTablet && (
              <button className="flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm lg:text-base">
              <Save className="w-4 h-4" />
              <span className="hidden lg:inline">Save</span>
            </button>
            )}
            <button className="p-2 text-gray-400 hover:text-white transition-colors lg:block hidden">
              <Settings className="w-5 h-5" />
            </button>
              </>
            )}
          </div>
        </div>

        {/* Canvas */}
        <FlowCanvas />
      </div>

      {/* Desktop/Tablet Right Panel - Configuration */}
      {!isMobile && <ConfigPanel />}
    </div>
  );
};

export default FlowBuilderPage;