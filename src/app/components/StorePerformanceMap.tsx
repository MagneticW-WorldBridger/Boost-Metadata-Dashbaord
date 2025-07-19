'use client';

import { useEffect, useState } from 'react';
import { Card, Title, Text, Metric, Grid, DonutChart, Badge } from '@tremor/react';
import { MapPin, Users, DollarSign, Star, TrendingUp, Building2, Package, Sofa } from 'lucide-react';

type FacilityData = {
  summary: {
    totalFacilities: number;
    totalDealers: number;
    totalRevenue: number;
    avgDealerRating: number;
  };
  topFacilities: Array<{
    id: number;
    name: string;
    city: string;
    state: string;
    address: string;
    type: string;
    productionCapacity: number;
    utilizationRate: number;
    revenue: number;
    employeeCount: number;
    lat: number;
    lng: number;
  }>;
  topProducts: Array<{
    sku: string;
    name: string;
    revenue: number;
    orders: number;
  }>;
  dealerRegions: Array<{
    region: string;
    dealerCount: number;
    totalRevenue: number;
    avgAOV: number;
  }>;
};

export function StorePerformanceMap() {
  const [data, setData] = useState<FacilityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate Hooker Furniture facilities data based on HOOKERCONVOS.MD
    const generateFacilityData = (): FacilityData => {
      return {
        summary: {
          totalFacilities: 10,
          totalDealers: 3000,
          totalRevenue: 1847000, // $1.8M from Q2 data
          avgDealerRating: 4.6
        },
        topFacilities: [
          {
            id: 1,
            name: "Martinsville Corporate HQ",
            city: "Martinsville",
            state: "VA",
            address: "1000 Furniture Blvd, Martinsville, VA 24112",
            type: "Corporate HQ & Casegoods",
            productionCapacity: 15000,
            utilizationRate: 87,
            revenue: 425000,
            employeeCount: 425,
            lat: 36.6904,
            lng: -79.8728
          },
          {
            id: 2,
            name: "Salem Upholstery",
            city: "Salem",
            state: "VA", 
            address: "500 Manufacturing Dr, Salem, VA 24153",
            type: "Upholstery Manufacturing",
            productionCapacity: 8500,
            utilizationRate: 92,
            revenue: 390000,
            employeeCount: 285,
            lat: 37.2935,
            lng: -80.0547
          },
          {
            id: 3,
            name: "Elkin Distribution Center",
            city: "Elkin",
            state: "NC",
            address: "200 Logistics Way, Elkin, NC 28621",
            type: "Primary Distribution",
            productionCapacity: 12000,
            utilizationRate: 78,
            revenue: 375000,
            employeeCount: 156,
            lat: 36.2440,
            lng: -80.8490
          },
          {
            id: 4,
            name: "Hickory Bradington-Young",
            city: "Hickory", 
            state: "NC",
            address: "300 Upholstery St, Hickory, NC 28601",
            type: "Bradington-Young Upholstery",
            productionCapacity: 7200,
            utilizationRate: 85,
            revenue: 350000,
            employeeCount: 198,
            lat: 35.7344,
            lng: -81.3444
          },
          {
            id: 5,
            name: "High Point Showroom",
            city: "High Point",
            state: "NC",
            address: "400 Market Sq, High Point, NC 27260",
            type: "Trade Showroom",
            productionCapacity: 0,
            utilizationRate: 95,
            revenue: 332000,
            employeeCount: 45,
            lat: 35.9557,
            lng: -80.0053
          }
        ],
        topProducts: [
          { sku: "HF-3124", name: "Savion Deux", revenue: 425000, orders: 1240 },
          { sku: "HF-5560", name: "Jericho Power", revenue: 390000, orders: 1180 },
          { sku: "HF-2008", name: "Riverton", revenue: 375000, orders: 1095 },
          { sku: "HF-4812", name: "Nelson Zero-G", revenue: 350000, orders: 1023 },
          { sku: "HF-1103", name: "Fairfax", revenue: 332000, orders: 987 }
        ],
        dealerRegions: [
          { region: "Virginia", dealerCount: 960, totalRevenue: 589600, avgAOV: 892 },
          { region: "North Carolina", dealerCount: 840, totalRevenue: 478800, avgAOV: 840 },
          { region: "Georgia", dealerCount: 360, totalRevenue: 293400, avgAOV: 815 },
          { region: "Texas", dealerCount: 240, totalRevenue: 186720, avgAOV: 778 },
          { region: "California", dealerCount: 210, totalRevenue: 159600, avgAOV: 760 }
        ]
      };
    };

    setData(generateFacilityData());
    setLoading(false);
  }, []);

  if (loading) return <div>Loading facility data...</div>;
  if (!data) return <div>No facility data available</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Title className="text-3xl font-bold text-gray-900">Manufacturing Facilities & Dealer Network</Title>
          <Text className="text-gray-600 text-lg mt-2">Real-time analytics across Hooker Furniture's operations network</Text>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-100 text-green-700">
            {data.summary.totalFacilities} Active Facilities
          </Badge>
          <Badge className="bg-blue-100 text-blue-700">
            {data.summary.totalDealers.toLocaleString()} Dealer Partners
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Manufacturing Facilities</Text>
              <Metric className="text-gray-900 text-2xl font-bold">{data.summary.totalFacilities}</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Dealer Partners</Text>
              <Metric className="text-gray-900 text-2xl font-bold">{data.summary.totalDealers.toLocaleString()}</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Total Revenue (MTD)</Text>
              <Metric className="text-gray-900 text-2xl font-bold">${(data.summary.totalRevenue / 1000).toFixed(0)}K</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Avg Dealer Rating</Text>
              <Metric className="text-gray-900 text-2xl font-bold">{data.summary.avgDealerRating}⭐</Metric>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Facilities Performance */}
      <Card>
        <Title>Top Manufacturing Facilities</Title>
        <Text className="text-gray-600">Performance metrics for key production and distribution centers</Text>
        <div className="space-y-4 mt-6">
          {data.topFacilities.slice(0, 5).map((facility, idx) => (
            <div key={facility.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{idx + 1}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <Text className="font-semibold text-gray-900">{facility.name}</Text>
                    <Text className="text-gray-500 text-sm">{facility.address}</Text>
                  </div>
                </div>
                <Badge className={`${
                  facility.type.includes('Corporate') ? 'bg-purple-100 text-purple-700' :
                  facility.type.includes('Manufacturing') ? 'bg-blue-100 text-blue-700' :
                  facility.type.includes('Distribution') ? 'bg-green-100 text-green-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {facility.type}
                </Badge>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <Text className="text-gray-500 text-sm">Revenue</Text>
                  <Text className="font-bold">${(facility.revenue / 1000).toFixed(0)}K</Text>
                </div>
                <div className="text-right">
                  <Text className="text-gray-500 text-sm">Utilization</Text>
                  <Text className="font-bold text-green-600">{facility.utilizationRate}%</Text>
                </div>
                <div className="text-right">
                  <Text className="text-gray-500 text-sm">Employees</Text>
                  <Text className="font-bold">{facility.employeeCount}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card>
          <Title>Top SKU Performance</Title>
          <Text className="text-gray-600 mb-4">Revenue by top-performing furniture SKUs</Text>
          <DonutChart
            className="h-72"
            data={data.topProducts}
            category="revenue"
            index="name"
            valueFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            colors={["blue", "green", "amber", "red", "purple"]}
          />
        </Card>

        <Card>
          <Title>Dealer Regional Distribution</Title>
          <Text className="text-gray-600 mb-4">Dealer count and performance by region</Text>
          <div className="space-y-4">
            {data.dealerRegions.map((region, idx) => (
              <div key={region.region} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">{idx + 1}</span>
                  </div>
                  <Text className="font-semibold">{region.region}</Text>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <Text className="text-xs text-gray-500">Dealers</Text>
                    <Text className="font-bold">{region.dealerCount}</Text>
                  </div>
                  <div className="text-right">
                    <Text className="text-xs text-gray-500">Revenue</Text>
                    <Text className="font-bold">${(region.totalRevenue / 1000).toFixed(0)}K</Text>
                  </div>
                  <div className="text-right">
                    <Text className="text-xs text-gray-500">Avg AOV</Text>
                    <Text className="font-bold text-green-600">${region.avgAOV}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  );
}