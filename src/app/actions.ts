'use server';

import { sql } from '@vercel/postgres';

export async function getChatAnalytics() {
  const totalInteractions = await sql`SELECT COUNT(*) FROM chat_metadata`;
  
  const unansweredQueries = await sql`
    SELECT last_text_input, last_seen 
    FROM chat_metadata 
    WHERE bot_reply ILIKE '%visit%store%' OR bot_reply ILIKE '%call%us%'
    ORDER BY last_seen DESC 
    LIMIT 10
  `;

  const deviceCount = await sql`
    SELECT COUNT(*) as count 
    FROM chat_metadata 
    WHERE last_text_input ILIKE ANY(ARRAY['%iPhone%', '%Samsung%', '%phone%', '%device%'])
  `;

  const planCount = await sql`
    SELECT COUNT(*) as count 
    FROM chat_metadata 
    WHERE last_text_input ILIKE ANY(ARRAY['%plan%', '%unlimited%', '%family%', '%data%'])
  `;

  const competitorCount = await sql`
    SELECT COUNT(*) as count 
    FROM chat_metadata 
    WHERE last_text_input ILIKE ANY(ARRAY['%Verizon%', '%ATT%', '%T-Mobile%', '%switching%'])
  `;

  return {
    totalInteractions: totalInteractions.rows[0].count,
    unansweredQueries: unansweredQueries.rows,
    commonTopics: [
      { name: 'Device Interest', count: Number(deviceCount.rows[0].count) },
      { name: 'Plan Inquiries', count: Number(planCount.rows[0].count) },
      { name: 'Competitor Mentions', count: Number(competitorCount.rows[0].count) }
    ]
  };
} 