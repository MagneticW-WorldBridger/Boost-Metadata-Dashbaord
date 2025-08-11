import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Realistic Hooker Furniture dealer conversations based on HOOKERCONVOS.MD
    const curatedConversations = {
      detailedConversations: [
        {
          messages: [
            {
              role: 'user',
              content: 'DécorPoint here—HF-3124 "Savion Deux" is out of stock. ETA?',
              timestamp: '2025-01-15T10:30:00Z'
            },
            {
              role: 'bot',
              content: 'Checking… Martinsville plant expects 40 units by July 18.',
              timestamp: '2025-01-15T10:30:15Z'
            },
            {
              role: 'user',
              content: 'Perfect. Reserve 15 for me, please.',
              timestamp: '2025-01-15T10:30:45Z'
            },
            {
              role: 'bot',
              content: 'Done—15 units of HF-3124 are flagged under your PO.',
              timestamp: '2025-01-15T10:30:55Z'
            }
          ],
          summary: 'DécorPoint successfully reserved 15 units of HF-3124 Savion Deux sofa with delivery scheduled for July 18',
          originalTimestamp: '2025-01-15T10:30:00Z',
          customerType: 'Authorized Dealer',
          salesIntent: 'buying',
          deviceInterest: 'HF-3124 Savion Deux',
          storeId: 1,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'UrbanLoft—what\'s our average order value for July?',
              timestamp: '2025-01-15T11:15:00Z'
            },
            {
              role: 'bot',
              content: 'Your AOV is $892. Would you like it broken down by top SKUs?',
              timestamp: '2025-01-15T11:15:08Z'
            },
            {
              role: 'user',
              content: 'Yes, please—top three.',
              timestamp: '2025-01-15T11:15:30Z'
            },
            {
              role: 'bot',
              content: 'HF-3124 $1,020; HF-5560 $975; HF-2008 $938.',
              timestamp: '2025-01-15T11:15:40Z'
            }
          ],
          summary: 'UrbanLoft reviewed their performance metrics showing $892 AOV with top SKUs identified',
          originalTimestamp: '2025-01-15T11:15:00Z',
          customerType: 'Premium Dealer',
          salesIntent: 'analyzing',
          deviceInterest: 'Performance Analytics',
          storeId: 2,
          competitorMentioned: null,
          priceSensitivity: 'low',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'ModernMakers—we need a Riverton sofa (HF-2008) at 96″ W×40″ D. Quote?',
              timestamp: '2025-01-15T14:20:00Z'
            },
            {
              role: 'bot',
              content: 'Custom dims are +10%. Base $375K MTD, so quote is $412.5K.',
              timestamp: '2025-01-15T14:20:12Z'
            },
            {
              role: 'user',
              content: 'Email that to me, and send finish samples in "Espresso."',
              timestamp: '2025-01-15T14:20:45Z'
            },
            {
              role: 'bot',
              content: 'Sent—quote in your inbox; "Espresso" swatches ship tomorrow.',
              timestamp: '2025-01-15T14:20:55Z'
            }
          ],
          summary: 'ModernMakers requested custom dimensions for HF-2008 Riverton sofa with quote and finish samples provided',
          originalTimestamp: '2025-01-15T14:20:00Z',
          customerType: 'Regional Dealer',
          salesIntent: 'buying',
          deviceInterest: 'HF-2008 Riverton Custom',
          storeId: 3,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'HomeStyle—my Fairfax sofa (HF-1103) arrived with a seam tear.',
              timestamp: '2025-01-15T15:45:00Z'
            },
            {
              role: 'bot',
              content: 'I\'m sorry to hear that. Can you share PO # and a photo?',
              timestamp: '2025-01-15T15:45:08Z'
            },
            {
              role: 'user',
              content: 'PO# HS-321, sent photo.',
              timestamp: '2025-01-15T15:46:00Z'
            },
            {
              role: 'bot',
              content: 'Tagged as "Fabric defect" (7.1% of returns). Replacement ships in 5 days.',
              timestamp: '2025-01-15T15:46:15Z'
            }
          ],
          summary: 'HomeStyle warranty claim for HF-1103 Fairfax sofa resolved with replacement unit scheduled',
          originalTimestamp: '2025-01-15T15:45:00Z',
          customerType: 'Authorized Dealer',
          salesIntent: 'support',
          deviceInterest: 'HF-1103 Fairfax',
          storeId: 4,
          competitorMentioned: null,
          priceSensitivity: 'high',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'ArtisanWorks—lead time on Nelson Zero Gravity (HF-4812) jumped to 5 days?',
              timestamp: '2025-01-15T16:30:00Z'
            },
            {
              role: 'bot',
              content: 'Correct. Last week\'s average was 5.1 days (vs. 4.2 usual) due to backlog.',
              timestamp: '2025-01-15T16:30:10Z'
            },
            {
              role: 'user',
              content: 'Any plan to bring it down?',
              timestamp: '2025-01-15T16:30:25Z'
            },
            {
              role: 'bot',
              content: 'Yes—extra shift added; expect 4 days again by next week.',
              timestamp: '2025-01-15T16:30:35Z'
            }
          ],
          summary: 'ArtisanWorks inquired about increased lead times for HF-4812 with production update provided',
          originalTimestamp: '2025-01-15T16:30:00Z',
          customerType: 'Boutique Dealer',
          salesIntent: 'planning',
          deviceInterest: 'HF-4812 Nelson Zero-G',
          storeId: 5,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'ClassicDesigns—our SLA dipped below 90% on July 2. Why?',
              timestamp: '2025-01-15T17:15:00Z'
            },
            {
              role: 'bot',
              content: 'SLA was 88.7%—two agents were out sick. We added temps and recovered to 95%.',
              timestamp: '2025-01-15T17:15:12Z'
            },
            {
              role: 'user',
              content: 'Good—thanks for the quick remedy.',
              timestamp: '2025-01-15T17:15:30Z'
            }
          ],
          summary: 'ClassicDesigns service level inquiry resolved with explanation of temporary staffing issue',
          originalTimestamp: '2025-01-15T17:15:00Z',
          customerType: 'Premium Dealer',
          salesIntent: 'monitoring',
          deviceInterest: 'Service Quality',
          storeId: 6,
          competitorMentioned: null,
          priceSensitivity: 'low',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'Can I book a showroom tour at Las Vegas Market?',
              timestamp: '2025-01-15T18:00:00Z'
            },
            {
              role: 'bot',
              content: 'Slots open July 24 at 10 AM or 3 PM. Which works?',
              timestamp: '2025-01-15T18:00:08Z'
            },
            {
              role: 'user',
              content: '3 PM.',
              timestamp: '2025-01-15T18:00:20Z'
            },
            {
              role: 'bot',
              content: 'Confirmed—Zoom link and directions sent.',
              timestamp: '2025-01-15T18:00:30Z'
            }
          ],
          summary: 'Designer scheduled Las Vegas Market showroom tour for July 24 at 3 PM',
          originalTimestamp: '2025-01-15T18:00:00Z',
          customerType: 'Interior Designer',
          salesIntent: 'exploring',
          deviceInterest: 'Showroom Experience',
          storeId: 7,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'I\'m a homeowner—want to buy the Big Sky console (HF-6677). Closest is Raleigh (4.4⭐), but UrbanLoft (4.8⭐) is in Greensboro. Route me?',
              timestamp: '2025-01-15T19:30:00Z'
            },
            {
              role: 'bot',
              content: 'Routing to UrbanLoft (4.8⭐, 215 reviews). Contact details sent. Post-routing CSAT: 89.5%.',
              timestamp: '2025-01-15T19:30:15Z'
            },
            {
              role: 'user',
              content: 'Thanks!',
              timestamp: '2025-01-15T19:30:25Z'
            }
          ],
          summary: 'Consumer routed to highest-rated dealer UrbanLoft for HF-6677 Big Sky console purchase',
          originalTimestamp: '2025-01-15T19:30:00Z',
          customerType: 'Direct Consumer',
          salesIntent: 'buying',
          deviceInterest: 'HF-6677 Big Sky Console',
          storeId: 8,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        }
      ]
    };

    return Response.json(curatedConversations);
  } catch (error) {
    console.error('Error in curated-conversations API:', error);
    return Response.json({ error: 'Failed to load conversations' }, { status: 500 });
  }
} 