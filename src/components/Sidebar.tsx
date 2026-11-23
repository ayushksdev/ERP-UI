import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  BookOpen,
  CalendarCheck,
  CreditCard,
  FileSpreadsheet,
  BookMarked,
  Building2,
  Bus,
  BarChart3,
  Settings,
  ChevronRight,
  X,
} from 'lucide-react';
import { ActivePage } from '../types';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  mobileOpen,
  setMobileOpen,
}) => {
  const navItems = [
    { id: 'overview' as ActivePage, label: 'Overview', icon: LayoutDashboard, hasChevron: false },
    { id: 'students' as ActivePage, label: 'Students', icon: Users, hasChevron: true },
    { id: 'faculty' as ActivePage, label: 'Faculty', icon: GraduationCap, hasChevron: true },
    { id: 'admissions' as ActivePage, label: 'Admissions', icon: FileText, hasChevron: true },
    { id: 'academics' as ActivePage, label: 'Academics', icon: BookOpen, hasChevron: true },
    { id: 'attendance' as ActivePage, label: 'Attendance', icon: CalendarCheck, hasChevron: true },
    { id: 'fees' as ActivePage, label: 'Fees & Finance', icon: CreditCard, hasChevron: true },
    { id: 'exams' as ActivePage, label: 'Exams', icon: FileSpreadsheet, hasChevron: true },
    { id: 'library' as ActivePage, label: 'Library', icon: BookMarked, hasChevron: true },
    { id: 'hostel' as ActivePage, label: 'Hostel', icon: Building2, hasChevron: true },
    { id: 'transport' as ActivePage, label: 'Transport', icon: Bus, hasChevron: true },
    { id: 'reports' as ActivePage, label: 'Reports', icon: BarChart3, hasChevron: true },
    { id: 'settings' as ActivePage, label: 'Settings', icon: Settings, hasChevron: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[228px] z-50 flex flex-col justify-between shrink-0 bg-gradient-to-b from-[#141033] via-[#16113b] to-[#251759] text-white select-none transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Logo & Nav items */}
        <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
          {/* Logo Header */}
          <div className="px-5 pt-5 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActivePage('overview')}>
              {/* Graduation Cap Logo Icon */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-8 h-8 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
                >
                  <path
                    d="M16 4L2 11L16 18L30 11L16 4Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 13.5V20.5C7 22.5 11 25.5 16 25.5C21 25.5 25 22.5 25 20.5V13.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29 11.5V21"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold tracking-wider text-white leading-tight">
                  CAMPUSLY
                </span>
                <span className="text-[9.5px] text-[#9391b4] font-medium tracking-tight">
                  College Management System
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="px-3.5 space-y-0.5 mt-1 pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-150 group ${
                    isActive
                      ? 'bg-[#4f39f6] text-white shadow-[0_4px_12px_rgba(79,57,246,0.35)] font-semibold'
                      : 'text-[#9fa3bc] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      size={16}
                      className={`transition-colors shrink-0 ${
                        isActive ? 'text-white' : 'text-[#878ba8] group-hover:text-white'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.hasChevron && (
                    <ChevronRight
                      size={13}
                      className={`transition-transform duration-150 ${
                        isActive
                          ? 'text-white/80'
                          : 'text-[#6c7090] group-hover:text-slate-300 group-hover:translate-x-0.5'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Image Card */}
        <div className="mt-auto w-full shrink-0 select-none pointer-events-none overflow-hidden">
          <img
            src="/assets/sidebar_building.png"
            alt="Campus Building"
            className="w-full h-auto object-cover object-bottom block"
          />
        </div>
      </aside>
    </>
  );
};
