'use client';

import { useEffect, useState } from 'react';
import { Card, Title, Text, BarChart, DonutChart, LineChart, Badge, Metric, Grid } from '@tremor/react';
import { TrendingUp, Users, MessageSquare, Target, Clock, BarChart3, Zap, Brain, Star, DollarSign, Sofa, Activity, Shield, AlertTriangle, CheckCircle, Package, Building2 } from 'lucide-react';

type FurnitureTopicData = {
  topicDistribution: Array<{
    topic: string;
    count: number;
    dealerVisitsNeeded: number;
    resolutionRate: number;
  }>;
  categoryBreakdown: {
    'Custom Orders': number;
    'Warranty Claims': number;
    'Finish Samples': number;
    'Inventory': number;
    'Dealer Relations': number;
  };
  sentimentAnalysis: Array<{
    sentiment: string;
    count: number;
    percentage: number;
  }>;
  timeDistribution: Array<{
    hour: number;
    conversation_count: number;
  }>;
  enhancedKeywords: Array<{
    word: string;
    frequency: number;
    category: string;
  }>;
  summary: {
    totalTopics: number;
    mostDiscussedTopic: string;
    averageDealerSatisfaction: number;
  };
  dealerTypes: Array<{
    type: string;
    percentage: number;
    avgOrderValue: number;
  }>;
  topProducts: Array<{
    sku: string;
    name: string;
    mentions: number;
    revenue: number;
  }>;
};

