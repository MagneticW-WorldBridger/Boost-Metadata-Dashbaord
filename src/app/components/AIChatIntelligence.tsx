import { useState, useRef, useEffect } from 'react';
import { Brain, Sparkles, Send, X, Minimize2, User, Bot, Lightbulb, Zap, TrendingUp, MessageSquare, Star, Clock } from 'lucide-react';
import DOMPurify from 'dompurify';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type ChatResponse = {
  output: string;
}[];

interface AIChatIntelligenceProps {
  isFullscreen: boolean;
  onClose: () => void;
}

export function AIChatIntelligence({ isFullscreen, onClose }: AIChatIntelligenceProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your Rural King AI analytics assistant. I have access to all your farm supply customer conversation data and can provide deep insights, trends, and actionable recommendations for your 135+ stores. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestedQueries = [
    {
      text: "What are the most common customer inquiries?",
      category: "Topics",
      icon: MessageSquare,
      color: "blue"
    },
    {
      text: "Which farm supply products are customers most interested in?",
      category: "Products", 
      icon: TrendingUp,
      color: "orange"
    },
    {
      text: "What are the main equipment maintenance issues?",
      category: "Support",
      icon: Zap,
      color: "purple"
    },
    {
      text: "How many feed and nutrition requests do we get?",
      category: "Orders",
      icon: Star,
      color: "green"
    },
    {
      text: "What are the top customer concerns?",
      category: "Issues",
      icon: Lightbulb,
      color: "amber"
    },
    {
      text: "Which customers seem ready for large purchases?",
      category: "Sales",
      icon: TrendingUp,
      color: "emerald"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (query.trim()) {
        handleSendMessage();
      }
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [query]);

  // Function to clean markdown code blocks from AI response
  const cleanMarkdownCodeBlocks = (content: string) => {
    // Remove ```html at the beginning
    let cleaned = content.replace(/^```html\s*/i, '');
    // Remove ``` at the end
    cleaned = cleaned.replace(/\s*```$/i, '');
    return cleaned.trim();
  };

  // Function to safely render HTML content
  const renderHTML = (content: string) => {
    const sanitizedHTML = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'div', 'span',
        'ul', 'ol', 'li',
        'strong', 'em', 'b', 'i',
        'code', 'pre',
        'blockquote',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'a',
        'mark', 'del', 'ins',
        'sub', 'sup',
        'hr'
      ],
      ALLOWED_ATTR: ['href', 'target', 'class', 'id', 'style'],
      ALLOW_DATA_ATTR: false
    });
    
    return { __html: sanitizedHTML };
  };

  async function handleSendMessage(messageText?: string) {
    const textToSend = messageText || query;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetch('https://fotostesia.duckdns.org/webhook/deb0ffc5-fad5-4853-b1d5-ca7f0f451159', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: textToSend }),
      });
      
      if (!result.ok) throw new Error('Failed to get response');
      const data: ChatResponse = await result.json();
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanMarkdownCodeBlocks(data[0].output),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError('Failed to get response from AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isFullscreen) return null;

  return (
    <div className="ai-chat-fullscreen">
      <div className="ai-chat-container">
        {/* Header */}
        <div className="ai-chat-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="ai-avatar assistant">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <span>AI Intelligence</span>
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                </h1>
                <p className="text-gray-700">Your personal data analyst • {messages.length - 1} messages exchanged</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-gray-800 text-sm border border-white/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>AI Online</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-800 hover:bg-white/30 transition-colors border border-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="ai-chat-messages">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`ai-message ${message.role} ${
                message.role === 'user' ? 'animate-slide-in-right' : 'animate-slide-in-left'
              }`}
            >
              <div className={`ai-avatar ${message.role}`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Brain className="w-5 h-5" />
                )}
              </div>
              
              <div className={`ai-message-content ${message.role}`}>
                <div 
                  className="text-base leading-relaxed"
                  dangerouslySetInnerHTML={renderHTML(message.content)}
                />
                <div className={`flex items-center space-x-1 mt-3 text-xs ${
                  message.role === 'user' ? 'text-white/70' : 'text-gray-600'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="ai-message assistant animate-slide-in-left">
              <div className="ai-avatar assistant">
                <Brain className="w-5 h-5" />
              </div>
              <div className="ai-message-content assistant">
                <div className="ai-loading">
                  <div className="ai-loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>AI is analyzing your data...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="ai-message assistant animate-slide-in-left">
              <div className="ai-avatar assistant">
                <Brain className="w-5 h-5" />
              </div>
              <div className="ai-error">
                <div className="text-red-700">
                  {error}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="ai-chat-input">
          {/* Suggestions - Only show if no conversation yet */}
          {messages.length <= 1 && (
            <div className="ai-suggestions">
              <h3>
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Suggested Questions
              </h3>
              <div className="ai-suggestions-grid">
                {suggestedQueries.map((suggestion, idx) => {
                  const IconComponent = suggestion.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion.text)}
                      className="ai-suggestion-button"
                    >
                      <IconComponent className={`ai-suggestion-icon text-${suggestion.color}-600`} />
                      <span>{suggestion.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input Container */}
          <div className="ai-input-container">
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your dealer data..."
              className="ai-textarea"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!query.trim() || isLoading}
              className="ai-send-button"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-4 text-gray-600 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Connected to your data</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="w-3 h-3" />
                <span>Powered by advanced AI</span>
              </div>
            </div>
            <div className="text-xs">
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 