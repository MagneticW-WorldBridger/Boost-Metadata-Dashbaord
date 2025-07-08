'use client';

import React from 'react';
import { Card, Title, DonutChart } from '@tremor/react';

type SentimentData = {
  name: string;
  value: number;
};

type SentimentAnalysisProps = {
  data: SentimentData[];
};

export default function SentimentAnalysis({ data }: SentimentAnalysisProps) {
  return (
    <Card className="mt-6">
      <Title>Interaction Sentiment Distribution</Title>
      <DonutChart
        className="mt-4 h-72"
        data={data}
        category="value"
        index="name"
        colors={["emerald", "yellow", "rose"]}
      />
    </Card>
  );
} 