// Intelligent conversation parser for conversations.md
export interface ParsedConversation {
  id: string;
  title: string;
  category: string;
  customerType: 'enthusiastic' | 'business' | 'cautious' | 'teen' | 'family' | 'browsing';
  salesIntent: 'browsing' | 'comparing' | 'buying';
  deviceInterest: string;
  priceSensitivity: 'low' | 'medium' | 'high';
  competitorMentioned: string | null;
  familyPlanInterest: boolean;
  messages: Array<{
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
  }>;
  summary: string;
}

export function parseConversationsFromMd(mdContent: string): ParsedConversation[] {
  const conversations: ParsedConversation[] = [];
  
  // Split by conversation patterns
  const conversationPattern = /Conversation \d+:/g;
  const sections = mdContent.split(conversationPattern);
  
  sections.forEach((section, index) => {
    if (index === 0) return; // Skip the header
    
    // Extract conversation title/type
    const titleMatch = section.match(/^([^\n]+)/);
    const title = titleMatch ? titleMatch[1].trim() : `Conversation ${index}`;
    
    // Parse individual messages
    const messages: Array<{ role: 'user' | 'bot'; content: string; timestamp: Date }> = [];
    
    // Find all AiPRL and User exchanges
    const messagePattern = /(AiPRL:|User:)\s*([^]*?)(?=(?:AiPRL:|User:)|$)/g;
    let match;
    
    while ((match = messagePattern.exec(section)) !== null) {
      const role = match[1].startsWith('AiPRL') ? 'bot' : 'user';
      const content = match[2].trim();
      
      if (content && content.length > 10) { // Filter out very short messages
        messages.push({
          role,
          content: content.replace(/\n\s*\n/g, '\n').trim(),
          timestamp: new Date()
        });
      }
    }
    
    if (messages.length < 2) return; // Skip if not enough messages
    
    // Analyze conversation characteristics
    const fullText = messages.map(m => m.content).join(' ').toLowerCase();
    
    // Determine customer type
    let customerType: ParsedConversation['customerType'] = 'browsing';
    if (title.includes('Enthusiastic') || fullText.includes('excited') || fullText.includes('amazing')) {
      customerType = 'enthusiastic';
    } else if (title.includes('Business') || fullText.includes('business') || fullText.includes('work')) {
      customerType = 'business';
    } else if (fullText.includes('teenage') || fullText.includes('daughter') || fullText.includes('family')) {
      customerType = 'family';
    } else if (fullText.includes('careful') || fullText.includes('prefer to explore')) {
      customerType = 'cautious';
    }
    
    // Determine sales intent
    let salesIntent: ParsedConversation['salesIntent'] = 'browsing';
    if (fullText.includes('ready to move forward') || fullText.includes('ready to purchase') || fullText.includes('set this up today')) {
      salesIntent = 'buying';
    } else if (fullText.includes('comparing') || fullText.includes('considering') || fullText.includes('options')) {
      salesIntent = 'comparing';
    }
    
    // Extract device interest
    let deviceInterest = 'Unknown';
    if (fullText.includes('iphone 16')) deviceInterest = 'iPhone 16';
    else if (fullText.includes('samsung galaxy a15')) deviceInterest = 'Samsung Galaxy A15 5G';
    else if (fullText.includes('samsung galaxy s24')) deviceInterest = 'Samsung Galaxy S24 Ultra';
    else if (fullText.includes('iphone')) deviceInterest = 'iPhone';
    else if (fullText.includes('samsung')) deviceInterest = 'Samsung';
    
    // Determine price sensitivity
    let priceSensitivity: ParsedConversation['priceSensitivity'] = 'medium';
    if (fullText.includes('budget') || fullText.includes('cost') || fullText.includes('expensive') || fullText.includes('price difference')) {
      priceSensitivity = 'high';
    } else if (fullText.includes('premium') || fullText.includes('latest') || title.includes('Enthusiastic')) {
      priceSensitivity = 'low';
    }
    
    // Check for competitor mentions
    let competitorMentioned: string | null = null;
    if (fullText.includes('verizon')) competitorMentioned = 'Verizon';
    else if (fullText.includes('att') || fullText.includes('at&t')) competitorMentioned = 'AT&T';
    else if (fullText.includes('t-mobile')) competitorMentioned = 'T-Mobile';
    else if (fullText.includes('current provider')) competitorMentioned = 'Current Provider';
    
    // Check for family plan interest
    const familyPlanInterest = fullText.includes('family') || fullText.includes('daughter') || fullText.includes('adding');
    
    // Generate category
    let category = 'General Inquiry';
    if (deviceInterest.includes('iPhone') || deviceInterest.includes('Samsung')) category = 'Device Interest';
    if (fullText.includes('plan') || fullText.includes('service')) category = 'Plan Inquiry';
    if (competitorMentioned) category = 'Competitor Comparison';
    if (familyPlanInterest) category = 'Family Plan';
    
    const conversation: ParsedConversation = {
      id: `conv_${index}_${Date.now()}`,
      title,
      category,
      customerType,
      salesIntent,
      deviceInterest,
      priceSensitivity,
      competitorMentioned,
      familyPlanInterest,
      messages: messages.slice(0, 8), // Limit to first 8 exchanges
      summary: `${customerType} customer interested in ${deviceInterest} - ${salesIntent} intent`
    };
    
    conversations.push(conversation);
  });
  
  return conversations.slice(0, 12); // Return top 12 conversations
}

// Helper function to get conversation samples by category
export function getConversationsByCategory(conversations: ParsedConversation[]) {
  const categories = ['Device Interest', 'Plan Inquiry', 'Competitor Comparison', 'Family Plan', 'General Inquiry'];
  
  return categories.map(category => ({
    type: category,
    examples: conversations
      .filter(c => c.category === category)
      .slice(0, 3)
      .map(c => ({
        query: c.messages.find(m => m.role === 'user')?.content.substring(0, 150) + '...' || '',
        response: c.messages.find(m => m.role === 'bot')?.content.substring(0, 150) + '...' || '',
        timestamp: c.messages[0]?.timestamp.toLocaleString() || ''
      }))
  })).filter(cat => cat.examples.length > 0);
} 