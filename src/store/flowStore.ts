import { create } from 'zustand';
import { Flow, FlowBlock, FlowConnection, Variable } from '../types';

interface FlowState {
  flows: Flow[];
  currentFlow: Flow | null;
  selectedBlock: FlowBlock | null;
  isSimulating: boolean;
  simulationResults: any[];
  setFlows: (flows: Flow[]) => void;
  setCurrentFlow: (flow: Flow | null) => void;
  setSelectedBlock: (block: FlowBlock | null) => void;
  addBlock: (block: FlowBlock) => void;
  updateBlock: (blockId: string, updates: Partial<FlowBlock>) => void;
  deleteBlock: (blockId: string) => void;
  addConnection: (connection: FlowConnection) => void;
  deleteConnection: (connectionId: string) => void;
  updateFlowVariable: (variable: Variable) => void;
  startSimulation: () => void;
  stopSimulation: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  flows: [],
  currentFlow: null,
  selectedBlock: null,
  isSimulating: false,
  simulationResults: [],

  setFlows: (flows) => set({ flows }),
  
  setCurrentFlow: (flow) => set({ currentFlow: flow, selectedBlock: null }),
  
  setSelectedBlock: (block) => set({ selectedBlock: block }),

  addBlock: (block) => {
    const { currentFlow } = get();
    if (!currentFlow) return;

    const updatedFlow = {
      ...currentFlow,
      blocks: [...currentFlow.blocks, block]
    };
    set({ currentFlow: updatedFlow });
  },

  updateBlock: (blockId, updates) => {
    const { currentFlow } = get();
    if (!currentFlow) return;

    const updatedFlow = {
      ...currentFlow,
      blocks: currentFlow.blocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    };
    set({ currentFlow: updatedFlow });
  },

  deleteBlock: (blockId) => {
    const { currentFlow } = get();
    if (!currentFlow) return;

    const updatedFlow = {
      ...currentFlow,
      blocks: currentFlow.blocks.filter(block => block.id !== blockId),
      connections: currentFlow.connections.filter(
        conn => conn.source !== blockId && conn.target !== blockId
      )
    };
    set({ currentFlow: updatedFlow });
  },

  addConnection: (connection) => {
    const { currentFlow } = get();
    if (!currentFlow) return;

    const updatedFlow = {
      ...currentFlow,
      connections: [...currentFlow.connections, connection]
    };
    set({ currentFlow: updatedFlow });
  },

  deleteConnection: (connectionId) => {
    const { currentFlow } = get();
    if (!currentFlow) return;

    const updatedFlow = {
      ...currentFlow,
      connections: currentFlow.connections.filter(conn => conn.id !== connectionId)
    };
    set({ currentFlow: updatedFlow });
  },

  updateFlowVariable: (variable) => {
    const { currentFlow } = get();
    if (!currentFlow) return;

    const updatedFlow = {
      ...currentFlow,
      variables: currentFlow.variables.map(v =>
        v.id === variable.id ? variable : v
      )
    };
    set({ currentFlow: updatedFlow });
  },

  startSimulation: () => {
    set({ isSimulating: true, simulationResults: [] });
    // Mock simulation logic
    setTimeout(() => {
      set({
        simulationResults: [
          { step: 1, block: 'Text Prompt', result: 'Hello! How can I help you?' },
          { step: 2, block: 'User Input', result: 'I need help with billing' },
          { step: 3, block: 'Condition', result: 'Route to billing support' }
        ]
      });
    }, 2000);
  },

  stopSimulation: () => {
    set({ isSimulating: false, simulationResults: [] });
  }
}));