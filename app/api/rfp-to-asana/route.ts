import { NextRequest, NextResponse } from 'next/server';
import { createAsanaTask } from '../../../lib/asana';

export async function POST(request: NextRequest) {
  try {
    const form = await request.json();
    const asanaRes = await createAsanaTask(form);
    return NextResponse.json({ success: true, asana: asanaRes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 