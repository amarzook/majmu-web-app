import Link from 'next/link';

import Logo from '@/src/components/icons/Logo';
import GitHub from '@/src/components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-700 text-white">
      {/* Top grid */}
      <div className="mx-auto max-w-[1920px] px-6 py-12 grid grid-cols-1 gap-8 lg:grid-cols-12 border-b border-zinc-600">
        {/* Logo */}
        <div className="col-span-1 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center font-bold text-white"
          >
            <span className="mr-2 border rounded-full border-zinc-700 p-1">
              <Logo />
            </span>
            ACME
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col space-y-3 md:space-y-4">
            {['Home', 'About', 'Careers', 'Blog'].map((item) => (
              <li key={item}>
                <Link
                  href="/"
                  className="hover:text-zinc-200 transition-colors duration-150"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col space-y-3 md:space-y-4">
            <li className="font-bold">LEGAL</li>
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <li key={item}>
                <Link
                  href="/"
                  className="hover:text-zinc-200 transition-colors duration-150"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Icons */}
        <div className="col-span-1 lg:col-span-6 flex items-start lg:justify-end">
          <div className="flex items-center space-x-6">
            <a
              aria-label="Github Repository"
              href="https://github.com/vercel/nextjs-subscription-payments"
              className="hover:text-zinc-200 transition-colors duration-150"
            >
              <GitHub />
            </a>
            {/* Add more social icons here */}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-12 px-6 space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} ACME, Inc. All rights reserved.
        </div>
        <div className="flex items-center space-x-2 justify-center md:justify-end">
          <span>Crafted by</span>
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <img
              src="/vercel.svg"
              alt="Vercel Logo"
              className="h-6"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
