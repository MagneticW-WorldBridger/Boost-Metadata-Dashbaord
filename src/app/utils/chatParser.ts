export type Message = {
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
  id?: string | number;
  proposed_reply?: string | null;
};

export type ParsedChat = {
  messages: Message[];
  summary: {
    userMessageCount: number;
    botMessageCount: number;
    topics: string[];
    needsImprovement: boolean;
  };
};

const IMPROVEMENT_INDICATORS = [
  'let me connect you',
  'I need to transfer you',
  'please contact customer service',
  'unable to assist',
  'cannot help with that'
];

const TOPIC_PATTERNS = {
  device_interest: ['iPhone', 'Samsung', 'phone', 'upgrade', 'device'],
  pricing: ['cost', 'price', 'expensive', 'budget', 'monthly'],
  plans: ['unlimited', 'family plan', 'plan', 'data'],
  competition: ['Verizon', 'AT&T', 'T-Mobile', 'switching', 'carrier'],
  support: ['help', 'problem', 'issue', 'not working'],
  family: ['daughter', 'son', 'family', 'kids', 'teenager']
};

export function parseChat(chatHistory: string): ParsedChat {
  const messages: Message[] = [];
  let userCount = 0;
  let botCount = 0;
  let needsImprovement = false;
  const detectedTopics = new Set<string>();

  // Split by double spaces which separate messages in the chat history
  const parts = chatHistory.split('  ').filter(part => part.trim());

  for (const part of parts) {
    const match = part.match(/^(Bot|User) \((.*?)\): ([\s\S]+)$/);
    if (!match) continue;

    const [_, role, timestamp, content] = match;
    const isUser = role === 'User';
    const trimmedContent = content.trim();

    if (isUser) {
      userCount++;
      // Detect topics from user messages for Boost Mobile
      for (const [topic, patterns] of Object.entries(TOPIC_PATTERNS)) {
        if (patterns.some(pattern => trimmedContent.toLowerCase().includes(pattern.toLowerCase()))) {
          detectedTopics.add(topic);
        }
      }
    } else {
      botCount++;
      // Check if response indicates need for improvement
      if (IMPROVEMENT_INDICATORS.some(indicator => 
        trimmedContent.toLowerCase().includes(indicator.toLowerCase()))) {
        needsImprovement = true;
      }
    }

    messages.push({
      role: isUser ? 'user' : 'bot',
      content: trimmedContent,
      timestamp
    });
  }

  return {
    messages: messages.filter(m => m.content !== '👋'), // Remove empty messages with just emoji
    summary: {
      userMessageCount: userCount,
      botMessageCount: botCount,
      topics: Array.from(detectedTopics),
      needsImprovement
    }
  };
}

export function analyzeChats(chats: string[]): {
  totalConversations: number;
  totalUserMessages: number;
  totalBotMessages: number;
  improvementNeeded: number;
  topicDistribution: Record<string, number>;
  averageMessagesPerChat: number;
} {
  const analyses = chats.map(chat => parseChat(chat));
  const topicCounts: Record<string, number> = {};

  let totalUserMessages = 0;
  let totalBotMessages = 0;
  let improvementNeeded = 0;

  analyses.forEach(analysis => {
    totalUserMessages += analysis.summary.userMessageCount;
    totalBotMessages += analysis.summary.botMessageCount;
    if (analysis.summary.needsImprovement) improvementNeeded++;
    
    analysis.summary.topics.forEach(topic => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    });
  });

  return {
    totalConversations: chats.length,
    totalUserMessages,
    totalBotMessages,
    improvementNeeded,
    topicDistribution: topicCounts,
    averageMessagesPerChat: (totalUserMessages + totalBotMessages) / chats.length
  };
} 