import { db } from '@vercel/postgres';

// Rural King farm supply specific conversation categories
const RESPONSE_CATEGORIES = {
  ANIMAL_FEED: {
    patterns: ['feed', 'nutrition', 'protein', 'vitamins', 'dairy', 'poultry', 'livestock'],
    label: 'Animal Feed & Nutrition',
    priority: 'high',
    improvement: 'Provide detailed feeding guidelines and nutritional advice'
  },
  TOOLS_EQUIPMENT: {
    patterns: ['chainsaw', 'tractor', 'battery', 'tools', 'equipment', 'maintenance'],
    label: 'Tools & Equipment',
    priority: 'high',
    improvement: 'Offer product demonstrations and maintenance tips'
  },
  GARDENING: {
    patterns: ['seeds', 'plants', 'garden', 'soil', 'fertilizer', 'watering'],
    label: 'Gardening & Landscaping',
    priority: 'medium',
    improvement: 'Provide planting guides and seasonal advice'
  },
  FENCING: {
    patterns: ['fence', 'fencing', 'posts', 'wire', 'gates', 'installation'],
    label: 'Fencing & Construction',
    priority: 'medium',
    improvement: 'Offer installation services and material calculations'
  },
  WORKWEAR: {
    patterns: ['boots', 'gloves', 'clothing', 'safety', 'workwear', 'protection'],
    label: 'Workwear & Safety',
    priority: 'medium',
    improvement: 'Ensure proper sizing and safety compliance'
  }
};

