import React, { useState } from 'react';
import { CreditCard, Download, Plus, Star, Check, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const BillingPage: React.FC = () => {
  const { company } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showAddCard, setShowAddCard] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      credits: 100,
      features: [
        'Up to 100 voice calls per month',
        'Basic flow builder',
        'Email support',
        '2 active flows'
      ],
      limitations: [
        'No advanced analytics',
        'Limited API access'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49,
      period: 'month',
      credits: 1000,
      features: [
        'Up to 1,000 voice calls per month',
        'Advanced flow builder',
        'Priority support',
        'Unlimited active flows',
        'Advanced analytics',
        'Full API access',
        'Custom variables'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      period: 'month',
      credits: 5000,
      features: [
        'Up to 5,000 voice calls per month',
        'White-label solution',
        'Dedicated support manager',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment',
        'Advanced security features'
      ]
    }
  ];

  const billingHistory = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Pro Plan - Monthly',
      amount: 49.00,
      status: 'paid',
      invoice: 'INV-001'
    },
    {
      id: '2',
      date: '2023-12-15',
      description: 'Pro Plan - Monthly',
      amount: 49.00,
      status: 'paid',
      invoice: 'INV-002'
    },
    {
      id: '3',
      date: '2023-11-15',
      description: 'Additional Credits (500)',
      amount: 25.00,
      status: 'paid',
      invoice: 'INV-003'
    }
  ];

  const creditPackages = [
    { credits: 100, price: 10 },
    { credits: 500, price: 45 },
    { credits: 1000, price: 80 },
    { credits: 2500, price: 180 }
  ];

  return (
    <div className="h-full bg-gray-950 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Credits</h1>
          <p className="text-gray-400">Manage your subscription and purchase additional credits</p>
        </div>

        {/* Current Plan & Usage */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current Plan */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-500 mb-2">
                {plans.find(p => p.id === company?.plan)?.name || 'Pro'}
              </div>
              <div className="text-gray-400 mb-4">
                ${plans.find(p => p.id === company?.plan)?.price || 49}/month
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                company?.billingStatus === 'active' 
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {company?.billingStatus === 'active' ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          {/* Credits Balance */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Credits Balance</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {company?.credits || 0}
              </div>
              <div className="text-gray-400 mb-4">Available Credits</div>
              <button
                onClick={() => setShowAddCard(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Buy Credits</span>
              </button>
            </div>
          </div>

          {/* Next Billing */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Next Billing</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Jan 15</div>
              <div className="text-gray-400 mb-4">2024</div>
              <div className="text-sm text-gray-500">
                $49.00 will be charged
              </div>
            </div>
          </div>
        </div>

        {/* Plans Comparison */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-gray-900 rounded-lg border-2 p-6 relative transition-all ${
                  plan.popular 
                    ? 'border-teal-600 shadow-lg shadow-teal-600/20' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center space-x-1 px-4 py-1 bg-teal-600 text-white rounded-full text-sm font-medium">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    ${plan.price}
                    <span className="text-lg text-gray-400 font-normal">
                      /{plan.period}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    {plan.credits} voice calls included
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((limitation, index) => (
                    <li key={`limit-${index}`} className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 text-sm">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    company?.plan === plan.id
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                  disabled={company?.plan === plan.id}
                >
                  {company?.plan === plan.id ? 'Current Plan' : 'Upgrade Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Packages */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Additional Credits</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {creditPackages.map((pkg, index) => (
              <div key={index} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">{pkg.credits}</div>
                  <div className="text-gray-400 mb-4">Credits</div>
                  <div className="text-xl font-bold text-teal-500 mb-4">${pkg.price}</div>
                  <button className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Payment Method</h2>
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">•••• •••• •••• 4242</div>
                  <div className="text-gray-400 text-sm">Expires 12/25</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                Update
              </button>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Billing History</h2>
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {billingHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-white">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-gray-300">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white font-mono">
                        ${item.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 rounded-md">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="flex items-center space-x-1 text-teal-400 hover:text-teal-300 transition-colors">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">{item.invoice}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;