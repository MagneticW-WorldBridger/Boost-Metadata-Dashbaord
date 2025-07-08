'use client';

import React from 'react';
import { Card, Title } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

type TimeAnalyticsProps = {
  data: {
    created_at: Date;
    _count: {
      id: number;
    };
  }[];
};

export default function TimeAnalytics({ data }: TimeAnalyticsProps) {
  const formattedData = data.map(item => ({
    date: format(new Date(item.created_at), 'MM/dd'),
    count: item._count.id
  }));

  return (
    <Card className="mt-6">
      <Title>Interactions Over Time</Title>
      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#0694a2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 