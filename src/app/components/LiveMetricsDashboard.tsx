'use client';

import { useState, useEffect } from 'react';
import { Card, Title, Text, Metric, Grid, AreaChart, DonutChart, Badge } from '@tremor/react';
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
  Heart,
  AlertTriangle,
  AlertCircle,
  TrendingDown
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
  // Generate realistic metrics based on Hooker's actual $397M revenue and business segments
  const generateRealisticMetrics = () => {
    const now = new Date();
    
    return {
      // Core Business Segment Performance (matching Hooker's 3 segments)
      segmentPerformance: {
        hookerBranded: {
          revenue: 146470, // $146.47M actual
          marginPercent: 30.9, // Actual gross margin
          operatingMargin: -0.7, // Actual operating margin
          orderBacklog: 11984, // $11.98M actual backlog
          marketShareGrowth: '+3-15 bps' // Real metric from earnings
        },
        homeMeridian: {
          revenue: 130816, // $130.82M actual  
          marginPercent: 19.4, // Actual gross margin
          operatingMargin: -6.4, // Actual operating margin
          orderBacklog: 21002, // $21.00M actual backlog
          hospitality: 'Strong' // Key growth driver mentioned
        },
        domesticUpholstery: {
          revenue: 114216, // $114.22M actual
          marginPercent: 16.0, // Actual gross margin
          operatingMargin: -4.7, // Actual operating margin
          orderBacklog: 18123, // $18.12M actual backlog
          sunsetWestGrowth: '+6.8%' // Actual growth rate
        }
      },

      // Critical Financial KPIs from actual earnings
      financialMetrics: {
        quarterlyRevenue: 104460, // Q4 actual $104.46M
        grossMargin: 23.3, // Actual Q4 gross margin
        operatingLoss: -2655, // Actual Q4 operating loss $2.66M
        cashPosition: 6295, // Actual cash $6.30M
        borrowingCapacity: 41000, // $41M available capacity
        inventoryInvestment: 70755, // $70.76M inventory
        costSavingsTarget: 18000 // $18-20M cost savings target
      },

      // Retailer Partner Support Analytics (replacing store metrics)
      retailerSupport: {
        activeDealers: 3000 + Math.floor(Math.random() * 200), // "Over 3,000 authorized dealers"
        topDealerPerformance: [
          { name: 'UrbanLoft Partners', revenue: 892000, aov: 892, satisfaction: 4.8 },
          { name: 'HomeStyle Group', revenue: 840000, aov: 840, satisfaction: 4.7 },
          { name: 'DécorPoint Network', revenue: 815000, aov: 815, satisfaction: 4.6 },
          { name: 'ModernMakers Inc', revenue: 778000, aov: 778, satisfaction: 4.5 },
          { name: 'ClassicDesigns Ltd', revenue: 760000, aov: 760, satisfaction: 4.4 }
        ],
        dealerSupportTickets: 89 + Math.floor(Math.random() * 20),
        avgResolutionTime: 4.2, // hours
        dealerSatisfactionScore: 89.5
      },

      // Manufacturing & Supply Chain (real pain points from earnings)
      operationalMetrics: {
        vietnamWarehouseStatus: 'Opening May 2025', // Real project
        savannahExitProgress: '60%', // Real facility closure
        manufacturingUtilization: 78 + Math.floor(Math.random() * 15),
        containerMixingEfficiency: 84 + Math.floor(Math.random() * 10),
        leadTimeReduction: '-15%', // Target improvement
        inventoryTurns: 5.6 + (Math.random() * 0.8)
      },

      // Product Line Performance (real brands)
      productLines: {
        bradingtonYoung: {
          orderGrowth: 13, // "Double-digit growth" mentioned
          marginTrend: '+2.1%',
          backlogHealth: 'Strong'
        },
        hfCustom: {
          orderGrowth: 11,
          customizationRate: 67, // % of orders with customization
          avgLeadTime: 8.5 // weeks
        },
        sunsetWest: {
          consecutiveGrowthQuarters: 4, // "Four consecutive quarters"
          eastCoastExpansion: 'Active',
          seasonalIndex: 0.85 // Q4 seasonal softness noted
        },
        pulaskiFurniture: {
          hospitality: 'Strong growth',
          traditionalChannels: 'Soft demand',
          pricePoint: 'Medium'
        }
      },

      // Risk Indicators (from actual challenges)
      riskMetrics: {
        housingMarketImpact: 'High Risk', // "50-year low in existing home sales"
        tariffExposure: 'Medium-High', // Mentioned concern
        customerConcentration: 'Medium', // A few large customers
        macroeconomicPressure: 'High' // Broad industry headwinds
      }
    };
  };

  const metrics = generateRealisticMetrics();

  return (
    <div className="space-y-8">
      {/* Executive Summary - Real Financial Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-blue-600 font-medium">Quarterly Revenue</Text>
              <Metric className="text-blue-900">${(metrics.financialMetrics.quarterlyRevenue / 1000).toFixed(1)}M</Metric>
              <Text className="text-blue-600 text-sm">+8% vs PY (53rd week)</Text>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-orange-600 font-medium">Operating Margin</Text>
              <Metric className="text-orange-900">{metrics.financialMetrics.operatingLoss < 0 ? '' : '+'}{((metrics.financialMetrics.operatingLoss / metrics.financialMetrics.quarterlyRevenue) * 100).toFixed(1)}%</Metric>
              <Text className="text-orange-600 text-sm">Cost reduction initiatives active</Text>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-green-600 font-medium">Market Share Trend</Text>
              <Metric className="text-green-900">+3-15bp</Metric>
              <Text className="text-green-600 text-sm">Every quarter growth FY25</Text>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-purple-600 font-medium">Active Dealers</Text>
              <Metric className="text-purple-900">{(metrics.retailerSupport.activeDealers / 1000).toFixed(1)}K+</Metric>
              <Text className="text-purple-600 text-sm">Authorized dealer network</Text>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Business Segment Performance - Hooker's 3 Real Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Sofa className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <Title className="text-gray-900">Hooker Branded</Title>
              <Text className="text-gray-500">36.9% of Revenue</Text>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Text>Revenue</Text>
              <Text className="font-bold">${(metrics.segmentPerformance.hookerBranded.revenue / 1000).toFixed(1)}M</Text>
            </div>
            <div className="flex justify-between">
              <Text>Gross Margin</Text>
              <Text className="font-bold">{metrics.segmentPerformance.hookerBranded.marginPercent}%</Text>
            </div>
            <div className="flex justify-between">
              <Text>Backlog</Text>
              <Text className="font-bold">${(metrics.segmentPerformance.hookerBranded.orderBacklog / 1000).toFixed(1)}M</Text>
            </div>
            <div className="flex justify-between">
              <Text>Market Share</Text>
              <Text className="font-bold text-green-600">{metrics.segmentPerformance.hookerBranded.marketShareGrowth}</Text>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <Title className="text-gray-900">Home Meridian</Title>
              <Text className="text-gray-500">32.9% of Revenue</Text>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Text>Revenue</Text>
              <Text className="font-bold">${(metrics.segmentPerformance.homeMeridian.revenue / 1000).toFixed(1)}M</Text>
            </div>
            <div className="flex justify-between">
              <Text>Gross Margin</Text>
              <Text className="font-bold">{metrics.segmentPerformance.homeMeridian.marginPercent}%</Text>
            </div>
            <div className="flex justify-between">
              <Text>Backlog</Text>
              <Text className="font-bold">${(metrics.segmentPerformance.homeMeridian.orderBacklog / 1000).toFixed(1)}M</Text>
            </div>
            <div className="flex justify-between">
              <Text>Hospitality</Text>
              <Text className="font-bold text-green-600">{metrics.segmentPerformance.homeMeridian.hospitality}</Text>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <Title className="text-gray-900">Domestic Upholstery</Title>
              <Text className="text-gray-500">28.7% of Revenue</Text>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <Text>Revenue</Text>
              <Text className="font-bold">${(metrics.segmentPerformance.domesticUpholstery.revenue / 1000).toFixed(1)}M</Text>
            </div>
            <div className="flex justify-between">
              <Text>Gross Margin</Text>
              <Text className="font-bold">{metrics.segmentPerformance.domesticUpholstery.marginPercent}%</Text>
            </div>
            <div className="flex justify-between">
              <Text>Backlog</Text>
              <Text className="font-bold">${(metrics.segmentPerformance.domesticUpholstery.orderBacklog / 1000).toFixed(1)}M</Text>
            </div>
            <div className="flex justify-between">
              <Text>Sunset West</Text>
              <Text className="font-bold text-green-600">{metrics.segmentPerformance.domesticUpholstery.sunsetWestGrowth}</Text>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Dealer Partners Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Title className="mb-4">Top Dealer Partners</Title>
          <div className="space-y-3">
            {metrics.retailerSupport.topDealerPerformance.map((dealer, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <Text className="font-medium">{dealer.name}</Text>
                  <Text className="text-sm text-gray-500">AOV: ${dealer.aov}</Text>
                </div>
                <div className="text-right">
                  <Text className="font-bold">${(dealer.revenue / 1000).toFixed(0)}K</Text>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <Text className="text-sm">{dealer.satisfaction}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Title className="mb-4">Operational Excellence</Title>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Text>Vietnam Warehouse</Text>
              <Badge color="blue">{metrics.operationalMetrics.vietnamWarehouseStatus}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Text>Savannah Exit Progress</Text>
              <Badge color="orange">{metrics.operationalMetrics.savannahExitProgress}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <Text>Manufacturing Utilization</Text>
              <Text className="font-bold">{metrics.operationalMetrics.manufacturingUtilization}%</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text>Inventory Turns</Text>
              <Text className="font-bold">{metrics.operationalMetrics.inventoryTurns.toFixed(1)}x</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text>Cost Savings Target</Text>
              <Text className="font-bold text-green-600">${(metrics.financialMetrics.costSavingsTarget / 1000).toFixed(0)}M</Text>
            </div>
          </div>
        </Card>
      </div>

      {/* Risk Dashboard */}
      <Card className="p-6">
        <Title className="mb-4">Strategic Risk Monitor</Title>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <Text className="font-medium">Housing Market</Text>
            <Badge color="red">{metrics.riskMetrics.housingMarketImpact}</Badge>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <AlertCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <Text className="font-medium">Tariff Exposure</Text>
            <Badge color="orange">{metrics.riskMetrics.tariffExposure}</Badge>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <Text className="font-medium">Customer Concentration</Text>
            <Badge color="yellow">{metrics.riskMetrics.customerConcentration}</Badge>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <TrendingDown className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <Text className="font-medium">Macro Pressure</Text>
            <Badge color="red">{metrics.riskMetrics.macroeconomicPressure}</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}