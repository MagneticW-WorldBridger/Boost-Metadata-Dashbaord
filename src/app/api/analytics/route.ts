import { db } from '@vercel/postgres';

// Hooker Furniture specific conversation categories
const RESPONSE_CATEGORIES = {
  CUSTOM_ORDERS: {
    patterns: ['custom dimensions', 'special size', '96×40', 'custom order'],
    label: 'Custom Orders',
    priority: 'high',
    improvement: 'Provide detailed quote and timeline'
  },
  WARRANTY_CLAIMS: {
    patterns: ['seam tear', 'damage', 'warranty', 'defect'],
    label: 'Warranty Claims',
    priority: 'urgent',
    improvement: 'Fast-track replacement process'
  },
  FINISH_SAMPLES: {
    patterns: ['finish sample', 'swatch', 'color options', 'finish guide'],
    label: 'Finish Samples',
    priority: 'medium',
    improvement: 'Send physical samples immediately'
  },
  INVENTORY_STATUS: {
    patterns: ['out of stock', 'in stock', 'lead time', 'availability'],
    label: 'Inventory Status',
    priority: 'high',
    improvement: 'Provide accurate inventory updates'
  },
  DEALER_RELATIONS: {
    patterns: ['AOV', 'repeat rate', 'dealer performance', 'rating'],
    label: 'Dealer Relations',
    priority: 'medium',
    improvement: 'Strengthen dealer partnerships'
  }
};

export async function GET() {
  try {
    // Generate Hooker Furniture analytics data based on HOOKERCONVOS.MD patterns
    const mockAnalyticsData = {
      overview: {
        totalConversations: 1000,
        improvementRate: "9.2", // 90.8% satisfaction = 9.2% needing improvement
        uniqueDealers: 156,
        avgResponseTime: 1.8
      },
      
      responsePatterns: {
        averageMessagesPerChat: 3.4,
        responseQuality: 94.2,
        escalationRate: 8.5,
        resolutionRate: 91.5
      },

      topicAnalysis: {
        distribution: [
          {
            topic: 'Finish & Color Availability',
            totalQueries: 225,
            categoryScore: 79.0,
            needsImprovement: 18,
            storeVisitRate: 22.5
          },
          {
            topic: 'Leather Options & Grades',
            totalQueries: 193,
            categoryScore: 72.0,
            needsImprovement: 12,
            storeVisitRate: 19.3
          },
          {
            topic: 'Custom Dimensions Requests',
            totalQueries: 148,
            categoryScore: 68.0,
            needsImprovement: 35,
            storeVisitRate: 14.8
          },
          {
            topic: 'Warranty Coverage & Claims',
            totalQueries: 116,
            categoryScore: 75.0,
            needsImprovement: 8,
            storeVisitRate: 11.6
          },
          {
            topic: 'Lead Time Estimates',
            totalQueries: 91,
            categoryScore: 85.0,
            needsImprovement: 5,
            storeVisitRate: 9.1
          }
        ]
      },

      // Sample conversation data with Hooker Furniture context
      conversationSamples: [
        {
          id: '1',
          summary: 'UrbanLoft - Custom order for HF-3124 Savion Deux sofa',
          timestamp: '2025-01-15T10:30:00Z',
          dealerType: 'Reseller',
          category: 'Custom Orders',
          priority: 'High',
          sku: 'HF-3124',
          messages: [
            {
              role: 'dealer',
              content: 'ModernMakers—we need a Riverton sofa (HF-2008) at 96″ W×40″ D. Quote?',
              timestamp: '2025-01-15T10:30:00Z'
            },
            {
              role: 'assistant', 
              content: 'Custom dims are +10%. Base $375 K MTD, so quote is $412.5 K.',
              timestamp: '2025-01-15T10:30:15Z'
            },
            {
              role: 'dealer',
              content: 'Email that to me, and send finish samples in "Espresso."',
              timestamp: '2025-01-15T10:31:00Z'
            },
            {
              role: 'assistant',
              content: 'Sent—quote in your inbox; "Espresso" swatches ship tomorrow.',
              timestamp: '2025-01-15T10:31:10Z'
            }
          ],
          salesIntent: 'buying',
          satisfactionScore: 4.8,
          resolved: true
        },
        {
          id: '2',
          summary: 'HomeStyle - Warranty claim for HF-1103 Fairfax sofa',
          timestamp: '2025-01-15T11:45:00Z',
          dealerType: 'Reseller',
          category: 'Warranty Claims',
          priority: 'Urgent',
          sku: 'HF-1103',
          messages: [
            {
              role: 'dealer',
              content: 'HomeStyle—my Fairfax sofa (HF-1103) arrived with a seam tear.',
              timestamp: '2025-01-15T11:45:00Z'
            },
            {
              role: 'assistant',
              content: 'I\'m sorry to hear that. Can you share PO # and a photo?',
              timestamp: '2025-01-15T11:45:10Z'
            },
            {
              role: 'dealer',
              content: 'PO# HS-321, sent photo.',
              timestamp: '2025-01-15T11:46:00Z'
            },
            {
              role: 'assistant',
              content: 'Tagged as "Fabric defect" (7.1% of returns). Replacement ships in 5 days.',
              timestamp: '2025-01-15T11:46:15Z'
            }
          ],
          salesIntent: 'support',
          satisfactionScore: 4.5,
          resolved: true
        }
      ],

      // Top performing SKUs from conversation data
      topPerformingSKUs: [
        { sku: 'HF-3124', name: 'Savion Deux', mentions: 230, revenue: 425000 },
        { sku: 'HF-5560', name: 'Jericho Power', mentions: 195, revenue: 390000 },
        { sku: 'HF-2008', name: 'Riverton', mentions: 162, revenue: 375000 },
        { sku: 'HF-4812', name: 'Nelson Zero-G', mentions: 148, revenue: 350000 },
        { sku: 'HF-1103', name: 'Fairfax', mentions: 123, revenue: 332000 }
      ],

      // Dealer performance categories
      topKeywordsByCategory: [
        { category: 'Custom Orders', keywords: ['custom dimensions', '96×40', 'special order'], frequency: 148 },
        { category: 'Finish Samples', keywords: ['finish sample', 'swatch', 'Espresso'], frequency: 225 },
        { category: 'Warranty Claims', keywords: ['seam tear', 'damage', 'defect'], frequency: 116 },
        { category: 'Inventory', keywords: ['out of stock', 'lead time', 'availability'], frequency: 169 },
        { category: 'Dealer Performance', keywords: ['AOV', 'repeat rate', 'rating'], frequency: 65 }
      ],

      // Peak conversation times
      peakPerformanceTimes: [
        { hour: '10:00', conversations: 182, efficiency: 96.8 }, // Monday 10-11 AM peak
        { hour: '14:00', conversations: 176, efficiency: 95.9 }, // Tuesday 2-3 PM
        { hour: '11:00', conversations: 168, efficiency: 94.2 },
        { hour: '15:00', conversations: 162, efficiency: 93.7 },
        { hour: '09:00', conversations: 157, efficiency: 92.6 }
      ]
    };

    return Response.json(mockAnalyticsData);

  } catch (error) {
    console.error('Analytics API error:', error);
    return Response.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
} 