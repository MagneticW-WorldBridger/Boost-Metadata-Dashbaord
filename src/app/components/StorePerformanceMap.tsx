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
          totalDealers: 285, // More realistic authorized dealer count
          totalRevenue: 847000, // Consistent with daily metrics
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
            revenue: 332000,
            employeeCount: 45,
            lat: 35.9557,
            lng: -80.0053
          }
        ],
        topProducts: [
          { sku: "BRAD-YOUNG", name: "Bradington-Young Leather", revenue: 195000, orders: 340 },
          { sku: "HF-CUSTOM", name: "HF Custom Upholstery", revenue: 165000, orders: 285 },
          { sku: "HOOKER-CASE", name: "Hooker Casegoods", revenue: 150000, orders: 245 },
          { sku: "PULASKI", name: "Pulaski Furniture", revenue: 142000, orders: 220 },
          { sku: "SHENANDOAH", name: "Shenandoah Furniture", revenue: 95000, orders: 165 }
        ],
        dealerRegions: [
          { region: 'Southeast (VA/NC/SC)', dealerCount: 85, totalRevenue: 245000, avgAOV: 825 },
          { region: 'Northeast (NY/NJ/PA)', dealerCount: 72, totalRevenue: 198000, avgAOV: 780 },
          { region: 'Midwest (IL/IN/OH)', dealerCount: 58, totalRevenue: 165000, avgAOV: 745 },
          { region: 'Southwest (TX/OK/AR)', dealerCount: 42, totalRevenue: 142000, avgAOV: 695 },
          { region: 'West Coast (CA/NV/WA)', dealerCount: 28, totalRevenue: 97000, avgAOV: 890 }
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