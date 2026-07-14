import { useLocation, Link } from 'react-router-dom';
import { Coffee, Menu } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="bg-gradient-to-r from-coffee-50 to-cream-100 border-b border-coffee-200 sticky top-0 z-40 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-coffee-600 to-coffee-700 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-coffee-900">冲煮笔记</h1>
              <p className="text-xs text-coffee-600 -mt-0.5">BrewLog</p>
            </div>
          </Link>

          {!isHome && (
            <Link
              to="/"
              className="px-4 py-2 text-coffee-700 hover:text-coffee-900 hover:bg-coffee-100 rounded-lg transition-colors"
            >
              返回首页
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}