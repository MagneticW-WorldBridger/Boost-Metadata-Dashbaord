import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Generate Hooker Furniture conversation samples based on HOOKERCONVOS.MD patterns
    const hookerConversations = [
      {
        id: 1,
        messages: [
          {
            role: 'dealer',
            content: 'DécorPoint here—HF-3124 "Savion Deux" is out of stock. ETA?',
            timestamp: '2025-01-15T10:30:00Z'
          },
          {
            role: 'assistant',
            content: 'Checking… Martinsville plant expects 40 units by July 18.',
            timestamp: '2025-01-15T10:30:15Z'
          },
          {
            role: 'dealer',
            content: 'Perfect. Reserve 15 for me, please.',
            timestamp: '2025-01-15T10:31:00Z'
          },
          {
            role: 'assistant',
            content: 'Done—15 units of HF-3124 are flagged under your PO.',
            timestamp: '2025-01-15T10:31:10Z'
          }
        ],
        summary: 'DécorPoint - Out of stock inquiry for HF-3124 Savion Deux sofa',
        customerType: 'Reseller',
        salesIntent: 'buying',
        dealerType: 'Reseller',
        sku: 'HF-3124',
        category: 'Inventory Status',
        priority: 'High',
        resolved: true,
        satisfactionScore: 4.8
      },
      {
        id: 2,
        messages: [
          {
            role: 'dealer',
            content: 'ModernMakers—we need a Riverton sofa (HF-2008) at 96″ W×40″ D. Quote?',
            timestamp: '2025-01-15T11:45:00Z'
          },
          {
            role: 'assistant',
            content: 'Custom dims are +10%. Base $375 K MTD, so quote is $412.5 K.',
            timestamp: '2025-01-15T11:45:15Z'
          },
          {
            role: 'dealer',
            content: 'Email that to me, and send finish samples in "Espresso."',
            timestamp: '2025-01-15T11:46:00Z'
          },
          {
            role: 'assistant',
            content: 'Sent—quote in your inbox; "Espresso" swatches ship tomorrow.',
            timestamp: '2025-01-15T11:46:10Z'
          }
        ],
        summary: 'ModernMakers - Custom order request for HF-2008 Riverton sofa',
        customerType: 'Reseller',
        salesIntent: 'buying',
        dealerType: 'Reseller',
        sku: 'HF-2008',
        category: 'Custom Orders',
        priority: 'High',
        resolved: true,
        satisfactionScore: 4.9
      },
      {
        id: 3,
        messages: [
          {
            role: 'dealer',
            content: 'HomeStyle—my Fairfax sofa (HF-1103) arrived with a seam tear.',
            timestamp: '2025-01-15T14:20:00Z'
          },
          {
            role: 'assistant',
            content: 'I\'m sorry to hear that. Can you share PO # and a photo?',
            timestamp: '2025-01-15T14:20:10Z'
          },
          {
            role: 'dealer',
            content: 'PO# HS-321, sent photo.',
            timestamp: '2025-01-15T14:21:00Z'
          },
          {
            role: 'assistant',
            content: 'Tagged as "Fabric defect" (7.1% of returns). Replacement ships in 5 days.',
            timestamp: '2025-01-15T14:21:15Z'
          }
        ],
        summary: 'HomeStyle - Warranty claim for HF-1103 Fairfax sofa with seam tear',
        customerType: 'Reseller',
        salesIntent: 'support',
        dealerType: 'Reseller',
        sku: 'HF-1103',
        category: 'Warranty Claims',
        priority: 'Urgent',
        resolved: true,
        satisfactionScore: 4.5
      },
      {
        id: 4,
        messages: [
          {
            role: 'dealer',
            content: 'I\'m specifying fabrics on Jericho (HF-5560). Can I get performance fabric swatches?',
            timestamp: '2025-01-15T15:30:00Z'
          },
          {
            role: 'assistant',
            content: 'Sure—performance fabrics account for 27% of upholstery inquiries. Samples ship today.',
            timestamp: '2025-01-15T15:30:15Z'
          },
          {
            role: 'dealer',
            content: 'Thank you!',
            timestamp: '2025-01-15T15:31:00Z'
          }
        ],
        summary: 'Designer - Performance fabric samples request for HF-5560 Jericho',
        customerType: 'Designer',
        salesIntent: 'comparing',
        dealerType: 'Designer',
        sku: 'HF-5560',
        category: 'Finish Samples',
        priority: 'Medium',
        resolved: true,
        satisfactionScore: 4.7
      },
      {
        id: 5,
        messages: [
          {
            role: 'consumer',
            content: 'I\'m a homeowner—want to buy the Big Sky console (HF-6677). Closest is Raleigh (4.4⭐), but UrbanLoft (4.8⭐) is in Greensboro. Route me?',
            timestamp: '2025-01-15T16:15:00Z'
          },
          {
            role: 'assistant',
            content: 'Routing to UrbanLoft (4.8⭐, 215 reviews). Contact details sent. Post-routing CSAT: 89.5%.',
            timestamp: '2025-01-15T16:15:20Z'
          },
          {
            role: 'consumer',
            content: 'Thanks!',
            timestamp: '2025-01-15T16:16:00Z'
          }
        ],
        summary: 'Direct Consumer - Routing to dealer for HF-6677 Big Sky console',
        customerType: 'Direct Consumer',
        salesIntent: 'buying',
        dealerType: 'Consumer',
        sku: 'HF-6677',
        category: 'Dealer Relations',
        priority: 'Medium',
        resolved: true,
        satisfactionScore: 4.6
      },
      {
        id: 6,
        messages: [
          {
            role: 'dealer',
            content: 'UrbanLoft—what\'s our average order value for July?',
            timestamp: '2025-01-15T17:00:00Z'
          },
          {
            role: 'assistant',
            content: 'Your AOV is $892. Would you like it broken down by top SKUs?',
            timestamp: '2025-01-15T17:00:10Z'
          },
          {
            role: 'dealer',
            content: 'Yes, please—top three.',
            timestamp: '2025-01-15T17:00:30Z'
          },
          {
            role: 'assistant',
            content: 'HF-3124 $1,020; HF-5560 $975; HF-2008 $938.',
            timestamp: '2025-01-15T17:00:45Z'
          }
        ],
        summary: 'UrbanLoft - AOV inquiry and top SKU breakdown',
        customerType: 'Reseller',
        salesIntent: 'browsing',
        dealerType: 'Reseller',
        sku: 'Multiple',
        category: 'Dealer Relations',
        priority: 'Low',
        resolved: true,
        satisfactionScore: 4.8
      }
    ];

    // Transform for analytics format with proper Hooker Furniture data
    const detailedConversations = hookerConversations.map(conv => ({
      messages: conv.messages,
      summary: conv.summary,
      originalTimestamp: conv.messages[0].timestamp,
      customerType: conv.customerType,
      salesIntent: conv.salesIntent,
      deviceInterest: conv.sku, // Use SKU instead of device
      dealerType: conv.dealerType,
      category: conv.category,
      priority: conv.priority,
      sku: conv.sku,
      storeId: Math.floor(Math.random() * 10) + 1,
      competitorMentioned: null,
      priceSensitivity: 'medium',
      familyPlanInterest: false // Not applicable for furniture
    }));

    // Response patterns organized by furniture categories
    const responsePatterns = [
      {
        type: 'Custom Orders',
        examples: hookerConversations.filter(c => c.category === 'Custom Orders').slice(0, 3)
      },
      {
        type: 'Warranty Claims', 
        examples: hookerConversations.filter(c => c.category === 'Warranty Claims').slice(0, 3)
      },
      {
        type: 'Inventory Status',
        examples: hookerConversations.filter(c => c.category === 'Inventory Status').slice(0, 3)
      },
      {
        type: 'Finish Samples',
        examples: hookerConversations.filter(c => c.category === 'Finish Samples').slice(0, 3)
      }
    ];

    return NextResponse.json({
      success: true,
      conversations: hookerConversations,
      detailedConversations,
      responsePatterns,
      totalConversations: hookerConversations.length,
      overview: {
        totalConversations: hookerConversations.length,
        buyingIntent: hookerConversations.filter(c => c.salesIntent === 'buying').length,
        competitorMentions: 0, // No competitors in furniture data
        familyPlanInterest: 0, // Not applicable
        improvementRate: '9.2' // 90.8% satisfaction
      }
    });
  } catch (error) {
    console.error('Error generating Hooker conversations:', error);
    return NextResponse.json(
      { error: 'Failed to generate conversation data' },
      { status: 500 }
    );
  }
} 