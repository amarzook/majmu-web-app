import { createClient } from '@/src/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}