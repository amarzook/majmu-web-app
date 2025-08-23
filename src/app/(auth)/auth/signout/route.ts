import { createClient } from '@/src/lib/utils/supabase/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  // Check if a user's logged in
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL('/', request.url), {
    status: 302
  });
}