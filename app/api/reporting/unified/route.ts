import { NextRequest, NextResponse } from 'next/server';

// TypeScript interface for a reporting record
export interface ReportingRecord {
  source: string;
  dealId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  timestamp: string;
}

// Mock reporting data (replace with DB or persistent store)
const mockReporting: ReportingRecord[] = [];

// POST: Ingest new reporting data
export async function POST(request: NextRequest) {
  const body = await request.json();
  // TODO: Validate and store reporting data
  // For now, just echo back
  return NextResponse.json({ success: true, received: body });
}

// GET: Return normalized/aggregated reporting
export async function GET() {
  // TODO: Aggregate and normalize reporting from all sources
  return NextResponse.json({ success: true, reporting: mockReporting });
} 