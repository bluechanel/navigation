"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 dark:text-gray-300">
            © 2025 Wiley‘s 导航. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="https://about.wileyzhang.com/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">关于我</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}