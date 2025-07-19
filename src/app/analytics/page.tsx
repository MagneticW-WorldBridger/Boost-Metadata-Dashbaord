'use client';

import { useEffect, useState } from 'react';
import { Card, Title, Text, BarChart, Grid, Metric, List, ListItem, Badge, Tab, TabList, TabGroup, TabPanel, TabPanels, Divider, Button } from '@tremor/react';
import { ChatView, ChatSummary, ResponsePatternView } from '../components/ChatView';
import type { Message } from '../utils/chatParser';
import { AIChatIntelligence } from '../components/AIChatIntelligence';
import { EnhancedTopicAnalysis } from '../components/EnhancedTopicAnalysis';
import { EnhancedResponsePatterns } from '../components/EnhancedResponsePatterns';
import { StorePerformanceMap } from '../components/StorePerformanceMap';
import { LiveMetricsDashboard } from '../components/LiveMetricsDashboard';
import { 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Activity, 
  BarChart3, 
  Users2, 
  MessageCircle, 
  TrendingDown, 
  AlertCircle,
  ShoppingCart,
  Star,
  ThumbsUp,
  Clock,
  Zap,
  Bot,
  Eye,
  Edit3,
  CheckCircle,
  XCircle,
  Send,
  Sofa,
  Building2,
  Package,
  Truck,
  AlertTriangle,
  Heart,
  Hash,
  ChevronUp,
  ChevronDown,
  User,
  Smartphone,
  Brain,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

type AnalyticsData = {
  overview: {
    totalConversations: number;
    totalUserMessages: number;
    totalBotMessages: number;
    conversationsNeedingImprovement: number;
    improvementRate: string;
  };
  topicAnalysis: {
    distribution: Array<{
      topic: string;
      totalQueries: number;
      needsImprovement: number;
      improvementRate: string;
    }>;
    mostCommonTopic: string;
    mostImprovableArea: string;
  };
  responsePatterns: {
    categories: Array<{
      type: string;
      examples: Array<{
        query: string;
        response: string;
        timestamp: string;
      }>;
    }>;
    averageMessagesPerChat: number;
  };
  detailedConversations: Array<{
    messages: Message[];
    summary: string;
    originalTimestamp: string;
    customerType: string;
    salesIntent: string;
    deviceInterest: string;
    storeId: number;
    competitorMentioned: string | null;
    priceSensitivity: string;
    familyPlanInterest: boolean;
  }>;
  storeVisitRequirements?: Array<{
    topic: string;
    totalConversations: number;
    storeVisitRate: number;
    needStoreVisits: number;
    priority: string;
  }>;
  customerSentiment?: {
    totalAnalyzed: number;
    positive: number;
    neutral: number;
    negative: number;
    trends: {
      weekOverWeek: string;
      satisfaction: string;
      alerts: string[];
    };
  };
  topKeywordsByCategory?: Array<{
    category: string;
    keywords: string[];
    frequency: number;
  }>;
  peakPerformanceTimes?: Array<{
    hour: string;
    conversations: number;
    efficiency: number;
  }>;
};

const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'device interest':
      return 'blue';
    case 'plan inquiries':
      return 'green';
    case 'pricing concerns':
      return 'amber';
    case 'competitor mentions':
      return 'red';
    case 'needs store visit':
      return 'purple';
    case 'information gap':
      return 'yellow';
    default:
      return 'gray';
  }
};

