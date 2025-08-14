import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rural King Analytics',
  description: 'AI-powered analytics dashboard for Rural King farm supply stores',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="rk-topbar">
          <div className="rk-brand">
            <img src="https://www.ruralking.com/RKStorefrontAssetStore/images/type-icons/hcl-logo-footer.webp" alt="Rural King" />
            <span>Rural King</span>
          </div>
          <div className="rk-actions">
            <button className="rk-btn rk-btn--subtle">Help</button>
            <button className="rk-btn rk-btn--primary">Contact</button>
          </div>
        </header>
        <div className="min-h-[calc(100vh-56px)]">{children}</div>
        <footer className="mt-8 px-4 py-6 text-center text-sm text-gray-600">
          Part of the Rural King Enterprise Suite
        </footer>
      </body>
    </html>
  );
} 