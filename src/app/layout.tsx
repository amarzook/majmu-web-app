import { Metadata } from 'next';
import Footer from '@/src/components/ui/Footer';
import Navbar from '@/src/components/ui/Navbar';
import { Toaster } from '@/src/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/src/lib/utils/helpers';
import { createClient } from '@/src/lib/utils/supabase/server';
import { getUser } from '@/src/lib/utils/supabase/queries';
import 'src/styles/main.css';

const title = 'Next.js Subscription Starter';
const description = 'Brought to you by Vercel, Stripe, and Supabase.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const user = await getUser(supabase);

  return (
    <html lang="en">
      <body className="bg-white loading">
        <Navbar user={user} />
        <main
          id="skip"
          className="min-h-[calc(100dvh-4rem)] md:min-h-[calc(100dvh-5rem)]"
        >
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          }>
            {children}
          </Suspense>
        </main>
        <Footer />
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}