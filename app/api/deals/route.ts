import { NextRequest, NextResponse } from 'next/server';
import { sspRegistry } from '@/lib/ssps/ssps';

// TypeScript interface for a Deal
export interface Deal {
  id: string;
  name: string;
  type: string;
  scale: string;
  ssp: string;
  targeting?: any;
  creative?: any;
}

// Mock deals array (replace with DB or persistent store)
const mockDeals: Deal[] = [
  { id: 'TENT123', name: 'Holiday Shoppers', type: 'Tentpole', scale: 'Large', ssp: 'Nexxen' },
  { id: 'EVER456', name: 'Luxury Shoppers', type: 'Evergreen', scale: 'Medium', ssp: 'Index' },
];

// POST: Create a new deal (delegates to SSP integration)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const ssp = body.ssp?.toLowerCase();
  if (!ssp || !sspRegistry[ssp]) {
    return NextResponse.json({ success: false, error: 'Unknown or missing SSP' }, { status: 400 });
  }
  try {
    const result = await sspRegistry[ssp].createDeal(body);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

// GET: List all deals
export async function GET() {
  return NextResponse.json({ success: true, deals: mockDeals });
} 