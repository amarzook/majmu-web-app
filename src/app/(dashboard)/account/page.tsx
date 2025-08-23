import CustomerPortalForm from '@/src/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/src/components/ui/AccountForms/EmailForm';
import NameForm from '@/src/components/ui/AccountForms/NameForm';
import { redirect } from 'next/navigation';
import { createClient } from '@/src/lib/utils/supabase/server';
import {
  getUserDetails,
  getSubscription,
  getUser
} from '@/src/lib/utils/supabase/queries';

export default async function Account() {
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Account Settings Card */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-8">
              Account Settings
            </h2>

            {/* Subscription Management */}
            <div className="mb-10">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Subscription & Billing
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <CustomerPortalForm subscription={subscription} />
              </div>
            </div>

            {/* Profile Settings */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Profile Information
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-6">
                <NameForm userName={userDetails?.full_name ?? ''} />
                <EmailForm userEmail={user.email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
