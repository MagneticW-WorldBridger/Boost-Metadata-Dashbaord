'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Grid, AreaChart, DonutChart } from '@tremor/react';
import { 
  Activity, 
  DollarSign, 
  Users, 
  Clock, 
  TrendingUp, 
  Package, 
  Star, 
  UserCheck, 
  Zap, 
  Play, 
  Pause,
  BarChart3,
  Target,
  Sofa,
  Building2,
  Truck,
  Brain
} from 'lucide-react';

type HookerMetrics = {
  totalOrderValueToday: number;
  dealersServedToday: number;
  averageResponseTime: number;
  activeSalesAgents: number;
  topSellingProduct: string;
  dealerSatisfactionLive: number;
  revenueGrowth: number;
  slaComplianceRate: number;
  hourlyData: Array<{
    time: string;
    orders: number;
    dealers: number;
    chats: number;
  }>;
  productMix: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  dealerPerformance: Array<{
    dealer: string;
    aov: number;
    repeatRate: number;
    rating: number;
  }>;
  outOfStockAlerts: number;
  customOrdersToday: number;
  warrantyClaimsToday: number;
};

export function LiveMetricsDashboard() {
  const [metrics, setMetrics] = useState<HookerMetrics | null>(null);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate real-time Hooker Furniture metrics based on HOOKERCONVOS.MD data
    const generateMetrics = (): HookerMetrics => {
      const currentHour = new Date().getHours();
      
      return {
        totalOrderValueToday: 847000 + Math.random() * 100000, // More realistic $800K-900K daily
        dealersServedToday: 45 + Math.floor(Math.random() * 15), // Realistic 45-60 dealers/day
        averageResponseTime: 1.8 + Math.random() * 0.4, // Under 2 min SLA target
        activeSalesAgents: 6 + Math.floor(Math.random() * 2), // Smaller team: 6-8 agents
        topSellingProduct: "HF-3124 Savion Deux", // From conversation data
        dealerSatisfactionLive: 90.8 + Math.random() * 2,
        revenueGrowth: 8.4 + Math.random() * 2, // More realistic growth rate
        slaComplianceRate: 94.2 + Math.random() * 3, // From SLA data
        hourlyData: Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          orders: i === 10 ? 85 : Math.floor(Math.random() * 60) + 20, // Peak at 10-11 AM, more realistic volume
          dealers: Math.floor(Math.random() * 15) + 5, // 5-20 dealers per hour
          chats: i === 10 ? 95 : Math.floor(Math.random() * 70) + 30 // Realistic chat volume
        })),
        productMix: [
          { name: 'Bradington-Young (Leather)', value: 195, color: '#8B4513' }, // Top brand by revenue
          { name: 'HF Custom (Upholstery)', value: 165, color: '#A0522D' },
          { name: 'Hooker Casegoods', value: 150, color: '#CD853F' },
          { name: 'Pulaski (Medium Price)', value: 142, color: '#D2691E' },
          { name: 'Other Brands', value: 195, color: '#DEB887' } // Shenandoah, H Contract, etc.
        ],
        dealerPerformance: [
          { dealer: 'UrbanLoft', aov: 892, repeatRate: 48.2, rating: 4.8 },
          { dealer: 'HomeStyle', aov: 840, repeatRate: 44.1, rating: 4.4 },
          { dealer: 'DécorPoint', aov: 815, repeatRate: 45.7, rating: 4.7 },
          { dealer: 'ModernMakers', aov: 778, repeatRate: 36.7, rating: 4.5 },
          { dealer: 'ClassicDesigns', aov: 760, repeatRate: 38.2, rating: 4.6 }
        ],
        outOfStockAlerts: 2 + Math.floor(Math.random() * 2), // Reduced frequency
        customOrdersToday: 22 + Math.floor(Math.random() * 8), // More realistic custom order volume
        warrantyClaimsToday: 5 + Math.floor(Math.random() * 3) // Realistic warranty volume
      };
    };

    const updateMetrics = () => {
      setMetrics(generateMetrics());
    };

    updateMetrics();
    
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(updateMetrics, 5000); // Update every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  if (!metrics) return <div>Loading Hooker Furniture metrics...</div>;

  return (
    <div className="space-y-6">
      {/* Live Metrics Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-34)' }}>
        <div>
          <Title className="text-perfect-3xl font-bold">Live Dealer Analytics</Title>
          <Text className="text-perfect-lg text-gray-600" style={{ lineHeight: 'var(--leading-relaxed)' }}>Real-time chatbot performance and dealer interaction metrics</Text>
        </div>
        <div className="flex items-center" style={{ gap: 'var(--space-21)' }}>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center btn-primary focus-perfect ${
              isLive 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{ 
              padding: 'var(--space-13) var(--space-21)',
              gap: 'var(--space-8)'
            }}
          >
            {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-perfect-sm font-semibold">{isLive ? 'LIVE' : 'PAUSED'}</span>
          </button>
          <div className="flex items-center text-perfect-sm text-gray-500" style={{ gap: 'var(--space-8)' }}>
            <Activity className="w-4 h-4" />
            <span>Updated {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* AI Intelligence Insights Panel */}
      <Card className="card-premium" style={{ padding: 'var(--space-34)' }}>
        <div className="flex items-center" style={{ gap: 'var(--space-13)', marginBottom: 'var(--space-21)' }}>
          <div className="icon-container bg-purple-100">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <Title className="text-perfect-xl">🤖 AI Intelligence Center</Title>
            <Text className="text-perfect-base text-gray-600">Smart insights and predictive analytics</Text>
          </div>
        </div>
        
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-fib-21">
          {/* Predictive Analytics */}
          <div className="gestalt-group" style={{ padding: 'var(--space-21)' }}>
            <div className="flex items-center" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-13)' }}>
              <Zap className="w-5 h-5 text-yellow-500" />
              <Text className="text-perfect-sm font-semibold text-gray-700">AI Predictions</Text>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Text className="text-perfect-xs text-gray-600">Next Hour Volume</Text>
                <Text className="text-perfect-sm font-bold text-green-600">+18%</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text className="text-perfect-xs text-gray-600">HF-3124 Restock Alert</Text>
                <Text className="text-perfect-sm font-bold text-orange-600">2 days</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text className="text-perfect-xs text-gray-600">Dealer Satisfaction</Text>
                <Text className="text-perfect-sm font-bold text-blue-600">92.1%</Text>
              </div>
            </div>
          </div>

          {/* Smart Recommendations */}
          <div className="gestalt-group" style={{ padding: 'var(--space-21)' }}>
            <div className="flex items-center" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-13)' }}>
              <Target className="w-5 h-5 text-blue-500" />
              <Text className="text-perfect-sm font-semibold text-gray-700">Smart Actions</Text>
            </div>
            <div className="space-y-3">
              <div className="flex items-start" style={{ gap: 'var(--space-8)' }}>
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <Text className="text-perfect-xs text-gray-600">Send finish samples to 3 dealers automatically</Text>
              </div>
              <div className="flex items-start" style={{ gap: 'var(--space-8)' }}>
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <Text className="text-perfect-xs text-gray-600">Schedule follow-up for UrbanLoft custom order</Text>
              </div>
              <div className="flex items-start" style={{ gap: 'var(--space-8)' }}>
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <Text className="text-perfect-xs text-gray-600">Optimize agent scheduling for 2PM peak</Text>
              </div>
            </div>
          </div>

          {/* Trend Analysis */}
          <div className="gestalt-group" style={{ padding: 'var(--space-21)' }}>
            <div className="flex items-center" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-13)' }}>
              <TrendingUp className="w-5 h-5 text-green-500" />
              <Text className="text-perfect-sm font-semibold text-gray-700">Trend Insights</Text>
            </div>
            <div className="space-y-3">
              <div>
                <Text className="text-perfect-xs text-gray-600">Leather inquiries</Text>
                <div className="flex items-center" style={{ gap: 'var(--space-5)' }}>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <Text className="text-perfect-xs text-green-600">+23%</Text>
                </div>
              </div>
              <div>
                <Text className="text-perfect-xs text-gray-600">Custom orders</Text>
                <div className="flex items-center" style={{ gap: 'var(--space-5)' }}>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '61%' }}></div>
                  </div>
                  <Text className="text-perfect-xs text-blue-600">+15%</Text>
                </div>
              </div>
              <div>
                <Text className="text-perfect-xs text-gray-600">Response time</Text>
                <div className="flex items-center" style={{ gap: 'var(--space-5)' }}>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '34%' }}></div>
                  </div>
                  <Text className="text-perfect-xs text-yellow-600">-12%</Text>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Card>

      {/* Key Performance Metrics */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} style={{ gap: 'var(--space-21)', marginBottom: 'var(--space-34)' }}>
        <Card className="card-premium hover:scale-105 transition-all duration-300" style={{ padding: 'var(--space-21)' }}>
          <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
            <div className="icon-container bg-green-100">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <Text className="text-perfect-sm text-gray-500 font-medium">Daily Revenue</Text>
              <Metric className="text-perfect-2xl font-bold text-gray-900">${(metrics.totalOrderValueToday / 1000).toFixed(0)}K</Metric>
            </div>
          </div>
        </Card>

        <Card className="card-premium hover:scale-105 transition-all duration-300" style={{ padding: 'var(--space-21)' }}>
          <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
            <div className="icon-container bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <Text className="text-perfect-sm text-gray-500 font-medium">Dealers Served</Text>
              <Metric className="text-perfect-2xl font-bold text-gray-900">{metrics.dealersServedToday}</Metric>
            </div>
          </div>
        </Card>

        <Card className="card-premium hover:scale-105 transition-all duration-300" style={{ padding: 'var(--space-21)' }}>
          <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
            <div className="icon-container bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <Text className="text-perfect-sm text-gray-500 font-medium">Response Time</Text>
              <Metric className="text-perfect-2xl font-bold text-gray-900">{metrics.averageResponseTime.toFixed(1)}min</Metric>
            </div>
          </div>
        </Card>

        <Card className="card-premium hover:scale-105 transition-all duration-300" style={{ padding: 'var(--space-21)' }}>
          <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
            <div className="icon-container bg-purple-100">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <Text className="text-perfect-sm text-gray-500 font-medium">Satisfaction</Text>
              <Metric className="text-perfect-2xl font-bold text-gray-900">{metrics.dealerSatisfactionLive.toFixed(1)}%</Metric>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Secondary Metrics */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={5} className="gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-xs text-gray-500">Active Agents</Text>
              <Metric className="text-lg">{metrics.activeSalesAgents}</Metric>
            </div>
            <UserCheck className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-xs text-gray-500">Out of Stock</Text>
              <Metric className="text-lg text-red-600">{metrics.outOfStockAlerts}</Metric>
            </div>
            <Package className="w-5 h-5 text-red-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-xs text-gray-500">Custom Orders</Text>
              <Metric className="text-lg text-blue-600">{metrics.customOrdersToday}</Metric>
            </div>
            <Sofa className="w-5 h-5 text-blue-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-xs text-gray-500">Warranty Claims</Text>
              <Metric className="text-lg text-orange-600">{metrics.warrantyClaimsToday}</Metric>
            </div>
            <Truck className="w-5 h-5 text-orange-400" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-xs text-gray-500">Dealer CSAT</Text>
              <Metric className="text-lg text-green-600">{metrics.dealerSatisfactionLive.toFixed(1)}%</Metric>
            </div>
            <Star className="w-5 h-5 text-green-400" />
          </div>
        </Card>
      </Grid>

      {/* Charts */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card>
          <Title>Hourly Chat Volume</Title>
          <Text className="text-gray-600 mb-4">Peak hours: Monday 10-11 AM (182 chats)</Text>
          <AreaChart
            className="h-72"
            data={metrics.hourlyData}
            index="time"
            categories={["chats", "orders"]}
            colors={["blue", "green"]}
            valueFormatter={(value) => `${value}`}
          />
        </Card>

        <Card>
          <Title>Top SKU Performance (MTD Revenue - $K)</Title>
          <Text className="text-gray-600 mb-4">Revenue by top-performing furniture SKUs</Text>
          <DonutChart
            className="h-72"
            data={metrics.productMix}
            category="value"
            index="name"
            valueFormatter={(value) => `$${value}K`}
            colors={["amber", "orange", "red", "pink", "rose"]}
          />
        </Card>
      </Grid>

      {/* Top Dealers Performance */}
      <Card>
        <Title>Top Dealer Performance</Title>
        <Text className="text-gray-600 mb-4">Leading dealer partners by AOV and satisfaction</Text>
        <div className="space-y-4">
          {metrics.dealerPerformance.map((dealer, idx) => (
            <div key={dealer.dealer} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{idx + 1}</span>
                </div>
                <div>
                  <Text className="font-semibold">{dealer.dealer}</Text>
                  <Text className="text-sm text-gray-600">{dealer.rating}⭐ rating</Text>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div className="text-right">
                  <Text className="text-sm text-gray-600">AOV</Text>
                  <Text className="font-bold">${dealer.aov}</Text>
                </div>
                <div className="text-right">
                  <Text className="text-sm text-gray-600">Repeat Rate</Text>
                  <Text className="font-bold text-green-600">{dealer.repeatRate}%</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Top Performing Product Alert */}
      <Card className="bg-amber-50 border-amber-200">
        <div className="flex items-center space-x-3">
          <Zap className="w-6 h-6 text-amber-600" />
          <div>
            <Title className="text-amber-900">Top Seller Alert</Title>
            <Text className="text-amber-700">
              <strong>{metrics.topSellingProduct}</strong> is trending with $425K MTD revenue. 
              Consider promoting to dealers with low repeat rates.
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}