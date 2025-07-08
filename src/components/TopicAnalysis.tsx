'use client';

import React from 'react';
import { Card, Title, BarChart } from '@tremor/react';

type TopicAnalysisProps = {
  topics: {
    name: string;
    count: number;
  }[];
};

export default function TopicAnalysis({ topics }: TopicAnalysisProps) {
  return (
    <Card className="mt-6">
      <Title>Topic Distribution</Title>
      <BarChart
        className="mt-4 h-72"
        data={topics}
        index="name"
        categories={["count"]}
        colors={["teal"]}
      />
    </Card>
  );
} 