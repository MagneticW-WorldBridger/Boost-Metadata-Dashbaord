import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Realistic Rural King farm supply customer conversations
    const curatedConversations = {
      detailedConversations: [
        {
          messages: [
            {
              role: 'user',
              content: 'Hi! I need help finding the right feed for my dairy cows. I have about 20 Holsteins and they\'re not producing as much milk as usual.',
              timestamp: '2025-01-15T10:30:00Z'
            },
            {
              role: 'bot',
              content: 'Hello! I can definitely help you with dairy cow nutrition. For Holsteins with decreased milk production, I\'d recommend our Premium Dairy Mix with 18% protein. How much are they currently eating per day?',
              timestamp: '2025-01-15T10:30:15Z'
            },
            {
              role: 'user',
              content: 'They\'re getting about 25 pounds each per day. Should I increase that?',
              timestamp: '2025-01-15T10:30:45Z'
            },
            {
              role: 'bot',
              content: 'Yes, for optimal milk production, Holsteins typically need 30-35 pounds daily. I\'d suggest gradually increasing to 30 pounds over the next week. We have the Premium Dairy Mix in stock at your local store.',
              timestamp: '2025-01-15T10:30:55Z'
            }
          ],
          summary: 'Customer seeking dairy cow feed advice for 20 Holsteins with decreased milk production - recommended Premium Dairy Mix with feeding guidelines',
          originalTimestamp: '2025-01-15T10:30:00Z',
          customerType: 'Dairy Farmer',
          salesIntent: 'buying',
          deviceInterest: 'Premium Dairy Mix Feed',
          storeId: 1,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'Do you carry Stihl chainsaws? I need one for cutting firewood and clearing some trees on my property.',
              timestamp: '2025-01-15T11:15:00Z'
            },
            {
              role: 'bot',
              content: 'Yes, we carry a full line of Stihl chainsaws! For firewood and tree clearing, I\'d recommend the MS 271 Farm Boss with 20" bar. It\'s perfect for property maintenance. What size trees are you typically cutting?',
              timestamp: '2025-01-15T11:15:08Z'
            },
            {
              role: 'user',
              content: 'Mostly 12-18 inch diameter oaks and maples. Sometimes bigger ones when they fall in storms.',
              timestamp: '2025-01-15T11:15:30Z'
            },
            {
              role: 'bot',
              content: 'Perfect! The MS 271 Farm Boss will handle those easily. It\'s $399.99 and comes with a 2-year warranty. We have it in stock at your local store. Would you like me to check if we have any current promotions?',
              timestamp: '2025-01-15T11:15:40Z'
            }
          ],
          summary: 'Customer inquired about Stihl chainsaws for firewood and tree clearing - recommended MS 271 Farm Boss with pricing and availability',
          originalTimestamp: '2025-01-15T11:15:00Z',
          customerType: 'Property Owner',
          salesIntent: 'buying',
          deviceInterest: 'Stihl MS 271 Farm Boss Chainsaw',
          storeId: 2,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'I\'m looking for organic vegetable seeds. I want to start a garden this spring and need tomatoes, peppers, and cucumbers. What varieties do you recommend for beginners?',
              timestamp: '2025-01-15T14:20:00Z'
            },
            {
              role: 'bot',
              content: 'Great choice! For beginners, I recommend our Organic Seed Starter Pack. It includes Early Girl tomatoes (great for beginners), California Wonder peppers (mild and productive), and Straight Eight cucumbers (disease-resistant). When do you plan to start planting?',
              timestamp: '2025-01-15T14:20:12Z'
            },
            {
              role: 'user',
              content: 'I\'m thinking early March. Should I start them indoors first?',
              timestamp: '2025-01-15T14:20:45Z'
            },
            {
              role: 'bot',
              content: 'Yes, absolutely! Start tomatoes and peppers indoors 6-8 weeks before your last frost date. We have seed starting trays and organic potting mix. The cucumbers can go directly in the ground in March. Would you like me to add those supplies to your order?',
              timestamp: '2025-01-15T14:20:55Z'
            }
          ],
          summary: 'Customer seeking organic vegetable seeds for beginner garden - recommended starter pack with planting advice and additional supplies',
          originalTimestamp: '2025-01-15T14:20:00Z',
          customerType: 'Home Gardener',
          salesIntent: 'buying',
          deviceInterest: 'Organic Vegetable Seeds & Supplies',
          storeId: 3,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'My John Deere tractor won\'t start. I think it might be the battery. Do you carry tractor batteries and can you help me figure out which one I need?',
              timestamp: '2025-01-15T15:45:00Z'
            },
            {
              role: 'bot',
              content: 'I can definitely help! We carry Interstate tractor batteries. What model John Deere do you have? That will help me determine the correct battery size and specifications.',
              timestamp: '2025-01-15T15:45:08Z'
            },
            {
              role: 'user',
              content: 'It\'s a 2018 John Deere 3038E compact utility tractor.',
              timestamp: '2025-01-15T15:46:00Z'
            },
            {
              role: 'bot',
              content: 'Perfect! For the John Deere 3038E, you\'ll need a Group 26R battery. We have the Interstate MT-26R in stock for $89.99. It\'s a maintenance-free battery with 500 CCA. Would you like me to check if we have it at your nearest store?',
              timestamp: '2025-01-15T15:46:15Z'
            }
          ],
          summary: 'Customer with John Deere 3038E tractor battery issue - identified correct Group 26R battery with pricing and availability',
          originalTimestamp: '2025-01-15T15:45:00Z',
          customerType: 'Tractor Owner',
          salesIntent: 'buying',
          deviceInterest: 'Interstate MT-26R Tractor Battery',
          storeId: 4,
          competitorMentioned: null,
          priceSensitivity: 'high',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'I need to fence in about 5 acres for my horses. What type of fencing material would you recommend? I want something that\'s safe for horses but won\'t break the bank.',
              timestamp: '2025-01-15T16:30:00Z'
            },
            {
              role: 'bot',
              content: 'For horses, I recommend our Horse Guard No-Climb fencing. It\'s specifically designed for equine safety with small openings that prevent hoof entrapment. For 5 acres, you\'ll need approximately 1,800 feet of fencing. What\'s your budget range?',
              timestamp: '2025-01-15T16:30:10Z'
            },
            {
              role: 'user',
              content: 'I\'d like to keep it under $5,000 if possible. Do you have any installation services or is it DIY?',
              timestamp: '2025-01-15T16:30:25Z'
            },
            {
              role: 'bot',
              content: 'The Horse Guard fencing will run about $3,200 for materials, keeping you well under budget. We offer installation services for an additional $1,200, or you can DIY. We have installation guides and all the tools you\'ll need. Would you like me to calculate the exact materials list?',
              timestamp: '2025-01-15T16:30:35Z'
            }
          ],
          summary: 'Customer planning 5-acre horse fencing project - recommended Horse Guard No-Climb fencing with material and installation options',
          originalTimestamp: '2025-01-15T16:30:00Z',
          customerType: 'Horse Owner',
          salesIntent: 'planning',
          deviceInterest: 'Horse Guard No-Climb Fencing',
          storeId: 5,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'I\'m looking for a good quality work boot for farm work. I spend a lot of time in muddy conditions and need something waterproof and comfortable for long days.',
              timestamp: '2025-01-15T17:15:00Z'
            },
            {
              role: 'bot',
              content: 'For farm work in muddy conditions, I recommend our Wolverine Overpass work boots. They\'re waterproof, have excellent traction, and are designed for all-day comfort. What size do you wear? We have them in stock in most sizes.',
              timestamp: '2025-01-15T17:15:12Z'
            },
            {
              role: 'user',
              content: 'I wear a size 11. Do you have them in wide width?',
              timestamp: '2025-01-15T17:15:30Z'
            },
            {
              role: 'bot',
              content: 'Yes! We have the Wolverine Overpass in size 11W. They\'re $149.99 and come with a 1-year warranty. They\'re perfect for your needs - waterproof, slip-resistant, and comfortable for long days. Would you like me to check if we have them at your local store?',
              timestamp: '2025-01-15T17:15:40Z'
            }
          ],
          summary: 'Customer seeking waterproof work boots for farm work - recommended Wolverine Overpass boots with sizing and availability check',
          originalTimestamp: '2025-01-15T17:15:00Z',
          customerType: 'Farm Worker',
          salesIntent: 'buying',
          deviceInterest: 'Wolverine Overpass Work Boots',
          storeId: 6,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'I need to buy some chicken feed. I have about 25 laying hens and want to make sure they\'re getting the right nutrition for good egg production.',
              timestamp: '2025-01-15T18:00:00Z'
            },
            {
              role: 'bot',
              content: 'For laying hens, I recommend our Layer Pellets with 16% protein and added calcium for strong eggshells. With 25 hens, you\'ll need about 100 pounds per month. We have it in 50-pound bags for $18.99 each. How many bags would you like?',
              timestamp: '2025-01-15T18:00:08Z'
            },
            {
              role: 'user',
              content: 'I\'ll take 2 bags to start. Do you also carry scratch grains for treats?',
              timestamp: '2025-01-15T18:00:20Z'
            },
            {
              role: 'bot',
              content: 'Yes! We have scratch grains in 25-pound bags for $12.99. It\'s great for treats and encourages natural foraging behavior. I\'ll add 2 bags of Layer Pellets and 1 bag of scratch grains to your order. Your total will be $50.97. Would you like me to check store availability?',
              timestamp: '2025-01-15T18:00:30Z'
            }
          ],
          summary: 'Customer purchasing chicken feed for 25 laying hens - ordered Layer Pellets and scratch grains with nutritional guidance',
          originalTimestamp: '2025-01-15T18:00:00Z',
          customerType: 'Chicken Owner',
          salesIntent: 'buying',
          deviceInterest: 'Layer Pellets & Scratch Grains',
          storeId: 7,
          competitorMentioned: null,
          priceSensitivity: 'medium',
          familyPlanInterest: false
        },
        {
          messages: [
            {
              role: 'user',
              content: 'I\'m looking for a good quality garden hose that won\'t kink easily. I have a large garden and need something durable that will last several seasons.',
              timestamp: '2025-01-15T19:30:00Z'
            },
            {
              role: 'bot',
              content: 'For durability and kink resistance, I recommend our Flexzilla garden hoses. They\'re made with a special polymer that prevents kinking and are guaranteed for life. What length do you need? We have them in 25, 50, and 100 feet.',
              timestamp: '2025-01-15T19:30:15Z'
            },
            {
              role: 'user',
              content: 'I think 50 feet would be perfect. What\'s the price and do you have them in stock?',
              timestamp: '2025-01-15T19:30:25Z'
            },
            {
              role: 'bot',
              content: 'The Flexzilla 50-foot garden hose is $39.99 and we have them in stock at your local store. They come in green and come with brass fittings. They\'re perfect for heavy garden use and won\'t kink or tangle. Would you like me to check if we have your preferred color in stock?',
              timestamp: '2025-01-15T19:30:35Z'
            }
          ],
          summary: 'Customer seeking durable garden hose for large garden - recommended Flexzilla 50-foot hose with lifetime guarantee and color options',
          originalTimestamp: '2025-01-15T19:30:00Z',
          customerType: 'Home Gardener',
          salesIntent: 'buying',
          deviceInterest: 'Flexzilla Garden Hose',
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