export default function Page() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [curatedData, setCuratedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [proposedReply, setProposedReply] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showProposed, setShowProposed] = useState(false);
  const [selectedBotMessage, setSelectedBotMessage] = useState<{ id: string; content: string; proposed_reply?: string } | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [expandedConversations, setExpandedConversations] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const [analyticsResult, curatedResult] = await Promise.all([
          fetch('/api/analytics'),
          fetch('/api/curated-conversations')
        ]);
        
        const analyticsData = await analyticsResult.json();
        const curatedConversations = await curatedResult.json();
        
        if (analyticsData.error) throw new Error(analyticsData.error);
        if (curatedConversations.error) throw new Error(curatedConversations.error);
        
        setData(analyticsData);
        setCuratedData(curatedConversations);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <main className="p-4 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Title className="text-red-600">Error Loading Dashboard</Title>
          <Text>{error}</Text>
        </div>
      </main>
    );
  }

  if (!data || !curatedData || isLoading) {
    return (
      <main className="p-4 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Title>Loading Analytics...</Title>
          <div className="animate-pulse mt-4 space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 bg-gray-200 rounded-lg"></div>
              <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const topicData = data.topicAnalysis.distribution.map(topic => ({
    name: topic.topic,
    'Total Queries': topic.totalQueries,
    'Needs Improvement': topic.needsImprovement
  }));

  // Use curated conversations from conversations.md
  const needingImprovement = curatedData.detailedConversations.filter((c: any) => c.salesIntent === 'browsing' || c.salesIntent === 'comparing');
  const others = curatedData.detailedConversations.filter((c: any) => c.salesIntent === 'buying');

  const toggleConversationExpansion = (index: number) => {
    const newExpanded = new Set(expandedConversations);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedConversations(newExpanded);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative">
      <div className="max-w-[90rem] mx-auto p-8 space-y-12">
        {/* Professional Header */}
        <div className="header-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center border border-amber-200">
                    <Sofa className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h1 className="text-display gradient-text">Hooker Furniture</h1>
                    <p className="text-subtitle mt-1 text-gray-600">B2B Dealer Analytics & Manufacturing Intelligence</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-display gradient-text">Analytics Dashboard</h1>
                    <p className="text-subtitle mt-1 text-gray-600">Real-time dealer insights and inventory management</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="status-indicator online"></div>
                <div>
                  <Text className="text-green-700 font-semibold">SYSTEM OPERATIONAL</Text>
                  <Text className="text-caption text-gray-500">Real-time data active</Text>
                </div>
              </div>
              <div className="badge-success flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Live Updates</span>
              </div>
              <div className="badge-info flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Updated {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional KPI Cards */}
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
          <Card className="metric-card">
            <div className="flex items-center justify-between">
                          <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <Text className="text-caption text-gray-500">Total Dealer Interactions</Text>
                  <Metric className="text-3xl font-bold text-gray-900">{data.overview.totalConversations}</Metric>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-caption">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">{data.responsePatterns.averageMessagesPerChat.toFixed(1)} messages per conversation</span>
              </div>
            </div>
            </div>
          </Card>
          
          <Card className="metric-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <Text className="text-caption text-gray-500">Dealer Satisfaction</Text>
                    <Metric className="text-3xl font-bold text-gray-900">
              {(100 - parseFloat(data.overview.improvementRate)).toFixed(1)}%
            </Metric>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-caption">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Based on conversation quality analysis</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="metric-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <Text className="text-caption text-gray-500">Most Common Topic</Text>
                    <Metric className="text-xl font-bold text-gray-900">{data.topicAnalysis.mostCommonTopic}</Metric>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-caption">
                  <MessageCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-600">Frequently discussed by customers</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="metric-card">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <Text className="text-caption text-gray-500">Sales Opportunity</Text>
                    <Metric className="text-xl font-bold text-gray-900">{data.topicAnalysis.mostImprovableArea}</Metric>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-caption">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">Area needing sales focus</span>
                </div>
              </div>
            </div>
          </Card>
        </Grid>

        {/* Professional Tabs */}
        <div className="tab-container">
        <TabGroup>
            <TabList className="flex space-x-1 bg-gray-50 p-1 rounded-t-xl">
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <Activity className="w-4 h-4" />
                <span>Live Manufacturing</span>
              </Tab>
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <Building2 className="w-4 h-4" />
                <span>Facilities & Dealers</span>
              </Tab>
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <Users2 className="w-4 h-4" />
                <span>Dealer Analytics</span>
              </Tab>
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <MessageCircle className="w-4 h-4" />
                <span>Conversations</span>
              </Tab>
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <TrendingUp className="w-4 h-4" />
                <span>Topics & Trends</span>
              </Tab>
          </TabList>
            
            <TabPanels className="p-8 bg-white rounded-b-xl">
            <TabPanel>
              <LiveMetricsDashboard />
            </TabPanel>
            <TabPanel>
              <StorePerformanceMap />
            </TabPanel>
            <TabPanel>
                <div className="space-y-8">
                  {/* Store Visit Requirements */}
                  {data.storeVisitRequirements && (
                    <div className="space-y-6">
                      <div className="section-header">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Target className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h2 className="section-title text-gray-900">Store Visit Requirements by Topic</h2>
                          <p className="section-subtitle text-gray-600">Analysis of conversations requiring in-person assistance</p>
                        </div>
                      </div>
                      
                      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
                        {data.storeVisitRequirements.map((requirement, idx) => (
                          <Card key={idx} className="professional-card p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  requirement.priority === 'Critical' ? 'bg-red-100' :
                                  requirement.priority === 'High' ? 'bg-orange-100' : 'bg-yellow-100'
                                }`}>
                                  <Target className={`w-4 h-4 ${
                                    requirement.priority === 'Critical' ? 'text-red-600' :
                                    requirement.priority === 'High' ? 'text-orange-600' : 'text-yellow-600'
                                  }`} />
                                </div>
                                <div>
                                  <Title className="text-lg font-semibold text-gray-900">{requirement.topic}</Title>
                                  <Text className="text-gray-500 text-sm">{requirement.totalConversations} conversations</Text>
                                </div>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                requirement.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                requirement.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {requirement.priority}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <Text className="text-gray-600">Store Visit Rate</Text>
                                <Text className="font-bold text-gray-900">{requirement.storeVisitRate}%</Text>
                              </div>
                              <div className="flex justify-between items-center">
                                <Text className="text-gray-600">Need Store Visits</Text>
                                <Text className="font-bold text-orange-600">{requirement.needStoreVisits}</Text>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-orange-500 h-2 rounded-full" 
                                  style={{ width: `${requirement.storeVisitRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </Grid>
                    </div>
                  )}

                  {/* Customer Sentiment Analysis */}
                  {data.customerSentiment && (
                    <div className="space-y-6">
                      <div className="section-header">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Heart className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h2 className="section-title text-gray-900">Customer Sentiment Analysis</h2>
                          <p className="section-subtitle text-gray-600">Overall customer satisfaction and sentiment trends</p>
                        </div>
                        <div className="badge-success flex items-center space-x-2 ml-auto">
                          <TrendingUp className="w-4 h-4" />
                          <span>{data.customerSentiment.trends.weekOverWeek} WoW</span>
                        </div>
                      </div>
                      
                      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
                        <Card className="professional-card p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <Heart className="w-4 h-4 text-green-600" />
                            </div>
                            <Text className="text-gray-500">Positive</Text>
                          </div>
                          <Metric className="text-green-600 text-2xl font-bold">{data.customerSentiment.positive}</Metric>
                          <Text className="text-gray-500 text-sm mt-1">
                            {((data.customerSentiment.positive / data.customerSentiment.totalAnalyzed) * 100).toFixed(1)}%
                          </Text>
                        </Card>
                        
                        <Card className="professional-card p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                            </div>
                            <Text className="text-gray-500">Neutral</Text>
                          </div>
                          <Metric className="text-yellow-600 text-2xl font-bold">{data.customerSentiment.neutral}</Metric>
                          <Text className="text-gray-500 text-sm mt-1">
                            {((data.customerSentiment.neutral / data.customerSentiment.totalAnalyzed) * 100).toFixed(1)}%
                          </Text>
                        </Card>
                        
                        <Card className="professional-card p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                            <Text className="text-gray-500">Negative</Text>
                          </div>
                          <Metric className="text-red-600 text-2xl font-bold">{data.customerSentiment.negative}</Metric>
                          <Text className="text-gray-500 text-sm mt-1">
                            {((data.customerSentiment.negative / data.customerSentiment.totalAnalyzed) * 100).toFixed(1)}%
                          </Text>
                        </Card>
                        
                        <Card className="professional-card p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Users className="w-4 h-4 text-blue-600" />
                            </div>
                            <Text className="text-gray-500">Total Analyzed</Text>
                          </div>
                          <Metric className="text-blue-600 text-2xl font-bold">{data.customerSentiment.totalAnalyzed}</Metric>
                          <Text className="text-gray-500 text-sm mt-1">Conversations</Text>
                        </Card>
                      </Grid>
                      
                      {data.customerSentiment.trends.alerts.length > 0 && (
                        <Card className="professional-card p-6 border-l-4 border-orange-500">
                          <div className="flex items-center space-x-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                            <Title className="text-lg font-semibold text-gray-900">Attention Required</Title>
                        </div>
                          <div className="space-y-2">
                            {data.customerSentiment.trends.alerts.map((alert, idx) => (
                              <Text key={idx} className="text-gray-700 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span>{alert}</span>
                              </Text>
                            ))}
                          </div>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* Peak Performance Times */}
                  {data.peakPerformanceTimes && (
                    <div className="space-y-6">
                      <div className="section-header">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h2 className="section-title text-gray-900">Peak Performance Times</h2>
                          <p className="section-subtitle text-gray-600">Hourly conversation volume and efficiency metrics</p>
                        </div>
                      </div>
                      
                      <Card className="professional-card p-6">
                        <BarChart
                          className="h-80"
                          data={data.peakPerformanceTimes}
                          index="hour"
                          categories={["conversations", "efficiency"]}
                          colors={["blue", "green"]}
                          valueFormatter={(value) => typeof value === 'number' ? value.toString() : String(value)}
                        />
                      </Card>
                    </div>
                  )}

                  {/* Top Keywords by Category */}
                  {data.topKeywordsByCategory && (
                    <div className="space-y-6">
                      <div className="section-header">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Hash className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="section-title text-gray-900">Top Keywords by Category</h2>
                          <p className="section-subtitle text-gray-600">Most frequently mentioned keywords across conversation categories</p>
                        </div>
                      </div>
                      
                      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
                        {data.topKeywordsByCategory.map((category, idx) => (
                          <Card key={idx} className="professional-card p-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(category.category)}`}>
                                <Hash className="w-4 h-4" />
                              </div>
                              <div>
                                <Title className="text-lg font-semibold text-gray-900 capitalize">{category.category}</Title>
                                <Text className="text-gray-500 text-sm">{category.frequency} mentions</Text>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              {category.keywords.map((keyword, kIdx) => (
                                <div key={kIdx} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                                  <Text className="text-gray-700 font-medium">{keyword}</Text>
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                </div>
                              ))}
                        </div>
                      </Card>
                    ))}
                      </Grid>
                  </div>
                )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="space-y-8">
                  {/* Sales Opportunities Section */}
                  {needingImprovement.length > 0 && (
                    <div className="space-y-6">
                      <div className="section-header">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Target className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h2 className="section-title text-gray-900">Sales Opportunities Identified</h2>
                          <p className="section-subtitle text-gray-600">High-priority conversations requiring sales attention</p>
                        </div>
                        <div className="badge-warning flex items-center space-x-2 ml-auto">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{needingImprovement.length} OPPORTUNITIES</span>
                        </div>
                      </div>
                      
                      {needingImprovement.map((conversation: any, cIdx: number) => (
                        <Card key={cIdx} className="conversation-card priority">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center border border-orange-200">
                                <Target className="w-6 h-6 text-orange-600" />
                              </div>
                              <div>
                                <h3 className="text-title text-gray-900">Customer Interaction - Sales Opportunity</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <Text className="text-caption text-gray-500">
                            {new Date(conversation.originalTimestamp).toLocaleString()}
                          </Text>
                        </div>
                              </div>
                            </div>
                            <button
                              className="button-primary flex items-center space-x-2"
                              onClick={() => toggleConversationExpansion(cIdx)}
                            >
                              {expandedConversations.has(cIdx) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              <span>{expandedConversations.has(cIdx) ? 'Hide Full Chat' : 'Show Full Chat'}</span>
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <User className="w-5 h-5 text-blue-500" />
                              <div>
                                <Text className="text-caption text-gray-500">Customer Type</Text>
                                <div className="badge-info">{conversation.customerType}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <TrendingUp className="w-5 h-5 text-green-500" />
                              <div>
                                <Text className="text-caption text-gray-500">Sales Intent</Text>
                                <div className={conversation.salesIntent === 'buying' ? 'badge-success' : 'badge-warning'}>
                                  {conversation.salesIntent}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Sofa className="w-5 h-5 text-purple-500" />
                              <div>
                                <Text className="text-caption text-gray-500">SKU Interest</Text>
                                <div className="badge-info">{conversation.deviceInterest}</div>
                              </div>
                            </div>
                          </div>
                          
                          {expandedConversations.has(cIdx) ? (
                            <div className="border-t border-gray-200 pt-6">
                              <div className="flex items-center space-x-2 mb-4">
                                <MessageCircle className="w-5 h-5 text-gray-500" />
                                <h4 className="text-subtitle text-gray-800">Full Conversation</h4>
                              </div>
                              <ChatView messages={conversation.messages} />
                            </div>
                          ) : (
                            <div className="border-t border-gray-200 pt-6">
                              <div className="flex items-center space-x-2 mb-4">
                                <MessageCircle className="w-5 h-5 text-gray-500" />
                                <h4 className="text-subtitle text-gray-800">Conversation Preview</h4>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <Text className="text-gray-700">
                                  {conversation.messages.slice(0, 2).map((m: any) => m.content).join(' ... ')}
                                  {conversation.messages.length > 2 && ' ... (click "Show Full Chat" to see complete conversation)'}
                                </Text>
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {/* All Conversations Section */}
                  <div className="space-y-6">
                    <div className="section-header">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="section-title text-gray-900">All Recent Conversations</h2>
                        <p className="section-subtitle text-gray-600">Complete conversation history and analytics</p>
                      </div>
                    </div>
                    
                    {others.map((conversation: any, idx: number) => (
                      <Card key={idx} className="conversation-card">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-title text-gray-900">Customer Interaction {idx + 1}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <Text className="text-caption text-gray-500">
                                  {new Date(conversation.originalTimestamp).toLocaleString()}
                                </Text>
                              </div>
                            </div>
                          </div>
                          <button
                            className="button-primary flex items-center space-x-2"
                            onClick={() => toggleConversationExpansion(idx + 1000)}
                          >
                            {expandedConversations.has(idx + 1000) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            <span>{expandedConversations.has(idx + 1000) ? 'Hide Full Chat' : 'Show Full Chat'}</span>
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-blue-500" />
                            <div>
                              <Text className="text-caption text-gray-500">Customer</Text>
                              <div className="badge-neutral">{conversation.customerType}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <div>
                              <Text className="text-caption text-gray-500">Intent</Text>
                              <div className="badge-success">{conversation.salesIntent}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Sofa className="w-5 h-5 text-purple-500" />
                            <div>
                              <Text className="text-caption text-gray-500">SKU</Text>
                              <div className="badge-info">{conversation.deviceInterest}</div>
                            </div>
                          </div>
                          
                          {conversation.competitorMentioned && (
                            <div className="flex items-center space-x-3">
                              <AlertTriangle className="w-5 h-5 text-red-500" />
                              <div>
                                <Text className="text-caption text-gray-500">Competitor</Text>
                                <div className="badge-warning">{conversation.competitorMentioned}</div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {expandedConversations.has(idx + 1000) ? (
                          <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center space-x-2 mb-4">
                              <MessageCircle className="w-5 h-5 text-gray-500" />
                              <h4 className="text-subtitle text-gray-800">Full Conversation</h4>
                      </div>
                          <ChatView messages={conversation.messages} />
                        </div>
                        ) : (
                          <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center space-x-2 mb-4">
                              <MessageCircle className="w-5 h-5 text-gray-500" />
                              <h4 className="text-subtitle text-gray-800">Conversation Preview</h4>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <Text className="text-gray-700">
                                {conversation.messages.slice(0, 2).map((m: any) => m.content).join(' ... ')}
                                {conversation.messages.length > 2 && ' ... (click "Show Full Chat" to see complete conversation)'}
                              </Text>
                            </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
                <EnhancedTopicAnalysis />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      </div>

      {/* AiPRL Branding Footer */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200">
          <img 
            src="https://cdn.prod.website-files.com/680681369537b3aad9592518/6806b4edd4d14f9e0011155f_cd12ef75-5d21-4e7c-ba47-b951db7c3da6.png" 
            alt="AiPRL Logo" 
            className="w-6 h-6"
          />
          <span className="text-sm font-medium text-gray-700">Designed by AiPRL</span>
        </div>
      </div>

      {/* CROWN JEWEL: Floating AI Intelligence Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowAIModal(true)}
          className="group relative w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 animate-pulse"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-75 animate-ping"></div>
          <div className="relative flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
            <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask AI About Your Data
          </div>
        </button>
      </div>

      {/* AI Intelligence Full Screen - THE CROWN JEWEL */}
      <AIChatIntelligence 
        isFullscreen={showAIModal} 
        onClose={() => setShowAIModal(false)} 
      />
    </main>
  );
} 