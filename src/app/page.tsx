'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@tremor/react';
import { Activity, BarChart3, Brain, Users, Sofa } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  // Auto-redirect to analytics after 3 seconds or let user click to go immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/analytics');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const goToAnalytics = () => {
    router.push('/analytics');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-8">
        {/* Logo and Branding */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center border border-amber-200">
                <Sofa className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Hooker Furniture</h1>
                <p className="text-lg text-gray-600">Analytics Dashboard</p>
              </div>
            </div>
            <div className="h-16 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center border border-blue-200">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Dealer Intelligence Center
                </h1>
                <p className="text-lg text-gray-600 mt-2">B2B Conversation Analytics Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 mx-auto">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Chatbot Analytics</h3>
            <p className="text-gray-600">Monitor dealer conversations and track chatbot performance across all interactions.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 mx-auto">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Dealer Intelligence</h3>
            <p className="text-gray-600">AI-powered insights into dealer sentiment and conversation patterns.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4 mx-auto">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Live Manufacturing</h3>
            <p className="text-gray-600">Track facility performance and identify inventory optimization opportunities.</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-6">
          <Button 
            size="xl" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={goToAnalytics}
          >
            Enter Analytics Dashboard
          </Button>
          
          <p className="text-sm text-gray-500">
            Auto-redirecting in 3 seconds... <br />
            or click above to access immediately
          </p>
        </div>

        {/* Status Indicator */}
        <div className="mt-12 flex items-center justify-center space-x-3 text-sm text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>System Online • All Services Operational</span>
        </div>
      </div>
    </main>
  );
} 