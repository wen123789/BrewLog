import { NavLink } from 'react-router-dom';
import { Home, Package, Wrench, Timer, BarChart3, Users } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/beans', icon: Package, label: '豆袋' },
  { to: '/equipment', icon: Wrench, label: '设备' },
  { to: '/timer', icon: Timer, label: '计时器' },
  { to: '/records', icon: BarChart3, label: '记录' },
  { to: '/community', icon: Users, label: '社区' },
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-coffee-200 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-coffee-700 bg-coffee-50 scale-105'
                      : 'text-coffee-500 hover:text-coffee-600 hover:bg-coffee-100'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}