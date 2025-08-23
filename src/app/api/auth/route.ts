import { createClient } from '@/src/lib/utils/supabase/server';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at
    }
  });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { action, email, password } = await request.json();

  if (action === 'signin') {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
  }

  if (action === 'signup') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}