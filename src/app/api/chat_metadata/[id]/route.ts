import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { proposed_reply } = await request.json();
    if (!proposed_reply || !id) {
      return NextResponse.json({ error: 'Missing id or proposed_reply' }, { status: 400 });
    }
    const result = await sql`
      UPDATE chat_metadata
      SET proposed_reply = ${proposed_reply}
      WHERE id = ${id}
      RETURNING id, proposed_reply;
    `;
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, id, proposed_reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 