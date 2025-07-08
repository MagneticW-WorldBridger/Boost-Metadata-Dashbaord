import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    // Analyze the query to determine what kind of information is being requested
    const queryLower = query.toLowerCase();
    
    // Common patterns and their corresponding SQL queries for Boost Mobile
    if (queryLower.includes('common') && queryLower.includes('concern')) {
      const result = await sql`
        WITH topic_counts AS (
          SELECT 
            CASE 
              WHEN last_text_input ILIKE ANY(ARRAY['%iPhone%', '%Samsung%', '%phone%', '%device%']) THEN 'Device Interest'
              WHEN last_text_input ILIKE ANY(ARRAY['%plan%', '%unlimited%', '%family%', '%data%']) THEN 'Plan Inquiries'
              WHEN last_text_input ILIKE ANY(ARRAY['%price%', '%cost%', '%budget%', '%cheap%']) THEN 'Pricing Concerns'
              WHEN last_text_input ILIKE ANY(ARRAY['%Verizon%', '%ATT%', '%T-Mobile%', '%switching%']) THEN 'Competitor Mentions'
              ELSE 'Other'
            END as topic,
            COUNT(*) as count
          FROM chat_metadata
          WHERE last_text_input IS NOT NULL
          GROUP BY topic
          ORDER BY count DESC
        )
        SELECT * FROM topic_counts
      `;
      return NextResponse.json({
        type: 'topicDistribution',
        data: result.rows
      });
    }

    if (queryLower.includes('device') || queryLower.includes('phone')) {
      const result = await sql`
        WITH device_trends AS (
          SELECT 
            DATE_TRUNC('day', last_seen) as date,
            COUNT(*) as count
          FROM chat_metadata
          WHERE last_text_input ILIKE ANY(ARRAY['%iPhone%', '%Samsung%', '%phone%', '%device%'])
          GROUP BY DATE_TRUNC('day', last_seen)
          ORDER BY date DESC
          LIMIT 30
        )
        SELECT * FROM device_trends
      `;
      return NextResponse.json({
        type: 'deviceTrends',
        data: result.rows
      });
    }

    if (queryLower.includes('response time') || queryLower.includes('how fast')) {
      const result = await sql`
        WITH response_times AS (
          SELECT 
            CASE 
              WHEN bot_reply ILIKE '%urgent%' OR last_text_input ILIKE '%urgent%' THEN 'Urgent'
              ELSE 'Normal'
            END as priority,
            AVG(EXTRACT(EPOCH FROM (last_seen - lag(last_seen) OVER (ORDER BY last_seen)))) as avg_response_time
          FROM chat_metadata
          WHERE bot_reply IS NOT NULL
          GROUP BY priority
        )
        SELECT * FROM response_times
      `;
      return NextResponse.json({
        type: 'responseTimes',
        data: result.rows
      });
    }

    if (queryLower.includes('improvement') || queryLower.includes('needs work')) {
      const result = await sql`
        WITH improvement_areas AS (
          SELECT 
            CASE 
              WHEN bot_reply ILIKE '%visit our store%' OR bot_reply ILIKE '%call us%' THEN 'Needs Store Visit'
              WHEN bot_reply ILIKE '%unable to%' OR bot_reply ILIKE '%cannot%' THEN 'Information Gap'
              WHEN bot_reply ILIKE '%speak with%agent%' THEN 'Requires Agent Support'
              ELSE 'Handled Successfully'
            END as improvement_category,
            COUNT(*) as count
          FROM chat_metadata
          WHERE bot_reply IS NOT NULL
          GROUP BY improvement_category
          ORDER BY count DESC
        )
        SELECT * FROM improvement_areas
      `;
      return NextResponse.json({
        type: 'improvementAreas',
        data: result.rows
      });
    }

    // Default response for unrecognized queries
    return NextResponse.json({
      type: 'error',
      message: 'Could not understand the query. Please try rephrasing or use one of the suggested queries.'
    });

  } catch (error) {
    console.error('Error processing chat query:', error);
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    );
  }
} 