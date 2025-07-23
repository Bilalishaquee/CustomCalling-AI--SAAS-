export interface User {
  id: string;
  email: string;
  name: string;
  role: 'master_admin' | 'company_admin' | 'viewer';
  companyId: string;
  avatar?: string;
  mfaEnabled: boolean;
}

export interface Company {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  credits: number;
  billingStatus: 'active' | 'suspended' | 'canceled';
}

export interface FlowBlock {
  id: string;
  type: 'text_prompt' | 'condition' | 'api_call' | 'variable_assignment' | 'webhook';
  position: { x: number; y: number };
  data: {
    label: string;
    config: Record<string, any>;
  };
}

export interface FlowConnection {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  companyId: string;
  blocks: FlowBlock[];
  connections: FlowConnection[];
  variables: Variable[];
  status: 'draft' | 'active' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface Variable {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'list' | 'context';
  defaultValue: any;
  validation?: {
    required: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
  description?: string;
}

export interface SimulationStep {
  id: string;
  blockId: string;
  type: string;
  input: any;
  output: any;
  timestamp: number;
  duration: number;
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters: ApiParameter[];
  responses: ApiResponse[];
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiResponse {
  status: number;
  description: string;
  example: any;
}

export interface BillingInfo {
  customerId: string;
  subscriptionId?: string;
  credits: number;
  plan: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  paymentMethod?: {
    type: string;
    last4: string;
    brand: string;
  };
}