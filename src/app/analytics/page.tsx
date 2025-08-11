'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
  Tractor,
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
  const searchParams = useSearchParams();
  const isEmbedMode = searchParams.get('embed') === '1';
  const theme = searchParams.get('theme') || 'default';
  
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

  // Apply embed mode styles
  const containerStyles = isEmbedMode 
    ? "h-screen overflow-hidden bg-white" 
    : "min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative";
    
  const wrapperStyles = isEmbedMode 
    ? "max-w-full h-full p-4 space-y-4 overflow-y-auto" 
    : "max-w-[90rem] mx-auto p-8 space-y-12";

  return (
    <main className={containerStyles}>
      <div className={wrapperStyles}>
        {/* Professional Header - Hidden in embed mode */}
        {!isEmbedMode && (
        <div className="header-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center border border-green-200">
                    <Tractor className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-display gradient-text">Rural King</h1>
                    <p className="text-subtitle mt-1 text-gray-600">Farm Supply Analytics & Store Intelligence</p>
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
        )}

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
                <span>Live Dealer Analytics</span>
              </Tab>
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <Building2 className="w-4 h-4" />
                <span>Facilities & Network</span>
              </Tab>
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <BarChart3 className="w-4 h-4" />
                <span>Performance Metrics</span>
              </Tab>
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <MessageCircle className="w-4 h-4" />
                <span>Dealer Conversations</span>
              </Tab>
              <Tab className="flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all data-[selected]:bg-white data-[selected]:text-blue-600 data-[selected]:shadow-sm text-gray-600 hover:text-gray-800">
                <TrendingUp className="w-4 h-4" />
                <span>Topics & Insights</span>
              </Tab>
          </TabList>
            
            <TabPanels className="bg-white rounded-b-xl" style={{ padding: 'var(--space-34)' }}>
            <TabPanel>
              <LiveMetricsDashboard />
            </TabPanel>
            <TabPanel>
              <StorePerformanceMap />
            </TabPanel>
            <TabPanel>
                <div style={{ gap: 'var(--space-34)' }} className="space-y-8">
                  {/* Dealer Performance Analytics */}
                  {data.storeVisitRequirements && (
                    <div style={{ gap: 'var(--space-21)' }} className="space-y-6">
                      <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                        <div className="icon-container bg-orange-100">
                          <Target className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h2 className="text-perfect-2xl font-bold text-gray-900">Dealer Support Requirements</h2>
                          <p className="text-perfect-lg text-gray-600">Analysis of dealer interactions requiring specialized assistance</p>
                        </div>
                      </div>
                      
                      <Grid numItems={1} numItemsSm={2} numItemsLg={4} style={{ gap: 'var(--space-21)' }}>
                        {data.storeVisitRequirements.map((requirement, idx) => (
                          <Card key={idx} className="card-premium hover-lift" style={{ padding: 'var(--space-21)' }}>
                            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-13)' }}>
                              <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                                <div className={`icon-container ${
                                  requirement.priority === 'Critical' ? 'bg-red-100' :
                                  requirement.priority === 'High' ? 'bg-orange-100' : 'bg-yellow-100'
                                }`}>
                                  <Target className={`w-4 h-4 ${
                                    requirement.priority === 'Critical' ? 'text-red-600' :
                                    requirement.priority === 'High' ? 'text-orange-600' : 'text-yellow-600'
                                  }`} />
                                </div>
                                <div>
                                  <Title className="text-perfect-lg font-semibold text-gray-900">{requirement.topic}</Title>
                                  <Text className="text-perfect-sm text-gray-600">{requirement.totalConversations} conversations</Text>
                                </div>
                              </div>
                            </div>
                            
                            <div style={{ gap: 'var(--space-8)' }} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <Text className="text-perfect-sm text-gray-600">Support Rate</Text>
                                <Text className="text-perfect-sm font-bold text-blue-600">{requirement.storeVisitRate}%</Text>
                              </div>
                              <div className="flex justify-between items-center">
                                <Text className="text-perfect-sm text-gray-600">Need Support</Text>
                                <Text className="text-perfect-sm font-bold text-orange-600">{requirement.needStoreVisits}</Text>
                              </div>
                              <div className="flex justify-between items-center">
                                <Text className="text-perfect-sm text-gray-600">Priority</Text>
                                <div className={`${
                                  requirement.priority === 'Critical' ? 'status-error' :
                                  requirement.priority === 'High' ? 'status-warning' : 'status-success'
                                } px-2 py-1 rounded text-xs font-medium`}>
                                  {requirement.priority}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </Grid>
                    </div>
                  )}

                  {/* Dealer Satisfaction Analytics */}
                  {data.customerSentiment && (
                    <div style={{ gap: 'var(--space-21)' }} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                          <div className="icon-container bg-green-100">
                            <Heart className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h2 className="text-perfect-2xl font-bold text-gray-900">Dealer Satisfaction Analysis</h2>
                            <p className="text-perfect-lg text-gray-600">Overall dealer satisfaction and sentiment trends</p>
                          </div>
                        </div>
                        <div className="flex items-center status-success" style={{ gap: 'var(--space-8)' }}>
                          <TrendingUp className="w-4 h-4" />
                          <span>{data.customerSentiment.trends.weekOverWeek} WoW</span>
                        </div>
                      </div>
                      
                      <Grid numItems={1} numItemsSm={2} numItemsLg={4} style={{ gap: 'var(--space-21)' }}>
                        <Card className="card-premium hover-scale" style={{ padding: 'var(--space-21)' }}>
                          <div className="flex items-center" style={{ gap: 'var(--space-13)', marginBottom: 'var(--space-13)' }}>
                            <div className="icon-container bg-green-100">
                              <Heart className="w-4 h-4 text-green-600" />
                            </div>
                            <Text className="text-perfect-sm text-gray-500">Positive</Text>
                          </div>
                          <Metric className="text-green-600 text-perfect-3xl font-bold">{data.customerSentiment.positive}</Metric>
                          <Text className="text-perfect-sm text-gray-500" style={{ marginTop: 'var(--space-5)' }}>
                            {((data.customerSentiment.positive / data.customerSentiment.totalAnalyzed) * 100).toFixed(1)}%
                          </Text>
                        </Card>
                        
                        <Card className="card-premium hover-scale" style={{ padding: 'var(--space-21)' }}>
                          <div className="flex items-center" style={{ gap: 'var(--space-13)', marginBottom: 'var(--space-13)' }}>
                            <div className="icon-container bg-yellow-100">
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                            </div>
                            <Text className="text-perfect-sm text-gray-500">Neutral</Text>
                          </div>
                          <Metric className="text-yellow-600 text-perfect-3xl font-bold">{data.customerSentiment.neutral}</Metric>
                          <Text className="text-perfect-sm text-gray-500" style={{ marginTop: 'var(--space-5)' }}>
                            {((data.customerSentiment.neutral / data.customerSentiment.totalAnalyzed) * 100).toFixed(1)}%
                          </Text>
                        </Card>
                        
                        <Card className="card-premium hover-scale" style={{ padding: 'var(--space-21)' }}>
                          <div className="flex items-center" style={{ gap: 'var(--space-13)', marginBottom: 'var(--space-13)' }}>
                            <div className="icon-container bg-red-100">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                            <Text className="text-perfect-sm text-gray-500">Negative</Text>
                          </div>
                          <Metric className="text-red-600 text-perfect-3xl font-bold">{data.customerSentiment.negative}</Metric>
                          <Text className="text-perfect-sm text-gray-500" style={{ marginTop: 'var(--space-5)' }}>
                            {((data.customerSentiment.negative / data.customerSentiment.totalAnalyzed) * 100).toFixed(1)}%
                          </Text>
                        </Card>
                        
                        {data.customerSentiment.trends.alerts && data.customerSentiment.trends.alerts.length > 0 && (
                          <Card className="card-premium bg-orange-50 border-orange-200" style={{ padding: 'var(--space-21)' }}>
                            <div className="flex items-center" style={{ gap: 'var(--space-13)', marginBottom: 'var(--space-13)' }}>
                              <div className="icon-container bg-orange-100">
                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                              </div>
                              <Text className="text-perfect-sm text-gray-700">Alerts</Text>
                            </div>
                            <div style={{ gap: 'var(--space-8)' }} className="space-y-2">
                              {data.customerSentiment.trends.alerts.map((alert, idx) => (
                                <Text key={idx} className="text-perfect-sm text-gray-700 flex items-center" style={{ gap: 'var(--space-8)' }}>
                                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                  <span>{alert}</span>
                                </Text>
                              ))}
                            </div>
                          </Card>
                        )}
                      </Grid>
                    </div>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div style={{ gap: 'var(--space-34)' }} className="space-y-8">
                  {/* High-Priority Dealer Conversations */}
                  {needingImprovement.length > 0 && (
                    <div style={{ gap: 'var(--space-21)' }} className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                          <div className="icon-container bg-orange-100">
                            <Target className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h2 className="text-perfect-2xl font-bold text-gray-900">Priority Dealer Conversations</h2>
                            <p className="text-perfect-lg text-gray-600">High-priority conversations requiring attention</p>
                          </div>
                        </div>
                        <div className="flex items-center status-warning" style={{ gap: 'var(--space-8)' }}>
                          <AlertTriangle className="w-4 h-4" />
                          <span>{needingImprovement.length} PRIORITY ITEMS</span>
                        </div>
                      </div>
                      
                      {needingImprovement.map((conversation: any, cIdx: number) => (
                        <Card key={cIdx} className="card-premium border-l-4 border-orange-500 hover-lift" style={{ padding: 'var(--space-34)' }}>
                          <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-21)' }}>
                            <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                              <div className="icon-container bg-orange-100 border border-orange-200">
                                <Building2 className="w-6 h-6 text-orange-600" />
                              </div>
                              <div>
                                <h3 className="text-perfect-xl font-bold text-gray-900">{conversation.customerType} - {conversation.deviceInterest}</h3>
                                <div className="flex items-center" style={{ gap: 'var(--space-8)', marginTop: 'var(--space-5)' }}>
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <Text className="text-perfect-sm text-gray-500">
                            {new Date(conversation.originalTimestamp).toLocaleString()}
                          </Text>
                        </div>
                              </div>
                            </div>
                            <button
                              className="btn-primary focus-perfect flex items-center"
                              style={{ gap: 'var(--space-8)', padding: 'var(--space-13) var(--space-21)' }}
                              onClick={() => toggleConversationExpansion(cIdx)}
                            >
                              {expandedConversations.has(cIdx) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              <span>{expandedConversations.has(cIdx) ? 'Hide Details' : 'Show Details'}</span>
                            </button>
                          </div>
                          
                          {/* Conversation Metadata */}
                          <div className="grid grid-cols-1 md:grid-cols-3 p-4 bg-gray-50 rounded-lg" style={{ gap: 'var(--space-21)', marginBottom: 'var(--space-21)' }}>
                            <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                              <Building2 className="w-5 h-5 text-blue-500" />
                              <div>
                                <Text className="text-perfect-xs text-gray-500">Dealer Type</Text>
                                <div className="text-perfect-sm font-medium text-blue-600">{conversation.customerType}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                              <TrendingUp className="w-5 h-5 text-green-500" />
                              <div>
                                <Text className="text-perfect-xs text-gray-500">Intent</Text>
                                <div className={`text-perfect-sm font-medium ${conversation.salesIntent === 'buying' ? 'text-green-600' : 'text-yellow-600'}`}>
                                  {conversation.salesIntent}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                              <Tractor className="w-5 h-5 text-purple-500" />
                              <div>
                                <Text className="text-perfect-xs text-gray-500">Product Interest</Text>
                                <div className="text-perfect-sm font-medium text-purple-600">{conversation.deviceInterest}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Conversation Details */}
                          {expandedConversations.has(cIdx) ? (
                            <div className="border-t border-gray-200" style={{ paddingTop: 'var(--space-21)' }}>
                              <div className="flex items-center" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-13)' }}>
                                <MessageCircle className="w-5 h-5 text-gray-500" />
                                <h4 className="text-perfect-lg font-semibold text-gray-800">Full Conversation</h4>
                              </div>
                              <ChatView messages={conversation.messages} />
                            </div>
                          ) : (
                            <div className="border-t border-gray-200" style={{ paddingTop: 'var(--space-21)' }}>
                              <div className="flex items-center" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-13)' }}>
                                <MessageCircle className="w-5 h-5 text-gray-500" />
                                <h4 className="text-perfect-lg font-semibold text-gray-800">Conversation Summary</h4>
                              </div>
                              <div className="card-premium bg-blue-50 border-blue-200" style={{ padding: 'var(--space-21)' }}>
                                <Text className="text-perfect-base text-gray-700" style={{ lineHeight: 'var(--leading-normal)' }}>
                                  {conversation.summary}
                                </Text>
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {/* All Recent Dealer Conversations */}
                  <div style={{ gap: 'var(--space-21)' }} className="space-y-6">
                    <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                      <div className="icon-container bg-blue-100">
                        <MessageCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-perfect-2xl font-bold text-gray-900">Recent Dealer Conversations</h2>
                        <p className="text-perfect-lg text-gray-600">Complete conversation history and analytics</p>
                      </div>
                    </div>
                    
                    {others.slice(0, 5).map((conversation: any, idx: number) => (
                      <Card key={idx} className="card-premium hover-lift" style={{ padding: 'var(--space-34)' }}>
                        <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-21)' }}>
                          <div className="flex items-center" style={{ gap: 'var(--space-13)' }}>
                            <div className="icon-container bg-blue-100 border border-blue-200">
                              <Building2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="text-perfect-xl font-bold text-gray-900">{conversation.customerType} Interaction</h3>
                              <div className="flex items-center" style={{ gap: 'var(--space-8)', marginTop: 'var(--space-5)' }}>
                                <Clock className="w-4 h-4 text-gray-400" />
                                <Text className="text-perfect-sm text-gray-500">
                                  {new Date(conversation.originalTimestamp).toLocaleString()}
                                </Text>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn-primary focus-perfect flex items-center"
                            style={{ gap: 'var(--space-8)', padding: 'var(--space-13) var(--space-21)' }}
                            onClick={() => toggleConversationExpansion(idx + 1000)}
                          >
                            {expandedConversations.has(idx + 1000) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            <span>{expandedConversations.has(idx + 1000) ? 'Hide Details' : 'Show Details'}</span>
                          </button>
                        </div>
                        
                        {/* Quick Summary */}
                        {!expandedConversations.has(idx + 1000) && (
                          <div className="card-premium bg-gray-50" style={{ padding: 'var(--space-21)', marginBottom: 'var(--space-21)' }}>
                            <Text className="text-perfect-base text-gray-700" style={{ lineHeight: 'var(--leading-normal)' }}>
                              {conversation.summary}
                            </Text>
                          </div>
                        )}
                        
                        {/* Full Conversation */}
                        {expandedConversations.has(idx + 1000) && (
                          <div className="border-t border-gray-200" style={{ paddingTop: 'var(--space-21)' }}>
                            <div className="flex items-center" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-13)' }}>
                              <MessageCircle className="w-5 h-5 text-gray-500" />
                              <h4 className="text-perfect-lg font-semibold text-gray-800">Full Conversation</h4>
                            </div>
                            <ChatView messages={conversation.messages} />
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