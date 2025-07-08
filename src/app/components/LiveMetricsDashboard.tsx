'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Grid, AreaChart, DonutChart } from '@tremor/react';
import { 
  Activity, 
  DollarSign, 
  Users, 
  Clock, 
  TrendingUp, 
  Smartphone, 
  Star, 
  UserCheck, 
  Zap, 
  Play, 
  Pause,
  BarChart3,
  Target
} from 'lucide-react';

type LiveMetrics = {
  totalSalesThisHour: number;
  customersServedToday: number;
  averageWaitTime: number;
  activeSalesReps: number;
  topSellingDevice: string;
  conversionRateToday: number;
  revenueGrowth: number;
  customerSatisfactionLive: number;
  hourlyData: Array<{
    time: string;
    sales: number;
    customers: number;
    calls: number;
  }>;
  deviceMix: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  competitorComparisons: Array<{
    carrier: string;
    marketShare: number;
    priceAdvantage: number;
  }>;
};

export function LiveMetricsDashboard() {
  const [metrics, setMetrics] = useState<LiveMetrics | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const generateLiveData = (): LiveMetrics => {
    const baseHour = new Date().getHours();
    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      sales: Math.floor(Math.random() * 5000) + 1000,
      customers: Math.floor(Math.random() * 50) + 10,
      calls: Math.floor(Math.random() * 100) + 20
    }));

    return {
      totalSalesThisHour: Math.floor(Math.random() * 15000) + 5000,
      customersServedToday: Math.floor(Math.random() * 500) + 200,
      averageWaitTime: Math.floor(Math.random() * 8) + 2,
      activeSalesReps: Math.floor(Math.random() * 25) + 15,
      topSellingDevice: ['iPhone 16', 'Samsung Galaxy A15 5G', 'Google Pixel 8a'][Math.floor(Math.random() * 3)],
      conversionRateToday: Math.random() * 30 + 60,
      revenueGrowth: Math.random() * 20 + 5,
      customerSatisfactionLive: Math.random() * 1.5 + 3.5,
      hourlyData,
      deviceMix: [
        { name: 'iPhone 16', value: 35, color: 'blue' },
        { name: 'Samsung Galaxy A15 5G', value: 28, color: 'purple' },
        { name: 'Google Pixel 8a', value: 22, color: 'green' },
        { name: 'OnePlus Nord N30', value: 10, color: 'amber' },
        { name: 'Other', value: 5, color: 'gray' }
      ],
      competitorComparisons: [
        { carrier: 'Verizon', marketShare: 32.5, priceAdvantage: 15.2 },
        { carrier: 'AT&T', marketShare: 28.1, priceAdvantage: 12.8 },
        { carrier: 'T-Mobile', marketShare: 25.7, priceAdvantage: 8.5 },
        { carrier: 'Boost Mobile', marketShare: 13.7, priceAdvantage: 0 }
      ]
    };
  };

  useEffect(() => {
    setMetrics(generateLiveData());
    
    if (isLive) {
      const interval = setInterval(() => {
        setMetrics(generateLiveData());
        setLastUpdate(new Date());
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isLive]);

  if (!metrics) {
    return (
      <div className="professional-card p-8 rounded-2xl animate-pulse">
        <div className="text-gray-600">Loading live metrics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Live Status Header */}
      <div className="professional-card p-8 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <Title className="text-3xl font-bold text-gray-900">Live Network Command Center</Title>
                <Text className="text-gray-600 text-lg">Real-time metrics across all Colorado locations</Text>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all border flex items-center space-x-2 ${
                isLive 
                  ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' 
                  : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
              }`}
            >
              {isLive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isLive ? 'PAUSE LIVE' : 'RESUME LIVE'}</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className={`status-indicator ${isLive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <div className="text-right">
                <Text className="text-gray-900 font-semibold text-lg">
                  {isLive ? 'LIVE' : 'PAUSED'}
                </Text>
                <Text className="text-gray-500 text-sm">
                  Updated {lastUpdate.toLocaleTimeString()}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time KPI Cards */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <Text className="text-gray-500 text-sm font-medium">Sales This Hour</Text>
              </div>
              <Metric className="text-gray-900 text-3xl font-bold">
                ${metrics.totalSalesThisHour.toLocaleString()}
              </Metric>
            </div>
          </div>
        </Card>
        
        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <Text className="text-gray-500 text-sm font-medium">Customers Served Today</Text>
              </div>
              <Metric className="text-gray-900 text-3xl font-bold">
                {metrics.customersServedToday}
              </Metric>
            </div>
          </div>
        </Card>
        
        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <Text className="text-gray-500 text-sm font-medium">Avg Wait Time</Text>
              </div>
              <Metric className="text-gray-900 text-3xl font-bold">{metrics.averageWaitTime} min</Metric>
              <div className="flex items-center space-x-2 mt-2">
                <Zap className="w-4 h-4 text-green-500" />
                <Text className="text-green-600 text-sm">Below 5min target</Text>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-purple-600" />
                </div>
                <Text className="text-gray-500 text-sm font-medium">Active Staff</Text>
              </div>
              <Metric className="text-gray-900 text-3xl font-bold">{metrics.activeSalesReps}</Metric>
              <div className="flex items-center space-x-2 mt-2">
                <Activity className="w-4 h-4 text-purple-500" />
                <Text className="text-purple-600 text-sm">Across all locations</Text>
              </div>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Performance Charts */}
      <Grid numItems={1} numItemsLg={2} className="gap-8">
        <Card className="chart-container">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <Title className="text-xl font-semibold text-gray-900">Hourly Performance Trends</Title>
              <Text className="text-gray-600 mt-1">Sales, customers, and calls throughout the day</Text>
            </div>
          </div>
          <AreaChart
            className="h-80"
            data={metrics.hourlyData}
            index="time"
            categories={["sales", "customers", "calls"]}
            colors={["blue", "green", "purple"]}
            valueFormatter={(value) => 
              typeof value === 'number' ? 
                (value > 100 ? `$${value.toLocaleString()}` : `${value}`) : 
                String(value)
            }
          />
        </Card>

        <Card className="chart-container">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <Title className="text-xl font-semibold text-gray-900">Device Sales Mix (Live)</Title>
              <Text className="text-gray-600 mt-1">Current sales distribution by device type</Text>
            </div>
          </div>
          <DonutChart
            className="h-80"
            data={metrics.deviceMix}
            category="value"
            index="name"
            colors={["blue", "purple", "green", "amber", "gray"]}
            valueFormatter={(value) => `${value}%`}
          />
        </Card>
      </Grid>

      {/* Additional Metrics */}
      <Grid numItems={1} numItemsLg={3} className="gap-6">
        <Card className="metric-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <Title className="text-lg font-semibold text-gray-900">Top Selling Device</Title>
              <Text className="text-gray-600 text-sm">Leading device this hour</Text>
            </div>
          </div>
          <Metric className="text-gray-900 text-xl font-bold">{metrics.topSellingDevice}</Metric>
        </Card>
        
        <Card className="metric-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <Title className="text-lg font-semibold text-gray-900">Conversion Rate</Title>
              <Text className="text-gray-600 text-sm">Visitors to customers</Text>
            </div>
          </div>
          <Metric className="text-gray-900 text-xl font-bold">{metrics.conversionRateToday.toFixed(1)}%</Metric>
        </Card>
        
        <Card className="metric-card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <Title className="text-lg font-semibold text-gray-900">Customer Satisfaction</Title>
              <Text className="text-gray-600 text-sm">Live feedback score</Text>
            </div>
          </div>
          <Metric className="text-gray-900 text-xl font-bold">{metrics.customerSatisfactionLive.toFixed(1)}/5.0</Metric>
        </Card>
      </Grid>

      {/* Market Analysis */}
      <Card className="chart-container">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-orange-600" />
          </div>
          <div>
            <Title className="text-xl font-semibold text-gray-900">Market Position Analysis</Title>
            <Text className="text-gray-600 mt-1">Competitive landscape and pricing advantages</Text>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.competitorComparisons.map((competitor, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <Text className="font-semibold text-gray-900 text-lg">{competitor.carrier}</Text>
              <div className="mt-3 space-y-2">
                <div>
                  <Text className="text-gray-500 text-sm">Market Share</Text>
                  <Text className="font-bold text-gray-900">{competitor.marketShare}%</Text>
                </div>
                <div>
                  <Text className="text-gray-500 text-sm">Price Advantage</Text>
                  <Text className={`font-bold ${competitor.priceAdvantage > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {competitor.priceAdvantage > 0 ? '+' : ''}{competitor.priceAdvantage}%
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}