export async function GET() {
  try {
    // Generate Rural King farm supply analytics data
    const mockAnalyticsData = {
      overview: {
        totalConversations: 245, // Realistic daily conversation volume for farm supply
        improvementRate: "8.7", // 91.3% satisfaction = 8.7% needing improvement
        uniqueCustomers: 67, // Realistic customers served per day
        avgResponseTime: 1.2
      },
      
      responsePatterns: {
        averageMessagesPerChat: 3.2,
        responseQuality: 95.8,
        escalationRate: 6.3,
        resolutionRate: 93.7
      },

      topicAnalysis: {
        distribution: [
          {
            topic: 'Animal Feed & Nutrition',
            totalQueries: 68, // Realistic query volumes for farm supply
            categoryScore: 92.0,
            needsImprovement: 3,
            storeVisitRate: 45.2
          },
          {
            topic: 'Tools & Equipment',
            totalQueries: 52,
            categoryScore: 88.0,
            needsImprovement: 4,
            storeVisitRate: 38.7
          },
          {
            topic: 'Gardening & Landscaping',
            totalQueries: 41,
            categoryScore: 85.0,
            needsImprovement: 5,
            storeVisitRate: 32.1
          },
          {
            topic: 'Fencing & Construction',
            totalQueries: 28,
            categoryScore: 82.0,
            needsImprovement: 6,
            storeVisitRate: 25.4
          },
          {
            topic: 'Workwear & Safety',
            totalQueries: 22,
            categoryScore: 89.0,
            needsImprovement: 3,
            storeVisitRate: 18.9
          }
        ]
      },

      // Sample conversation data with Rural King farm supply context
      conversationSamples: [
        {
          id: '1',
          summary: 'Customer seeking dairy cow feed advice for 20 Holsteins',
          timestamp: '2025-01-15T10:30:00Z',
          customerType: 'Dairy Farmer',
          category: 'Animal Feed & Nutrition',
          priority: 'High',
          product: 'Premium Dairy Mix Feed',
          messages: [
            {
              role: 'customer',
              content: 'Hi! I need help finding the right feed for my dairy cows. I have about 20 Holsteins and they\'re not producing as much milk as usual.',
              timestamp: '2025-01-15T10:30:00Z'
            },
            {
              role: 'assistant',
              content: 'Hello! I can definitely help you with dairy cow nutrition. For Holsteins with decreased milk production, I\'d recommend our Premium Dairy Mix with 18% protein.',
              timestamp: '2025-01-15T10:30:15Z'
            }
          ],
          salesIntent: 'buying',
          satisfactionScore: 4.8,
          resolved: true
        },
        {
          id: '2',
          summary: 'Customer inquiring about Stihl chainsaws for property maintenance',
          timestamp: '2025-01-15T11:15:00Z',
          customerType: 'Property Owner',
          category: 'Tools & Equipment',
          priority: 'Medium',
          product: 'Stihl MS 271 Farm Boss Chainsaw',
          messages: [
            {
              role: 'customer',
              content: 'Do you carry Stihl chainsaws? I need one for cutting firewood and clearing some trees on my property.',
              timestamp: '2025-01-15T11:15:00Z'
            },
            {
              role: 'assistant',
              content: 'Yes, we carry a full line of Stihl chainsaws! For firewood and tree clearing, I\'d recommend the MS 271 Farm Boss with 20" bar.',
              timestamp: '2025-01-15T11:15:08Z'
            }
          ],
          salesIntent: 'buying',
          satisfactionScore: 4.6,
          resolved: true
        }
      ],

      // Top performing products from conversation data
      topPerformingProducts: [
        { sku: 'RK-DM-001', name: 'Premium Dairy Mix Feed', mentions: 156, revenue: 28400 },
        { sku: 'RK-SC-271', name: 'Stihl MS 271 Farm Boss', mentions: 89, revenue: 35600 },
        { sku: 'RK-OS-001', name: 'Organic Seed Starter Pack', mentions: 134, revenue: 20100 },
        { sku: 'RK-TB-26R', name: 'Interstate MT-26R Battery', mentions: 67, revenue: 6030 },
        { sku: 'RK-HF-001', name: 'Horse Guard No-Climb Fencing', mentions: 45, revenue: 144000 }
      ],

      // Customer performance categories
      topKeywordsByCategory: [
        { category: 'Animal Feed', keywords: ['dairy feed', 'protein', 'nutrition', 'Holsteins'], frequency: 234 },
        { category: 'Tools', keywords: ['chainsaw', 'tractor', 'battery', 'maintenance'], frequency: 189 },
        { category: 'Gardening', keywords: ['seeds', 'organic', 'planting', 'soil'], frequency: 167 },
        { category: 'Fencing', keywords: ['horse fence', 'installation', 'materials', 'acres'], frequency: 98 },
        { category: 'Workwear', keywords: ['work boots', 'waterproof', 'safety', 'comfort'], frequency: 76 }
      ],

      // Store visit requirements by topic
      storeVisitRequirements: [
        {
          topic: 'Tools & Equipment',
          totalConversations: 52,
          storeVisitRate: 38.7,
          needStoreVisits: 20,
          priority: 'high'
        },
        {
          topic: 'Fencing & Construction',
          totalConversations: 28,
          storeVisitRate: 25.4,
          needStoreVisits: 21,
          priority: 'high'
        },
        {
          topic: 'Workwear & Safety',
          totalConversations: 22,
          storeVisitRate: 18.9,
          needStoreVisits: 18,
          priority: 'medium'
        },
        {
          topic: 'Animal Feed',
          totalConversations: 68,
          storeVisitRate: 45.2,
          needStoreVisits: 37,
          priority: 'medium'
        },
        {
          topic: 'Gardening',
          totalConversations: 41,
          storeVisitRate: 32.1,
          needStoreVisits: 28,
          priority: 'low'
        }
      ],

      // Customer sentiment analysis
      customerSentiment: {
        totalAnalyzed: 245,
        positive: 178,
        neutral: 45,
        negative: 22,
        trends: {
          weekOverWeek: '+5.2%',
          satisfaction: '91.3%',
          alerts: ['High demand for spring gardening supplies', 'Tractor battery inquiries up 23%']
        }
      },

      // Peak performance times
      peakPerformanceTimes: [
        { hour: '9:00 AM', conversations: 28, efficiency: 94.2 },
        { hour: '10:00 AM', conversations: 35, efficiency: 91.8 },
        { hour: '11:00 AM', conversations: 42, efficiency: 89.5 },
        { hour: '12:00 PM', conversations: 38, efficiency: 87.2 },
        { hour: '1:00 PM', conversations: 31, efficiency: 92.1 },
        { hour: '2:00 PM', conversations: 29, efficiency: 90.7 },
        { hour: '3:00 PM', conversations: 26, efficiency: 88.9 },
        { hour: '4:00 PM', conversations: 16, efficiency: 85.4 }
      ],

      // Enhanced response patterns
      enhancedResponsePatterns: {
        categories: [
          {
            type: 'Product Recommendations',
            examples: [
              {
                query: 'Need feed for dairy cows',
                response: 'Premium Dairy Mix with 18% protein, 30-35 lbs daily for optimal production',
                timestamp: '2025-01-15T10:30:00Z'
              },
              {
                query: 'Looking for chainsaw for firewood',
                response: 'Stihl MS 271 Farm Boss, 20" bar, $399.99 with 2-year warranty',
                timestamp: '2025-01-15T11:15:00Z'
              }
            ]
          },
          {
            type: 'Technical Support',
            examples: [
              {
                query: 'Tractor won\'t start',
                response: 'Check battery - Group 26R for John Deere 3038E, Interstate MT-26R in stock',
                timestamp: '2025-01-15T15:45:00Z'
              },
              {
                query: 'Horse fencing recommendations',
                response: 'Horse Guard No-Climb fencing, 1,800 feet for 5 acres, $3,200 materials',
                timestamp: '2025-01-15T16:30:00Z'
              }
            ]
          }
        ],
        averageMessagesPerChat: 3.2
      }
    };

    return Response.json(mockAnalyticsData);
  } catch (error) {
    console.error('Error in analytics API:', error);
    return Response.json({ error: 'Failed to load analytics data' }, { status: 500 });
  }
} 