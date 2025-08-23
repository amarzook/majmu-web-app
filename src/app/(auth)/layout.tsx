import { createClient } from '@/src/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function AuthLayout({ children }: PropsWithChildren) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}