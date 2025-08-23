import { createClient } from '@/src/lib/utils/supabase/server';
import {
  getUserDetails,
  getSubscription,
  getUser
} from '@/src/lib/utils/supabase/queries';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import Card from '@/src/components/ui/Card';
import Button from '@/src/components/ui/Button';

import { LogOut, Settings, CreditCard, HelpCircle } from "lucide-react";

export default async function Dashboard() {
  const supabase = createClient();
  const [user, userDetails, subscription] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase)
  ]);

  if (!user) {
    return redirect('/signin');
  }

  return (
        <div className="min-h-screen bg-gray-50 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
              <header className="mb-12 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {userDetails?.full_name || user?.email} 👋
                </h1>
                <p className="mt-3 text-gray-600">
                  Here’s a quick overview of your account.
                </p>
            </header>


        {/* Dashboard Overview Cards */}
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        title="Subscription"
        description="Your current plan status."
        footer={
          <Link
            href="/account"
            className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
          >
            Manage subscription
          </Link>
        }
      >
        <p className="mt-2 text-lg font-semibold">
          {subscription?.status === 'active'
            ? '✅ Active'
            : '⚠️ No Active Subscription'}
        </p>
      </Card>

      <Card
        title="Account"
        description="Manage your personal information and settings."
        footer={
          <Link
            href="/account"
            className="text-sm font-medium text-cyan-700 hover:text-cyan-900"
          >
            View account details
          </Link>
        }
      >
        <p className="mt-2 text-lg font-semibold">Settings</p>
      </Card>

    </section>
    </div>
</div>
  );
}