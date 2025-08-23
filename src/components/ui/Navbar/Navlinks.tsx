'use client';

import Link from 'next/link';
import { SignOut } from '@/src/lib/utils/auth-helpers/server';
import { handleRequest } from '@/src/lib/utils/auth-helpers/client';
import Logo from '@/src/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/src/lib/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  // Always call hooks in the top-level
  const router = useRouter();
  const pathname = usePathname();

  const redirectMethod = getRedirectMethod();

  return (
    <div className="relative flex flex-row justify-between py-4 md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>

        <nav className="ml-6 space-x-2 lg:block">
          {user && (
            <Link href="/dashboard" className={s.link}>
              Dashboard
            </Link>
          )}
          {user && (
            <Link href="/account" className={s.link}>
              Account
            </Link>
          )}
        </nav>
      </div>

      <div className="flex justify-end space-x-4">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, redirectMethod === 'client' ? router : null)}>
            <input type="hidden" name="pathName" value={pathname} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <div className="flex items-center space-x-1">
            <Link href="/signin" className={s.link}>
              Sign In
            </Link>
            <span className="text-gray-500">/</span>
            <Link href="/signin/signup" className={s.link}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
