import { NextResponse } from 'next/server'
import { getAudiencePerformance } from '@/api/audience-performance'

export async function GET() {
  return NextResponse.json(getAudiencePerformance())
} 