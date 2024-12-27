'use client';

interface IAuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        {children}
      </div>
      <div className="fixed bottom-6 text-center text-gray-400 text-xs">
        Copyright © {new Date().getFullYear()} FinancePro. All rights reserved.
      </div>
    </div>
  );
} 