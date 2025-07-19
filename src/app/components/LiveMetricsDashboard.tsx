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
  Truck
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
        totalOrderValueToday: 1847000 + Math.random() * 200000, // $1.8M+ based on Q2 revenue
        dealersServedToday: 156 + Math.floor(Math.random() * 20),
        averageResponseTime: 1.8 + Math.random() * 0.4, // Under 2 min SLA target
        activeSalesAgents: 8 + Math.floor(Math.random() * 2),
        topSellingProduct: "HF-3124 Savion Deux", // From conversation data
        dealerSatisfactionLive: 90.8 + Math.random() * 2,
        revenueGrowth: 12.4 + Math.random() * 2,
        slaComplianceRate: 94.2 + Math.random() * 3, // From SLA data
        hourlyData: Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          orders: i === 10 ? 182 : Math.floor(Math.random() * 150) + 50, // Peak at 10-11 AM
          dealers: Math.floor(Math.random() * 30) + 10,
          chats: i === 10 ? 182 : Math.floor(Math.random() * 140) + 80 // Monday 10-11 AM peak
        })),
        productMix: [
          { name: 'HF-3124 Savion Deux', value: 425, color: '#8B4513' },
          { name: 'HF-5560 Jericho Power', value: 390, color: '#A0522D' },
          { name: 'HF-2008 Riverton', value: 375, color: '#CD853F' },
          { name: 'HF-4812 Nelson Zero-G', value: 350, color: '#D2691E' },
          { name: 'Other SKUs', value: 307, color: '#DEB887' }
        ],
        dealerPerformance: [
          { dealer: 'UrbanLoft', aov: 892, repeatRate: 48.2, rating: 4.8 },
          { dealer: 'HomeStyle', aov: 840, repeatRate: 44.1, rating: 4.4 },
          { dealer: 'DécorPoint', aov: 815, repeatRate: 45.7, rating: 4.7 },
          { dealer: 'ModernMakers', aov: 778, repeatRate: 36.7, rating: 4.5 },
          { dealer: 'ClassicDesigns', aov: 760, repeatRate: 38.2, rating: 4.6 }
        ],
        outOfStockAlerts: 3 + Math.floor(Math.random() * 3), // Based on OOS frequency data
        customOrdersToday: 47 + Math.floor(Math.random() * 10), // 21% of chats are custom orders
        warrantyClaimsToday: 12 + Math.floor(Math.random() * 5) // Return rate patterns
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
      <div className="flex items-center justify-between">
        <div>
          <Title className="text-2xl font-bold">Live Dealer Analytics</Title>
          <Text className="text-gray-600">Real-time B2B furniture manufacturing metrics</Text>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isLive 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isLive ? 'LIVE' : 'PAUSED'}</span>
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Updated {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Total Order Value Today</Text>
              <Metric className="text-2xl font-bold">${(metrics.totalOrderValueToday / 1000).toFixed(0)}K</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Dealers Served Today</Text>
              <Metric className="text-2xl font-bold">{metrics.dealersServedToday}</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Avg Response Time</Text>
              <Metric className="text-2xl font-bold">{metrics.averageResponseTime.toFixed(1)}m</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">SLA Compliance</Text>
              <Metric className="text-2xl font-bold">{metrics.slaComplianceRate.toFixed(1)}%</Metric>
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