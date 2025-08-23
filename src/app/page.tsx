import { createClient } from '@/src/lib/utils/supabase/server';
import { getUser } from '@/src/lib/utils/supabase/queries';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function HomePage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  // Redirect authenticated users
  if (user) {
    return redirect('/dashboard');
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-28 lg:px-8 py-12">
        {/* Background Gradient */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
            
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Build & Launch Your SaaS <span className="text-indigo-600">Faster</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Skip the boilerplate. Our starter kit gives you authentication,
            payments, and a production-ready database — everything you need to
            ship in days, not months.
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="mx-auto max-w-5xl py-20 px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Modern Technology Stack
        </h2>
        <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">
          Built with the tools trusted by top startups and enterprises.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition">
            <p className="font-semibold text-gray-900">Next.js</p>
            <p className="text-sm text-gray-500">React Framework</p>
          </div>
          <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition">
            <p className="font-semibold text-gray-900">Tailwind CSS</p>
            <p className="text-sm text-gray-500">Utility-first Styling</p>
          </div>
          <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition">
            <p className="font-semibold text-gray-900">Supabase</p>
            <p className="text-sm text-gray-500">Database & Auth</p>
          </div>
          <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition">
            <p className="font-semibold text-gray-900">Stripe</p>
            <p className="text-sm text-gray-500">Payments</p>
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="pb-20 py-12" />
    </div>
  );
}
