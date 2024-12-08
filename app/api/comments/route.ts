import { NextResponse } from 'next/server';

import createComments from '@/lib/createComment';
import deleteComments from '@/lib/deleteComment';
import {fetchComment} from '@/lib/fetchComment';

import type { NextRequest } from 'next/server';

// GET handler
export async function GET(req: NextRequest) {
  const response = await fetchComment(req);
  return NextResponse.json(response);
}

// POST handler
export async function POST(req: NextRequest) {
  const response = await createComments(req);
  return NextResponse.json(response);
}

// DELETE handler
export async function DELETE(req: NextRequest) {
  const response = await deleteComments(req);
  return NextResponse.json(response);
}
