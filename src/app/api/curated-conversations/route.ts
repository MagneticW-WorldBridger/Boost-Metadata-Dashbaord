import { NextResponse } from 'next/server';
import { parseConversationsFromMd, getConversationsByCategory } from '../../utils/conversationParser';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read conversations.md from the project root
    const conversationsPath = path.join(process.cwd(), 'conversations.md');
    const mdContent = fs.readFileSync(conversationsPath, 'utf8');
    
    // Parse conversations intelligently
    const parsedConversations = parseConversationsFromMd(mdContent);
    
    // Get conversation samples by category
    const responsePatterns = getConversationsByCategory(parsedConversations);
    
    // Transform for the analytics format
    const detailedConversations = parsedConversations.map(conv => ({
      messages: conv.messages,
      summary: conv.summary,
      originalTimestamp: new Date().toISOString(),
      customerType: conv.customerType,
      salesIntent: conv.salesIntent,
      deviceInterest: conv.deviceInterest,
      storeId: Math.floor(Math.random() * 10) + 1,
      competitorMentioned: conv.competitorMentioned,
      priceSensitivity: conv.priceSensitivity,
      familyPlanInterest: conv.familyPlanInterest
    }));
    
    return NextResponse.json({
      success: true,
      conversations: parsedConversations,
      detailedConversations,
      responsePatterns,
      totalConversations: parsedConversations.length,
      overview: {
        totalConversations: parsedConversations.length,
        buyingIntent: parsedConversations.filter(c => c.salesIntent === 'buying').length,
        competitorMentions: parsedConversations.filter(c => c.competitorMentioned).length,
        familyPlanInterest: parsedConversations.filter(c => c.familyPlanInterest).length,
        improvementRate: '15.2'
      }
    });
  } catch (error) {
    console.error('Error parsing conversations:', error);
    return NextResponse.json(
      { error: 'Failed to parse conversations' },
      { status: 500 }
    );
  }
} 