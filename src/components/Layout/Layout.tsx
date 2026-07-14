import { type ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-coffee-50">
      <Header />
      <main className="pb-20 pt-2">{children}</main>
      <Navigation />
    </div>
  );
}