import React, { useState } from 'react';
import { Search, Sun, Bell, ChevronDown, Menu, User, Shield, LogOut } from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  searchQuery,
  setSearchQuery,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  return (
    <header className="sticky top-0 z-30 bg-[#f8f9fd] px-6 h-14 flex items-center justify-between gap-6 border-b border-slate-200/40">
      {/* Left: Mobile hamburger & Wide Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
        >
          <Menu size={18} />
        </button>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students, courses, faculty..."
            className="w-full pl-9 pr-16 py-1.5 bg-white text-[12.5px] text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-100 border border-slate-200/80 rounded">
              Ctrl + K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right controls: Theme, Bell, Admin Profile */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button (borderless like Figma) */}
        <button
          onClick={() => setIsLightMode(!isLightMode)}
          title="Toggle appearance"
          className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-colors"
        >
          <Sun size={18} className={isLightMode ? 'text-slate-600' : 'text-amber-500'} />
        </button>

        {/* Notifications Bell (borderless like Figma with red dot) */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#f8f9fd]" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 z-50 animate-pop">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-[13px] text-slate-900">Notifications</span>
                <span className="text-[11px] font-medium text-[#4f39f6] bg-[#f5f3ff] px-2 py-0.5 rounded-full">
                  3 New
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                  <p className="text-[12px] font-medium text-slate-800">New admission application received</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Riya Sharma (B.Tech - CSE) • 10m ago</p>
                </div>
                <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                  <p className="text-[12px] font-medium text-slate-800">TechFest 2026 venue confirmed</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Main Auditorium booked • 1h ago</p>
                </div>
                <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                  <p className="text-[12px] font-medium text-slate-800">Attendance report generated</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Today: 92.6% attendance • 3h ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile (borderless like Figma) */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 py-1 px-1 rounded-xl hover:bg-slate-100/60 transition-all group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
              <img
                src="/assets/avatars/admin.png"
                alt="Administrator"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[12.5px] font-bold text-slate-800 group-hover:text-slate-900">
                Administrator
              </span>
              <span className="text-[10.5px] text-slate-400 font-medium">
                System Admin
              </span>
            </div>
            <ChevronDown
              size={13}
              className={`text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-pop">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-[12px] font-semibold text-slate-900">Administrator</p>
                <p className="text-[11px] text-slate-500">admin@aimt.ac.in</p>
              </div>
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-[12px] text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <User size={14} className="text-slate-400" />
                  My Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-[12px] text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <Shield size={14} className="text-slate-400" />
                  Security & Roles
                </button>
              </div>
              <div className="border-t border-slate-100 pt-1">
                <button className="w-full px-4 py-2 text-left text-[12px] text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
