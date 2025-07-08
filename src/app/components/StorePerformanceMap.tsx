'use client';

import { useEffect, useState } from 'react';
import { Card, Title, Text, Metric, Grid, BarChart, DonutChart, LineChart } from '@tremor/react';
import { MapPin, DollarSign, Users, Star, Clock, Smartphone, TrendingUp, Building } from 'lucide-react';

type StoreData = {
  summary: {
    totalStores: number;
    totalRevenue: number;
    totalCustomers: number;
    averageRating: number;
  };
  topStores: Array<{
    city: string;
    revenue: number;
    customers: number;
    rating: number;
    growth: number;
  }>;
  satisfactionLeaders: Array<{
    name: string;
    rating: number;
    reviews: number;
  }>;
  deviceSales: Array<{
    device: string;
    sales: number;
    percentage: number;
  }>;
  performanceTrends: Array<{
    month: string;
    revenue: number;
    customers: number;
    satisfaction: number;
  }>;
  storeDetails: Array<{
    id: number;
    city: string;
    address: string;
    revenue: number;
    customers: number;
    rating: number;
    staff: number;
    growth: number;
    lat: number;
    lng: number;
  }>;
};

export function StorePerformanceMap() {
  const [data, setData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/locations');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Failed to load store performance data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="professional-card p-8 rounded-2xl animate-pulse">
        <div className="text-gray-600">Loading store performance data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="professional-card p-8 rounded-2xl border-red-200">
        <div className="text-red-700">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="professional-card p-8 rounded-2xl">
        <div className="text-gray-600">No store data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="professional-card p-8 rounded-2xl">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <Title className="text-3xl font-bold text-gray-900">Colorado Store Performance</Title>
            <Text className="text-gray-600 text-lg mt-2">Real-time analytics across all Boost Mobile locations</Text>
          </div>
        </div>

        {/* Summary Stats */}
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
          <div className="metric-card">
            <div className="flex items-center space-x-3 mb-3">
              <Building className="w-5 h-5 text-blue-500" />
              <Text className="text-gray-500 text-sm">Total Locations</Text>
            </div>
            <Metric className="text-gray-900 text-2xl font-bold">{data.summary.totalStores}</Metric>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-3 mb-3">
              <DollarSign className="w-5 h-5 text-green-500" />
              <Text className="text-gray-500 text-sm">Combined Revenue</Text>
            </div>
            <Metric className="text-gray-900 text-2xl font-bold">
              ${(data.summary.totalRevenue / 1000000).toFixed(1)}M
            </Metric>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="w-5 h-5 text-purple-500" />
              <Text className="text-gray-500 text-sm">Total Customers</Text>
            </div>
            <Metric className="text-gray-900 text-2xl font-bold">
              {(data.summary.totalCustomers / 1000).toFixed(1)}K
            </Metric>
          </div>

          <div className="metric-card">
            <div className="flex items-center space-x-3 mb-3">
              <Star className="w-5 h-5 text-amber-500" />
              <Text className="text-gray-500 text-sm">Average Rating</Text>
            </div>
            <Metric className="text-gray-900 text-2xl font-bold">{data.summary.averageRating.toFixed(1)}/5.0</Metric>
          </div>
        </Grid>
      </div>

      {/* Performance Charts */}
      <Grid numItems={1} numItemsLg={2} className="gap-8">
        <Card className="chart-container">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <Title className="text-xl font-semibold text-gray-900">Top Performing Locations</Title>
              <Text className="text-gray-600 mt-1">Ranked by monthly revenue performance</Text>
            </div>
          </div>

          <div className="space-y-4">
            {data.topStores.slice(0, 5).map((store, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{idx + 1}</span>
                  </div>
                  <div>
                    <Text className="font-semibold text-gray-900">{store.city}</Text>
                    <Text className="text-gray-500 text-sm">{store.customers} customers</Text>
                  </div>
                </div>
                <div className="text-right">
                  <Text className="font-bold text-gray-900">${(store.revenue / 1000).toFixed(0)}K</Text>
                  <Text className="text-green-600 text-sm">+{store.growth.toFixed(1)}%</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="chart-container">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <Title className="text-xl font-semibold text-gray-900">Customer Satisfaction Leaders</Title>
              <Text className="text-gray-600 mt-1">Highest rated locations by customer feedback</Text>
            </div>
          </div>

          <div className="space-y-4">
            {data.satisfactionLeaders.slice(0, 5).map((city, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <Text className="font-semibold text-gray-900">{city.name}</Text>
                    <Text className="text-gray-500 text-sm">{city.reviews} reviews</Text>
                  </div>
                </div>
                <div className="text-right">
                  <Text className="font-bold text-gray-900">{city.rating.toFixed(1)}/5.0</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* Store Details Grid */}
      <div className="professional-card p-8 rounded-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <Title className="text-xl font-semibold text-gray-900">Individual Store Performance</Title>
            <Text className="text-gray-600">Detailed metrics for each Colorado location</Text>
          </div>
        </div>

        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
          {data.storeDetails.slice(0, 6).map((store) => (
            <Card key={store.id} className="metric-card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <Title className="text-lg font-semibold text-gray-900">{store.city}</Title>
                    <Text className="text-gray-500 text-sm">{store.address}</Text>
                  </div>
                </div>
              </div>

              <Grid numItems={2} className="gap-4 mb-4">
                <div>
                  <Text className="text-gray-500 text-sm">Revenue</Text>
                  <Text className="font-bold text-gray-900 text-lg">
                    ${(store.revenue / 1000).toFixed(0)}K
                  </Text>
                </div>

                <div>
                  <Text className="text-gray-500 text-sm">Customers</Text>
                  <Text className="font-bold text-gray-900 text-lg">
                    {store.customers}
                  </Text>
                </div>

                <div>
                  <Text className="text-gray-500 text-sm">Rating</Text>
                  <Text className="font-bold text-gray-900 text-lg">
                    {store.rating.toFixed(1)}/5.0
                  </Text>
                </div>

                <div>
                  <Text className="text-gray-500 text-sm">Staff</Text>
                  <Text className="font-bold text-gray-900 text-lg">
                    {store.staff}
                  </Text>
                </div>
              </Grid>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Text className="text-gray-500">Growth</Text>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  store.growth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {store.growth > 0 ? '+' : ''}{store.growth.toFixed(1)}%
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </div>

      {/* Charts */}
      <Grid numItems={1} numItemsLg={2} className="gap-8">
        <Card className="chart-container">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <Title className="text-xl font-semibold text-gray-900">Device Sales Distribution</Title>
              <Text className="text-gray-600 mt-1">Popular devices across all Colorado locations</Text>
            </div>
          </div>
          <DonutChart
            className="h-80"
            data={data.deviceSales}
            category="sales"
            index="device"
            valueFormatter={(number) => `${number} units`}
            colors={["blue", "purple", "green", "amber", "red"]}
          />
        </Card>

        <Card className="chart-container">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <Title className="text-xl font-semibold text-gray-900">Performance Trends</Title>
              <Text className="text-gray-600 mt-1">Monthly performance across key metrics</Text>
            </div>
          </div>
          <LineChart
            className="h-80"
            data={data.performanceTrends}
            index="month"
            categories={["revenue", "customers", "satisfaction"]}
            colors={["blue", "green", "amber"]}
            valueFormatter={(value) => 
              typeof value === 'number' ? 
                (value > 100 ? `$${(value / 1000).toFixed(0)}K` : `${value.toFixed(1)}`) : 
                String(value)
            }
          />
        </Card>
      </Grid>
    </div>
  );
}