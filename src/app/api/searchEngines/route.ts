import { NextResponse } from 'next/server';
import searchEngines from '@/data/searchEngines.json';

export async function GET() {
  return NextResponse.json(searchEngines);
}