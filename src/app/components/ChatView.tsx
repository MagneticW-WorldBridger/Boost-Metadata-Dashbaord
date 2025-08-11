import React from 'react';
import { Text } from '@tremor/react';
import { User, Bot, MessageCircle, Clock, Building2, Sofa, DollarSign, Package, Star, CheckCircle } from 'lucide-react';
import type { Message } from '../utils/chatParser';

interface ChatViewProps {
  messages: Message[];
}

export function ChatView({ messages }: ChatViewProps) {
  return (
    <div className="max-h-96 overflow-y-auto" style={{ padding: 'var(--space-21)' }}>
      <div style={{ gap: 'var(--space-21)' }} className="space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start animate-fade-in ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
            style={{ gap: 'var(--space-13)' }}
          >
            {message.role === 'bot' && (
              <div className="icon-container bg-blue-100 border border-blue-200 flex-shrink-0">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
            )}
            
            <div
              className={`max-w-[75%] card-premium ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-300'
                  : 'bg-white text-gray-900 border-gray-200'
              }`}
              style={{ 
                padding: 'var(--space-21)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-8)'
              }}
            >
              {/* Dealer/User Header */}
              {message.role === 'user' && (
                <div className="flex items-center" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
                  <Building2 className="w-4 h-4 text-white" />
                  <span className="text-perfect-xs font-semibold text-white">
                    {getDealerName(message.content)} • Authorized Dealer
                  </span>
                </div>
              )}
              
              {/* Assistant Header */}
              {message.role === 'bot' && (
                <div className="flex items-center" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
                  <Sofa className="w-4 h-4 text-amber-600" />
                  <span className="text-perfect-xs font-semibold text-gray-600">
                    Hooker Furniture Support • AI Assistant
                  </span>
                </div>
              )}
              
              {/* Message Content */}
              <div className={`text-perfect-base ${message.role === 'user' ? 'text-white' : 'text-gray-900'}`} style={{ lineHeight: 'var(--leading-normal)' }}>
                <span dangerouslySetInnerHTML={{ __html: enhanceMessageContent(message.content, message.role === 'user') }} />
              </div>
              
              {/* SKU Detection & Enhancement */}
              {detectSKU(message.content) && (
                <div 
                  className={`flex items-center rounded-lg mt-3 ${
                    message.role === 'user' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  style={{ padding: 'var(--space-8)', gap: 'var(--space-8)' }}
                >
                  <Package className="w-4 h-4" />
                  <span className="text-perfect-xs font-medium">
                    Product: {detectSKU(message.content)}
                  </span>
                </div>
              )}
              
              {/* Timestamp */}
              {message.timestamp && (
                <div className={`flex items-center mt-3 text-perfect-xs ${
                  message.role === 'user' ? 'text-white/90' : 'text-gray-500'
                }`} style={{ gap: 'var(--space-5)' }}>
                  <Clock className="w-3 h-3" />
                  <span>{formatTimestamp(message.timestamp)}</span>
                </div>
              )}
            </div>
            
            {message.role === 'user' && (
              <div className="icon-container bg-amber-100 border border-amber-200 flex-shrink-0">
                <Building2 className="w-5 h-5 text-amber-600" />
              </div>
            )}
          </div>
        ))}
        
        {/* Conversation Outcome Badge */}
        <div className="flex justify-center">
          <div className="flex items-center card-premium bg-green-50 border-green-200" style={{ 
            padding: 'var(--space-13) var(--space-21)', 
            gap: 'var(--space-8)' 
          }}>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-perfect-sm font-medium text-green-700">
              Conversation Resolved • Dealer Satisfied
            </span>
            <Star className="w-4 h-4 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Functions for Enhanced B2B Context
function getDealerName(content: string): string {
  // Extract dealer names from conversation content - improved detection
  const dealerPatterns = [
    'UrbanLoft', 'HomeStyle', 'DécorPoint', 'ModernMakers', 'ClassicDesigns',
    'MetroFurnishings', 'ArtisanWorks', 'LuxeInteriors', 'HeritageHome', 'PrimeSpaces'
  ];
  
  for (const dealer of dealerPatterns) {
    if (content.includes(dealer)) return dealer;
  }
  
  // Check for "I'm a homeowner" pattern
  if (content.toLowerCase().includes("i'm a homeowner") || content.toLowerCase().includes("homeowner")) {
    return 'Direct Consumer';
  }
  
  // Check for "I'm a designer" pattern  
  if (content.toLowerCase().includes("i'm a designer") || content.toLowerCase().includes("designer")) {
    return 'Interior Designer';
  }
  
  return 'Authorized Dealer';
}

function detectSKU(content: string): string | null {
  // Detect Hooker Furniture SKU patterns
  const skuMatch = content.match(/HF-\d{4}|(?:Big Sky|Savion Deux|Jericho|Riverton|Nelson|Fairfax|Meridian|Fleetwood|Charleston)/);
  return skuMatch ? skuMatch[0] : null;
}

function enhanceMessageContent(content: string, isUserMessage: boolean = false): string {
  // Enhance message content with proper formatting based on message type
  let enhanced = content;
  
  if (isUserMessage) {
    // For user messages (white text), use white-compatible highlighting
    enhanced = enhanced
      .replace(/HF-(\d{4})/g, '<strong class="text-yellow-200">HF-$1</strong>')
      .replace(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g, '<strong class="text-green-200">$$$1</strong>')
      .replace(/(\d+)\s*units?/gi, '<strong class="text-blue-200">$1 units</strong>');
  } else {
    // For bot messages (dark text), use regular highlighting
    enhanced = enhanced
      .replace(/HF-(\d{4})/g, '<strong class="text-purple-600">HF-$1</strong>')
      .replace(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g, '<strong class="text-green-600">$$$1</strong>')
      .replace(/(\d+)\s*units?/gi, '<strong class="text-blue-600">$1 units</strong>');
  }
  
  return enhanced;
}

function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch {
    return timestamp;
  }
}

export function ResponsePatternView({ 
  type,
  examples
}: { 
  type: string;
  examples: Array<{
    query: string;
    response: string;
    timestamp: string;
  }>;
}) {
  return (
    <div style={{ gap: 'var(--space-21)' }} className="space-y-6">
      <div className="flex items-center" style={{ gap: 'var(--space-13)', marginBottom: 'var(--space-21)' }}>
        <div className="icon-container bg-purple-100">
          <MessageCircle className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-perfect-lg font-semibold text-gray-900">{type} Patterns</h3>
          <p className="text-perfect-sm text-gray-600">Common dealer interaction patterns</p>
        </div>
      </div>
      
      {examples.map((example, idx) => (
        <div key={idx} className="card-premium hover-lift" style={{ padding: 'var(--space-21)' }}>
          <div style={{ gap: 'var(--space-13)' }} className="space-y-4">
            {/* Dealer Query */}
            <div className="flex items-start" style={{ gap: 'var(--space-13)' }}>
              <div className="icon-container bg-amber-100" style={{ width: 'var(--space-34)', height: 'var(--space-34)' }}>
                <Building2 className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="text-perfect-xs font-semibold text-gray-500 mb-2">Dealer Query:</div>
                <div className="text-perfect-sm text-gray-900" dangerouslySetInnerHTML={{ 
                  __html: enhanceMessageContent(example.query, false) 
                }} />
              </div>
            </div>
            
            {/* Bot Response */}
            <div className="flex items-start" style={{ gap: 'var(--space-13)' }}>
              <div className="icon-container bg-blue-100" style={{ width: 'var(--space-34)', height: 'var(--space-34)' }}>
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-perfect-xs font-semibold text-gray-500 mb-2">AI Response:</div>
                <div className="text-perfect-sm text-blue-700" dangerouslySetInnerHTML={{ 
                  __html: enhanceMessageContent(example.response, false) 
                }} />
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center text-perfect-xs text-gray-500" style={{ gap: 'var(--space-5)' }}>
                <Clock className="w-3 h-3" />
                <span>{formatTimestamp(example.timestamp)}</span>
              </div>
              <div className="flex items-center text-perfect-xs text-green-600" style={{ gap: 'var(--space-5)' }}>
                <CheckCircle className="w-3 h-3" />
                <span>Resolved</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Export enhanced chat summary component
export function ChatSummary({ summary }: { summary: string }) {
  return (
    <div className="card-premium bg-blue-50 border-blue-200" style={{ padding: 'var(--space-21)' }}>
      <div className="flex items-start" style={{ gap: 'var(--space-13)' }}>
        <div className="icon-container bg-blue-100">
          <MessageCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="text-perfect-sm font-semibold text-blue-900 mb-2">Conversation Summary</h4>
          <p className="text-perfect-sm text-blue-800" style={{ lineHeight: 'var(--leading-normal)' }}>
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}