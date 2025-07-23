import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { 
  MessageSquare, 
  GitBranch, 
  Code, 
  Variable, 
  Webhook,
  Settings
} from 'lucide-react';

interface FlowNodeProps {
  data: {
    label: string;
    blockType: string;
    config: any;
    onSelect: () => void;
  };
  selected: boolean;
}

const FlowNode: React.FC<FlowNodeProps> = ({ data, selected }) => {
  const getIcon = () => {
    switch (data.blockType) {
      case 'text_prompt':
        return <MessageSquare className="w-4 h-4" />;
      case 'condition':
        return <GitBranch className="w-4 h-4" />;
      case 'api_call':
        return <Code className="w-4 h-4" />;
      case 'variable_assignment':
        return <Variable className="w-4 h-4" />;
      case 'webhook':
        return <Webhook className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getColor = () => {
    switch (data.blockType) {
      case 'text_prompt':
        return 'bg-blue-600 border-blue-500';
      case 'condition':
        return 'bg-yellow-600 border-yellow-500';
      case 'api_call':
        return 'bg-green-600 border-green-500';
      case 'variable_assignment':
        return 'bg-purple-600 border-purple-500';
      case 'webhook':
        return 'bg-orange-600 border-orange-500';
      default:
        return 'bg-gray-600 border-gray-500';
    }
  };

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg border-2 transition-all ${
        selected ? 'ring-2 ring-teal-400' : ''
      } ${getColor()}`}
      onClick={data.onSelect}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-teal-400 !border-teal-300 !w-3 !h-3"
      />
      
      <div className="flex items-center space-x-2 text-white">
        {getIcon()}
        <div className="text-sm font-medium">{data.label}</div>
      </div>
      
      {data.config.description && (
        <div className="text-xs text-gray-200 mt-1 max-w-32 truncate">
          {data.config.description}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-teal-400 !border-teal-300 !w-3 !h-3"
      />
      
      {data.blockType === 'condition' && (
        <>
          <Handle
            type="source"
            position={Position.Right}
            id="true"
            className="!bg-green-400 !border-green-300 !w-3 !h-3 !top-6"
          />
          <Handle
            type="source"
            position={Position.Left}
            id="false"
            className="!bg-red-400 !border-red-300 !w-3 !h-3 !top-6"
          />
        </>
      )}
    </div>
  );
};

export default FlowNode;