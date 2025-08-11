'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@tremor/react';
import { Activity, BarChart3, Brain, Users, Tractor, Sparkles, ArrowRight, Zap } from 'lucide-react';

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
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 flex items-center justify-center animate-fade-in">
      <div className="max-w-6xl mx-auto text-center" style={{ padding: 'var(--space-55)' }}>
        {/* Perfect Logo Section - Golden Ratio Layout */}
        <div style={{ marginBottom: 'var(--space-89)' }} className="animate-slide-up">
          <div className="flex items-center justify-center" style={{ gap: 'var(--space-55)', marginBottom: 'var(--space-34)' }}>
            {/* Left Brand Group */}
            <div className="gestalt-group flex items-center" style={{ gap: 'var(--space-21)', padding: 'var(--space-21)' }}>
              <div className="icon-container bg-green-100 border border-green-200">
                <Tractor className="text-green-600" style={{ width: 'var(--space-34)', height: 'var(--space-34)' }} />
              </div>
              <div className="text-left">
                <h1 className="text-perfect-4xl font-bold text-gray-900">Rural King</h1>
                <p className="text-perfect-lg text-gray-600">Farm Supply Analytics Dashboard</p>
              </div>
            </div>
            
            {/* Visual Separator - Perfect Golden Ratio */}
            <div style={{ 
              height: 'var(--space-89)', 
              width: '1px', 
              background: 'linear-gradient(to bottom, transparent, var(--gray-300), transparent)' 
            }}></div>
            
            {/* Right AI Group */}
            <div className="gestalt-group flex items-center" style={{ gap: 'var(--space-21)', padding: 'var(--space-21)' }}>
              <div className="icon-container bg-blue-100 border border-blue-200">
                <Brain className="text-blue-600" style={{ width: 'var(--space-34)', height: 'var(--space-34)' }} />
              </div>
              <div className="text-left">
                <h1 className="text-perfect-4xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
                  Store Intelligence Center
                </h1>
                <div className="flex items-center" style={{ gap: 'var(--space-8)', marginTop: 'var(--space-8)' }}>
                  <Sparkles className="text-blue-500" style={{ width: 'var(--space-21)', height: 'var(--space-21)' }} />
                  <p className="text-perfect-lg text-gray-600">AI-Powered Farm Supply Analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Perfect Feature Grid - Fibonacci Spacing */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 animate-slide-up" 
          style={{ 
            gap: 'var(--space-34)', 
            marginBottom: 'var(--space-89)' 
          }}
        >
          <div className="card-premium hover:scale-105 transition-all duration-300" style={{ padding: 'var(--space-34)' }}>
            <div className="icon-container bg-blue-100 mx-auto" style={{ marginBottom: 'var(--space-21)' }}>
              <BarChart3 className="text-blue-600" style={{ width: 'var(--space-21)', height: 'var(--space-21)' }} />
            </div>
            <h3 className="text-perfect-xl font-semibold text-gray-900" style={{ marginBottom: 'var(--space-13)' }}>
              Customer Analytics
            </h3>
            <p className="text-perfect-base text-gray-600">
              Monitor farm supply conversations and track customer interactions across all 135+ Rural King locations with AI-powered insights.
            </p>
          </div>
          
          <div className="card-premium hover:scale-105 transition-all duration-300" style={{ padding: 'var(--space-34)' }}>
            <div className="icon-container bg-green-100 mx-auto" style={{ marginBottom: 'var(--space-21)' }}>
              <Users className="text-green-600" style={{ width: 'var(--space-21)', height: 'var(--space-21)' }} />
            </div>
            <h3 className="text-perfect-xl font-semibold text-gray-900" style={{ marginBottom: 'var(--space-13)' }}>
              Store Intelligence
            </h3>
            <p className="text-perfect-base text-gray-600">
              AI-powered insights into customer sentiment, product preferences, and store performance optimization across the Rural King network.
            </p>
          </div>
          
          <div className="card-premium hover:scale-105 transition-all duration-300" style={{ padding: 'var(--space-34)' }}>
            <div className="icon-container bg-amber-100 mx-auto" style={{ marginBottom: 'var(--space-21)' }}>
              <Tractor className="text-amber-600" style={{ width: 'var(--space-21)', height: 'var(--space-21)' }} />
            </div>
            <h3 className="text-perfect-xl font-semibold text-gray-900" style={{ marginBottom: 'var(--space-13)' }}>
              Farm Supply Insights
            </h3>
            <p className="text-perfect-base text-gray-600">
              Track product performance, seasonal trends, and customer needs for farm supplies, tools, feed, and rural lifestyle products.
            </p>
          </div>
        </div>

        {/* Perfect CTA Section */}
        <div className="animate-slide-up">
          <Button 
            onClick={goToAnalytics}
            className="btn-premium group"
            style={{ 
              padding: 'var(--space-21) var(--space-34)',
              fontSize: 'var(--space-21)',
              fontWeight: '600'
            }}
          >
            <span>Launch Rural King Analytics</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" style={{ width: 'var(--space-21)', height: 'var(--space-21)' }} />
          </Button>
          
          <p className="text-perfect-base text-gray-500 mt-4">
            Redirecting automatically in <span className="font-semibold text-green-600">3 seconds</span>
          </p>
        </div>
      </div>
    </main>
  );
} 