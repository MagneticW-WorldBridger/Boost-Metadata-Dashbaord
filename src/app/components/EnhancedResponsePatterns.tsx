import { useState, useEffect } from 'react';
import { Card, Title, Text, Grid, Badge, BarChart, DonutChart } from '@tremor/react';
import { parseChat } from '@/app/utils/chatParser';

type ResponseData = {
  responseTypes: {
    name: string;
    count: number;
    percentage: number;
    examples: Array<{
      query: string;
      response: string;
      timestamp: string;
    }>;
  }[];
  escalationPatterns: {
    type: string;
    count: string;
    percentage: string;
  }[];
  commonQueries: {
    intent: string;
    count: number;
    percentage: number;
    examples: Array<{
      query: string;
      timestamp: string;
    }>;
  }[];
  responseQuality: {
    metric: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
  }[];
};

export function EnhancedResponsePatterns() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResponseData() {
      try {
        const result = await fetch('/api/enhanced_responses');
        const rawData = await result.json();
        
        // Convert string percentages to numbers for proper chart rendering
        const processedData = {
          ...rawData,
          responseTypes: rawData.responseTypes.map((item: any) => ({
            ...item,
            percentage: parseFloat(item.percentage),
            count: parseInt(item.count)
          }))
        };
        
        setData(processedData);
      } catch (error) {
        console.error('Failed to fetch response data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResponseData();
  }, []);

  if (isLoading || !data) {
    return <div className="animate-pulse">Loading...</div>;
  }

  const selectedTypeData = selectedType 
    ? data.responseTypes.find(t => t.name === selectedType)
    : null;

  return (
    <div className="space-y-6">
      {/* Response Types Overview */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card className="min-h-[400px]">
          <Title>Response Type Distribution</Title>
          <Text className="mt-2">Analysis of how the bot handles different types of queries</Text>
          {selectedType && (
            <div className="mt-2">
              <Badge color="blue">Selected: {selectedType}</Badge>
            </div>
          )}
          <div className="h-[300px] mt-4">
            <DonutChart
              data={data.responseTypes}
              category="percentage"
              index="name"
              valueFormatter={(value) => `${value.toFixed(1)}%`}
              colors={["emerald", "blue", "amber", "rose"]}
              onValueChange={(v) => setSelectedType(v?.name ?? null)}
              showTooltip={true}
              className="cursor-pointer w-full h-full"
            />
          </div>
        </Card>

        <Card className="min-h-[400px]">
          <Title>Response Examples</Title>
          <Text className="mt-2">
            {selectedType ? `Sample interactions for ${selectedType}` : 'Click on a response type to see examples'}
          </Text>
          <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto">
            {selectedTypeData?.examples?.map((example, idx) => {
              const chat = parseChat(example.response);
              let relevantBotResponse = '';
              for (let i = 0; i < chat.messages.length; i++) {
                const message = chat.messages[i];
                if (message.role === 'user' && 
                    (message.content.toLowerCase().includes(example.query.toLowerCase()) ||
                     example.query.toLowerCase().includes(message.content.toLowerCase()))) {
                  for (let j = i + 1; j < chat.messages.length; j++) {
                    if (chat.messages[j].role === 'bot') {
                      relevantBotResponse = chat.messages[j].content;
                      break;
                    }
                  }
                  break;
                }
              }
              if (!relevantBotResponse) {
                const lastBotMessage = chat.messages.filter(m => m.role === 'bot').pop();
                relevantBotResponse = lastBotMessage?.content || 'No response found';
              }
              return (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-start space-x-2">
                      <Badge color="blue">Q</Badge>
                      <div className="flex-1">
                        <Text>{example.query}</Text>
                        <Text className="text-xs text-gray-500 mt-1">{example.timestamp}</Text>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge color="emerald">A</Badge>
                      <div className="flex-1">
                        <Text>{relevantBotResponse}</Text>
                        <Text className="text-xs text-gray-500 mt-1">{example.timestamp}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {!selectedType && (
              <div className="text-center text-gray-500">
                Select a response type from the chart to see examples
              </div>
            )}
          </div>
        </Card>
      </Grid>

      {/* Response Quality Overview */}
      <Card className="min-h-[200px]">
        <Title>Response Quality Metrics</Title>
        <Text className="mt-2">Key performance indicators for bot responses</Text>
        <Grid numItems={1} numItemsLg={3} className="gap-6 mt-6">
          {data.responseQuality.map((metric, idx) => (
            <Card key={idx} decoration="top" decorationColor={
              metric.trend === 'up' ? "emerald" :
              metric.trend === 'down' ? "red" : "blue"
            }>
              <Text className="text-sm font-medium">{metric.metric}</Text>
              <div className="mt-2 flex items-center justify-between">
                <Text className="text-2xl font-bold">{metric.value}%</Text>
                <Badge color={
                  metric.trend === 'up' ? "emerald" :
                  metric.trend === 'down' ? "red" : "blue"
                }>
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                </Badge>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
                <div
                  className={`h-1 rounded-full ${
                    metric.trend === 'up' ? 'bg-emerald-500' :
                    metric.trend === 'down' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </Card>
          ))}
        </Grid>
      </Card>

      {/* Escalation Patterns */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card className="min-h-[400px]">
          <Title>Escalation Patterns</Title>
          <Text className="mt-2">When and why conversations need human intervention</Text>
          <div className="h-[300px] mt-4">
            <BarChart
              data={data.escalationPatterns}
              index="type"
              categories={["percentage"]}
              colors={["rose"]}
              valueFormatter={(value) => {
                const number = typeof value === 'string' ? parseFloat(value) : value;
                return `${number?.toFixed(1) ?? '0.0'}%`;
              }}
            />
          </div>
        </Card>

        <Card className="min-h-[400px]">
          <Title>Common Query Patterns</Title>
          <Text className="mt-2">Top grouped customer intents and real examples</Text>
          <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto">
            {data.commonQueries.length === 0 && (
              <div className="text-center text-gray-500">Not enough data yet—check back soon!</div>
            )}
            {data.commonQueries.map((intent, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge color="blue">{intent.intent}</Badge>
                    <Text className="font-medium">{intent.count} queries</Text>
                    <Text className="text-sm text-gray-500">{intent.percentage}%</Text>
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  {intent.examples && intent.examples.length > 0 ? (
                    intent.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="flex items-start space-x-2">
                        <Badge color="gray">Q</Badge>
                        <div>
                          <Text>{ex.query}</Text>
                          <Text className="text-xs text-gray-500 mt-1">{ex.timestamp}</Text>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Text className="text-xs text-gray-400">No example queries</Text>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  );
}