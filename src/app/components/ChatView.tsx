import React from 'react';
import { Text } from '@tremor/react';
import { User, Bot, MessageCircle, Clock } from 'lucide-react';
import type { Message } from '../utils/chatParser';

interface ChatViewProps {
  messages: Message[];
}

export function ChatView({ messages }: ChatViewProps) {
  return (
    <div className="max-h-96 overflow-y-auto custom-scrollbar">
      <div className="space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'bot' && (
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200'
              }`}
            >
              <div className="text-sm leading-relaxed">
                {message.content}
              </div>
              {message.timestamp && (
                <div className={`flex items-center space-x-1 mt-2 text-xs ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
              )}
            </div>
            
            {message.role === 'user' && (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
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
    <div className="space-y-4">
      {examples.map((example, idx) => (
        <div key={idx} className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/20 shadow-xl hover:bg-white/10 transition-all duration-300">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="min-w-[100px] text-sm font-medium text-white/70">
                User Query:
              </div>
              <div className="flex-1 text-white">
                {example.query}
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="min-w-[100px] text-sm font-medium text-white/70">
                Bot Response:
              </div>
              <div className="flex-1 text-blue-300">
                {example.response}
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm text-white/60">
              <span>{example.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChatSummary({ 
  userMessageCount, 
  botMessageCount, 
  topics,
  needsImprovement 
}: { 
  userMessageCount: number;
  botMessageCount: number;
  topics?: string[];
  needsImprovement: boolean;
}) {
  return (
    <div className="backdrop-blur-xl bg-white/5 p-4 rounded-xl border border-white/20 space-y-3">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-white/70">Messages:</span>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20 backdrop-blur-sm">
            {userMessageCount} user
          </span>
          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-400/30 backdrop-blur-sm">
            {botMessageCount} bot
          </span>
        </div>
      </div>

      {topics && topics.length > 0 && (
        <div className="space-y-1">
          <span className="text-sm font-medium text-white/70">Topics:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {topics.map((topic, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-400/30 backdrop-blur-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {needsImprovement && (
        <div className="flex items-center space-x-2 text-amber-300 bg-amber-500/20 px-3 py-2 rounded-lg border border-amber-400/30 backdrop-blur-sm">
          <span className="text-sm font-medium">Response could be improved</span>
        </div>
      )}
    </div>
  );
}