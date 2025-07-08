import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const topicQuery = await sql`
      WITH topic_classification AS (
        SELECT 
          CASE 
            WHEN last_text_input ILIKE ANY(ARRAY['%iPhone%', '%Samsung%', '%phone%', '%device%', '%upgrade%']) THEN 'Device Interest'
            WHEN last_text_input ILIKE ANY(ARRAY['%plan%', '%unlimited%', '%family%', '%data%']) THEN 'Plan Inquiries'
            WHEN last_text_input ILIKE ANY(ARRAY['%Verizon%', '%ATT%', '%T-Mobile%', '%switching%']) THEN 'Competitor Mentions'
            WHEN last_text_input ILIKE ANY(ARRAY['%price%', '%cost%', '%budget%', '%cheap%', '%expensive%']) THEN 'Pricing Concerns'
            ELSE 'General Inquiries'
          END as topic_category,
          CASE 
            WHEN bot_reply ILIKE '%store%' OR bot_reply ILIKE '%visit%' OR bot_reply ILIKE '%location%' THEN true
            ELSE false
          END as needs_store_visit
        FROM chat_metadata
        WHERE last_text_input IS NOT NULL
      )
      SELECT 
        topic_category,
        COUNT(*) as total_count,
        COUNT(CASE WHEN needs_store_visit THEN 1 END) as store_visits_needed,
        ROUND(
          (COUNT(CASE WHEN needs_store_visit THEN 1 END)::float / COUNT(*) * 100)::numeric, 
          1
        ) as store_visit_rate
      FROM topic_classification
      GROUP BY topic_category
      ORDER BY total_count DESC
    `;

    const keywordAnalysis = await sql`
      WITH keyword_counts AS (
        SELECT 
          unnest(string_to_array(lower(last_text_input), ' ')) as word,
          COUNT(*) as frequency
        FROM chat_metadata
        WHERE last_text_input IS NOT NULL
        GROUP BY word
        HAVING COUNT(*) >= 3
        ORDER BY frequency DESC
        LIMIT 50
      )
      SELECT 
        COUNT(CASE WHEN last_text_input ILIKE ANY(ARRAY['%iPhone%', '%Samsung%', '%phone%', '%device%']) THEN 1 END) as "Device",
        COUNT(CASE WHEN last_text_input ILIKE ANY(ARRAY['%plan%', '%unlimited%', '%family%']) THEN 1 END) as "Plans",
        COUNT(CASE WHEN last_text_input ILIKE ANY(ARRAY['%Verizon%', '%ATT%', '%T-Mobile%']) THEN 1 END) as "Competitors",
        COUNT(CASE WHEN last_text_input ILIKE ANY(ARRAY['%price%', '%cost%', '%budget%']) THEN 1 END) as "Pricing"
      FROM chat_metadata
      WHERE last_text_input IS NOT NULL
    `;

    const sentimentAnalysis = await sql`
      WITH sentiment_classification AS (
        SELECT 
          CASE 
            WHEN last_text_input ILIKE ANY(ARRAY['%love%', '%great%', '%awesome%', '%excellent%', '%amazing%']) THEN 'positive'
            WHEN last_text_input ILIKE ANY(ARRAY['%hate%', '%terrible%', '%awful%', '%worst%', '%frustrated%']) THEN 'negative'
            ELSE 'neutral'
          END as sentiment,
          customer_type
        FROM chat_metadata
        WHERE last_text_input IS NOT NULL
      )
      SELECT 
        sentiment,
        COUNT(*) as count,
        ROUND((COUNT(*)::float / (SELECT COUNT(*) FROM chat_metadata WHERE last_text_input IS NOT NULL) * 100)::numeric, 1) as percentage
      FROM sentiment_classification
      GROUP BY sentiment
      ORDER BY count DESC
    `;

    const timeAnalysis = await sql`
      SELECT 
        EXTRACT(hour FROM last_seen) as hour,
        COUNT(*) as conversation_count
      FROM chat_metadata
      WHERE last_seen IS NOT NULL
      GROUP BY hour
      ORDER BY hour
    `;

    const enhancedKeywords = await sql`
      WITH boost_keywords AS (
        SELECT 
          k.word,
          k.frequency,
          CASE 
            WHEN k.word IN ('iphone', 'samsung', 'phone', 'device') THEN 'device'
            WHEN k.word IN ('plan', 'unlimited', 'family', 'data') THEN 'plans'
            WHEN k.word IN ('verizon', 'att', 'tmobile', 'switching') THEN 'competitors'
            WHEN k.word IN ('price', 'cost', 'budget', 'cheap') THEN 'pricing'
            ELSE 'general'
          END as category
        FROM (
          SELECT 
            unnest(string_to_array(lower(last_text_input), ' ')) as word,
            COUNT(*) as frequency
          FROM chat_metadata
          WHERE last_text_input IS NOT NULL
          GROUP BY word
          HAVING COUNT(*) >= 2
          ORDER BY frequency DESC
          LIMIT 30
        ) k
        WHERE k.word NOT IN ('the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her', 'its', 'our', 'their')
      )
      SELECT 
        word,
        frequency,
        category
      FROM boost_keywords
      ORDER BY frequency DESC
    `;

    const formattedTopics = topicQuery.rows.map(row => ({
      topic: row.topic_category,
      count: parseInt(row.total_count),
      storeVisitsNeeded: parseInt(row.store_visits_needed),
      storeVisitRate: parseFloat(row.store_visit_rate)
    }));

    const categoryBreakdown = {
      Device: parseInt(keywordAnalysis.rows[0].Device) || 0,
      Plans: parseInt(keywordAnalysis.rows[0].Plans) || 0,
      Competitors: parseInt(keywordAnalysis.rows[0].Competitors) || 0,
      Pricing: parseInt(keywordAnalysis.rows[0].Pricing) || 0
    };

    return NextResponse.json({
      topicDistribution: formattedTopics,
      categoryBreakdown,
      sentimentAnalysis: sentimentAnalysis.rows,
      timeDistribution: timeAnalysis.rows,
      enhancedKeywords: enhancedKeywords.rows,
      summary: {
        totalTopics: formattedTopics.length,
        mostDiscussedTopic: formattedTopics[0]?.topic || 'None',
        averageStoreVisitRate: formattedTopics.reduce((acc, topic) => acc + topic.storeVisitRate, 0) / formattedTopics.length || 0
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enhanced topic analysis' },
      { status: 500 }
    );
  }
} 