export function EnhancedTopicAnalysis() {
  const [data, setData] = useState<FurnitureTopicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate Hooker Furniture conversation analytics based on HOOKERCONVOS.MD
    const generateFurnitureData = (): FurnitureTopicData => {
      return {
        topicDistribution: [
          { topic: 'Finish & Color Availability', count: 225, dealerVisitsNeeded: 18, resolutionRate: 79.0 },
          { topic: 'Leather Options & Grades', count: 193, dealerVisitsNeeded: 12, resolutionRate: 72.0 },
          { topic: 'Custom Dimensions Requests', count: 148, dealerVisitsNeeded: 35, resolutionRate: 68.0 },
          { topic: 'Warranty Coverage & Claims', count: 116, dealerVisitsNeeded: 8, resolutionRate: 75.0 },
          { topic: 'Lead Time Estimates', count: 91, dealerVisitsNeeded: 5, resolutionRate: 85.0 },
          { topic: 'Out of Stock Alerts', count: 78, dealerVisitsNeeded: 2, resolutionRate: 95.0 },
          { topic: 'Dealer Performance Metrics', count: 65, dealerVisitsNeeded: 15, resolutionRate: 88.0 },
          { topic: 'Showroom Appointments', count: 52, dealerVisitsNeeded: 25, resolutionRate: 92.0 }
        ],
        categoryBreakdown: {
          'Custom Orders': 148,
          'Warranty Claims': 116,
          'Finish Samples': 225,
          'Inventory': 169,
          'Dealer Relations': 65
        },
        sentimentAnalysis: [
          { sentiment: 'Positive/Praise', count: 680, percentage: 68.0 },
          { sentiment: 'Neutral/Informational', count: 220, percentage: 22.0 },
          { sentiment: 'Negative/Frustration', count: 100, percentage: 10.0 }
        ],
        timeDistribution: [
          { hour: 8, conversation_count: 45 },
          { hour: 9, conversation_count: 89 },
          { hour: 10, conversation_count: 182 }, // Peak Monday 10-11 AM
          { hour: 11, conversation_count: 168 },
          { hour: 12, conversation_count: 125 },
          { hour: 13, conversation_count: 98 },
          { hour: 14, conversation_count: 176 }, // Secondary peak Tuesday 2-3 PM
          { hour: 15, conversation_count: 162 },
          { hour: 16, conversation_count: 134 },
          { hour: 17, conversation_count: 78 }
        ],
        enhancedKeywords: [
          { word: 'finish sample', frequency: 156, category: 'samples' },
          { word: 'custom dimensions', frequency: 142, category: 'custom' },
          { word: 'out of stock', frequency: 89, category: 'inventory' },
          { word: 'warranty claim', frequency: 76, category: 'warranty' },
          { word: 'leather grade', frequency: 68, category: 'materials' },
          { word: 'lead time', frequency: 54, category: 'delivery' },
          { word: 'AOV tracking', frequency: 42, category: 'metrics' },
          { word: 'dealer rating', frequency: 38, category: 'performance' }
        ],
        summary: {
          totalTopics: 8,
          mostDiscussedTopic: 'Finish & Color Availability',
          averageDealerSatisfaction: 90.8
        },
        dealerTypes: [
          { type: 'Resellers', percentage: 82, avgOrderValue: 815 },
          { type: 'Designers', percentage: 13, avgOrderValue: 1240 },
          { type: 'Direct Consumers', percentage: 5, avgOrderValue: 650 }
        ],
        topProducts: [
          { sku: 'HF-3124', name: 'Savion Deux', mentions: 230, revenue: 425000 },
          { sku: 'HF-5560', name: 'Jericho Power', mentions: 195, revenue: 390000 },
          { sku: 'HF-2008', name: 'Riverton', mentions: 162, revenue: 375000 },
          { sku: 'HF-4812', name: 'Nelson Zero-G', mentions: 148, revenue: 350000 },
          { sku: 'HF-1103', name: 'Fairfax', mentions: 123, revenue: 332000 }
        ]
      };
    };

    setData(generateFurnitureData());
    setLoading(false);
  }, []);

  if (loading) return <div>Loading furniture topic analysis...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Title className="text-2xl font-bold">Furniture Industry Topic Analysis</Title>
          <Text className="text-gray-600">B2B conversation patterns and dealer interaction insights</Text>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-100 text-green-700">
            {data.summary.averageDealerSatisfaction.toFixed(1)}% Dealer CSAT
          </Badge>
          <Badge className="bg-blue-100 text-blue-700">
            {data.summary.totalTopics} Active Topics
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Most Discussed</Text>
              <Metric className="text-lg font-bold">{data.summary.mostDiscussedTopic}</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Sofa className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Top Product Mentions</Text>
              <Metric className="text-lg font-bold">{data.topProducts[0].sku} {data.topProducts[0].name}</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Peak Chat Time</Text>
              <Metric className="text-lg font-bold">10-11 AM Mon</Metric>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <Text className="text-sm text-gray-600">Primary Audience</Text>
              <Metric className="text-lg font-bold">82% Resellers</Metric>
            </div>
          </div>
        </Card>
      </Grid>

      {/* Charts */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card>
          <Title>Topic Distribution by Volume</Title>
          <Text className="text-gray-600 mb-4">Most discussed furniture industry topics</Text>
          <BarChart
            className="h-80"
            data={data.topicDistribution}
            index="topic"
            categories={["count"]}
            colors={["blue"]}
            valueFormatter={(value) => `${value} conversations`}
            layout="vertical"
          />
        </Card>

        <Card>
          <Title>Conversation Categories</Title>
          <Text className="text-gray-600 mb-4">Distribution by business function</Text>
          <DonutChart
            className="h-80"
            data={Object.entries(data.categoryBreakdown).map(([category, count]) => ({
              category,
              count
            }))}
            category="count"
            index="category"
            valueFormatter={(value) => `${value} chats`}
            colors={["blue", "green", "yellow", "red", "purple"]}
          />
        </Card>
      </Grid>

      {/* Sentiment & Time Analysis */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card>
          <Title>Sentiment Analysis</Title>
          <Text className="text-gray-600 mb-4">Overall dealer conversation sentiment</Text>
          <div className="space-y-4">
            {data.sentimentAnalysis.map((sentiment, idx) => (
              <div key={sentiment.sentiment} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    sentiment.sentiment.includes('Positive') ? 'bg-green-500' :
                    sentiment.sentiment.includes('Negative') ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                  <Text className="font-medium">{sentiment.sentiment}</Text>
                </div>
                <div className="text-right">
                  <Text className="font-bold">{sentiment.percentage}%</Text>
                  <Text className="text-sm text-gray-600">({sentiment.count} conversations)</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Title>Hourly Chat Volume</Title>
          <Text className="text-gray-600 mb-4">Peak conversation times throughout the day</Text>
          <LineChart
            className="h-64"
            data={data.timeDistribution}
            index="hour"
            categories={["conversation_count"]}
            colors={["blue"]}
            valueFormatter={(value) => `${value} chats`}
          />
        </Card>
      </Grid>

      {/* Dealer Types & Top Products */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card>
          <Title>Dealer Type Distribution</Title>
          <Text className="text-gray-600 mb-4">Conversation volume by dealer category</Text>
          <div className="space-y-4">
            {data.dealerTypes.map((type, idx) => (
              <div key={type.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{idx + 1}</span>
                  </div>
                  <div>
                    <Text className="font-semibold">{type.type}</Text>
                    <Text className="text-sm text-gray-600">${type.avgOrderValue} avg AOV</Text>
                  </div>
                </div>
                <div className="text-right">
                  <Text className="font-bold text-2xl">{type.percentage}%</Text>
                  <Text className="text-sm text-gray-600">of conversations</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Title>Top Product Mentions</Title>
          <Text className="text-gray-600 mb-4">Most discussed SKUs by conversation volume</Text>
          <div className="space-y-4">
            {data.topProducts.map((product, idx) => (
              <div key={product.sku} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">{idx + 1}</span>
                  </div>
                  <div>
                    <Text className="font-semibold">{product.sku} {product.name}</Text>
                    <Text className="text-sm text-gray-600">${(product.revenue / 1000).toFixed(0)}K MTD revenue</Text>
                  </div>
                </div>
                <div className="text-right">
                  <Text className="font-bold">{product.mentions}</Text>
                  <Text className="text-sm text-gray-600">mentions</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>

      {/* Enhanced Keywords */}
      <Card>
        <Title>Key Conversation Terms</Title>
        <Text className="text-gray-600 mb-4">Most frequently mentioned furniture industry keywords</Text>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.enhancedKeywords.map((keyword, idx) => (
            <div key={keyword.word} className="p-4 bg-gray-50 rounded-lg text-center">
              <Text className="font-bold text-lg">{keyword.word}</Text>
              <Text className="text-sm text-gray-600">{keyword.frequency} mentions</Text>
              <Badge className={`mt-2 ${
                keyword.category === 'custom' ? 'bg-blue-100 text-blue-700' :
                keyword.category === 'warranty' ? 'bg-red-100 text-red-700' :
                keyword.category === 'samples' ? 'bg-green-100 text-green-700' :
                keyword.category === 'inventory' ? 'bg-orange-100 text-orange-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {keyword.category}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Resolution Rate Analysis */}
      <Card>
        <Title>Topic Resolution Effectiveness</Title>
        <Text className="text-gray-600 mb-4">Success rate by conversation topic</Text>
        <BarChart
          className="h-64"
          data={data.topicDistribution}
          index="topic"
          categories={["resolutionRate"]}
          colors={["green"]}
          valueFormatter={(value) => `${value}%`}
          layout="vertical"
        />
      </Card>
    </div>
  );
} 