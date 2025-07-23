import React, { useState } from 'react';
import { 
  TrendingUp, 
  Phone, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import { useTranslation } from '../utils/translations';

const AnalyticsPage: React.FC = () => {
  const { language } = useSettingsStore();
  const t = useTranslation(language);
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('calls');

  const metrics = [
    {
      id: 'totalCalls',
      label: t('totalCalls'),
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: Phone,
      color: 'text-blue-500'
    },
    {
      id: 'successRate',
      label: t('successRate'),
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 'avgDuration',
      label: t('avgDuration'),
      value: '3m 42s',
      change: '-8.3%',
      trend: 'down',
      icon: Clock,
      color: 'text-yellow-500'
    },
    {
      id: 'activeFlows',
      label: t('activeFlows'),
      value: '23',
      change: '+4',
      trend: 'up',
      icon: Activity,
      color: 'text-purple-500'
    }
  ];

  const flowPerformance = [
    { name: 'Customer Support', calls: 4521, success: 96.2, avgDuration: '4m 12s' },
    { name: 'Sales Qualification', calls: 3847, success: 89.7, avgDuration: '6m 33s' },
    { name: 'Appointment Booking', calls: 2156, success: 97.8, avgDuration: '2m 18s' },
    { name: 'Order Status', calls: 1823, success: 98.1, avgDuration: '1m 45s' },
    { name: 'Technical Support', calls: 500, success: 85.4, avgDuration: '8m 22s' }
  ];

  const callVolumeData = [
    { time: '00:00', calls: 45 },
    { time: '04:00', calls: 12 },
    { time: '08:00', calls: 234 },
    { time: '12:00', calls: 456 },
    { time: '16:00', calls: 389 },
    { time: '20:00', calls: 167 }
  ];

  const dateRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  return (
    <div className={`h-full overflow-y-auto ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="bg-gray-950 min-h-full">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {t('analytics')}
              </h1>
              <p className="text-gray-400">
                Monitor your voice flow performance and call analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.id} className="bg-gray-900 rounded-lg border border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${metric.color}`} />
                    <div className={`flex items-center space-x-1 text-sm ${
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      <TrendingUp className={`w-4 h-4 ${
                        metric.trend === 'down' ? 'rotate-180' : ''
                      }`} />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Call Volume Chart */}
            <div className="lg:col-span-2 bg-gray-900 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {t('callVolume')}
                </h3>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-teal-500" />
                </div>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="space-y-4">
                {callVolumeData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm text-gray-400">{data.time}</div>
                    <div className="flex-1 bg-gray-800 rounded-full h-6 relative">
                      <div
                        className="bg-teal-600 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(data.calls / 500) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          {data.calls}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Rate Pie Chart */}
            <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Call Status</h3>
                <PieChart className="w-5 h-5 text-teal-500" />
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#14B8A6"
                      strokeWidth="3"
                      strokeDasharray="94.2, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">94.2%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Successful</span>
                  </div>
                  <span className="text-sm text-white">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">Failed</span>
                  </div>
                  <span className="text-sm text-white">5.8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Performance Table */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">
                {t('flowPerformance')}
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Flow Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total Calls
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Success Rate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Avg Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {flowPerformance.map((flow, index) => (
                    <tr key={index} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-white font-medium">{flow.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-300">{flow.calls.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="text-white">{flow.success}%</div>
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-teal-500 h-2 rounded-full"
                              style={{ width: `${flow.success}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-300">{flow.avgDuration}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded-md ${
                          flow.success > 95 
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : flow.success > 90
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {flow.success > 95 ? 'Excellent' : flow.success > 90 ? 'Good' : 'Needs Attention'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-gray-900 rounded-lg border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { time: '2 minutes ago', event: 'Customer Support Flow completed successfully', status: 'success' },
                  { time: '5 minutes ago', event: 'Sales Qualification Flow failed - timeout', status: 'error' },
                  { time: '8 minutes ago', event: 'Appointment Booking Flow completed successfully', status: 'success' },
                  { time: '12 minutes ago', event: 'Order Status Flow completed successfully', status: 'success' },
                  { time: '15 minutes ago', event: 'Technical Support Flow completed successfully', status: 'success' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{activity.event}</div>
                      <div className="text-gray-400 text-xs">{activity.time}</div>
                    </div>
                    {activity.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;