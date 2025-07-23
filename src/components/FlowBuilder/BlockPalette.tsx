import React from 'react';
import { 
  MessageSquare, 
  GitBranch, 
  Code, 
  Variable, 
  Webhook,
  Plus
} from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';
import { FlowBlock } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const BlockPalette: React.FC = () => {
  const { addBlock } = useFlowStore();

  const blockTypes = [
    {
      type: 'text_prompt',
      label: 'Text Prompt',
      icon: MessageSquare,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Send a message to the user'
    },
    {
      type: 'condition',
      label: 'Condition',
      icon: GitBranch,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      description: 'Branch based on conditions'
    },
    {
      type: 'api_call',
      label: 'API Call',
      icon: Code,
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Make external API request'
    },
    {
      type: 'variable_assignment',
      label: 'Set Variable',
      icon: Variable,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Assign value to variable'
    },
    {
      type: 'webhook',
      label: 'Webhook',
      icon: Webhook,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'Send data to external service'
    }
  ];

  const handleAddBlock = (type: string, label: string) => {
    const newBlock: FlowBlock = {
      id: uuidv4(),
      type: type as any,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100
      },
      data: {
        label,
        config: {
          description: `New ${label}`
        }
      }
    };

    addBlock(newBlock);
  };

  return (
    <div className="w-64 lg:w-64 md:w-56 bg-gray-900 border-l border-gray-800 p-3 lg:p-4">
      <div className="mb-4">
        <h3 className="text-base lg:text-lg font-semibold text-white mb-2">Block Palette</h3>
        <p className="text-xs lg:text-sm text-gray-400">Drag blocks to canvas or click to add</p>
      </div>

      <div className="space-y-2 lg:space-y-2">
        {blockTypes.map((blockType) => {
          const Icon = blockType.icon;
          return (
            <button
              key={blockType.type}
              onClick={() => handleAddBlock(blockType.type, blockType.label)}
              className={`w-full flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg text-white transition-colors ${blockType.color}`}
            >
              <Icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="text-xs lg:text-sm font-medium">{blockType.label}</div>
                <div className="text-xs opacity-80 hidden lg:block">{blockType.description}</div>
              </div>
              <Plus className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BlockPalette;