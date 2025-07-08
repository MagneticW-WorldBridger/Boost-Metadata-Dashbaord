import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`SELECT COUNT(*) FROM chat_metadata`;
    return NextResponse.json({ count: result.rows[0].count });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch count from database' },
      { status: 500 }
    );
  }
} 