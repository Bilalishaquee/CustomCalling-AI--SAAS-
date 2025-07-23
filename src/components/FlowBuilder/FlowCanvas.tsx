import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  MarkerType
} from 'react-flow-renderer';
import { useFlowStore } from '../../store/flowStore';
import FlowNode from './FlowNode';
import { FlowBlock } from '../../types';

const nodeTypes = {
  flowBlock: FlowNode,
};

const FlowCanvas: React.FC = () => {
  const { currentFlow, addConnection, setSelectedBlock } = useFlowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Convert flow blocks to React Flow nodes
  const initialNodes: Node[] = currentFlow?.blocks.map((block) => ({
    id: block.id,
    type: 'flowBlock',
    position: block.position,
    data: {
      ...block.data,
      blockType: block.type,
      onSelect: () => setSelectedBlock(block)
    }
  })) || [];

  // Convert flow connections to React Flow edges
  const initialEdges: Edge[] = currentFlow?.connections.map((connection) => ({
    id: connection.id,
    source: connection.source,
    target: connection.target,
    sourceHandle: connection.sourceHandle,
    targetHandle: connection.targetHandle,
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#008B8B',
    },
    style: {
      stroke: '#008B8B',
      strokeWidth: 2,
    }
  })) || [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => {
    if (params.source && params.target) {
      const newConnection = {
        id: `${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle || undefined,
        targetHandle: params.targetHandle || undefined,
      };
      
      addConnection(newConnection);
      
      const newEdge: Edge = {
        ...newConnection,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#008B8B',
        },
        style: {
          stroke: '#008B8B',
          strokeWidth: 2,
        }
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
    }
  }, [addConnection, setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const block = currentFlow?.blocks.find(b => b.id === node.id);
    if (block) {
      setSelectedBlock(block);
    }
  }, [currentFlow, setSelectedBlock]);

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-950"
          connectionLineStyle={{ stroke: '#008B8B', strokeWidth: 2 }}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#008B8B',
            },
            style: {
              stroke: '#008B8B',
              strokeWidth: 2,
            }
          }}
        >
          <Controls 
            className="!bg-gray-800 !border-gray-700 [&>button]:!bg-gray-700 [&>button]:!border-gray-600 [&>button]:!text-white hover:[&>button]:!bg-gray-600"
          />
          <Background 
            color="#374151" 
            gap={20} 
            size={1}
            className="!bg-gray-950"
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowCanvas;