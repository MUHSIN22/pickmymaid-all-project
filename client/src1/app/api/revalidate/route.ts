import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { secret, path } = await req.json();

  // Security check
  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
  revalidatePath(path || '/');
  // Trigger revalidation

  return NextResponse.json({ revalidated: true });
}
