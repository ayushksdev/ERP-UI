import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CreditCard,
  ChevronDown,
  FileText,
  MoreHorizontal,
  ArrowRight,
  Calendar,
  MapPin,
  BarChart2,
} from 'lucide-react';
import { recentAdmissions } from '../data/mockData';

interface OverviewPageProps {
  onNavigateToStudents: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigateToStudents }) => {
  const [academicYear, setAcademicYear] = useState('2026 – 27');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const chartPeriod = 'This Academic Year';

  const upcomingEventsData = [
    {
      id: 1,
      date: '21',
      month: 'Nov',
      title: 'TechFest 2026',
      location: 'Main Auditorium',
      dotColor: 'border-[#4f39f6] text-[#4f39f6]',
      dateBg: 'bg-[#f4f0ff] text-[#4f39f6]',
      tag: 'Event',
      tagStyle: 'bg-[#f5f1fe] text-[#7c3aed]',
    },
    {
      id: 2,
      date: '24',
      month: 'Nov',
      title: 'Semester Exam (Odd)',
      location: 'All Departments',
      dotColor: 'border-[#2563eb] text-[#2563eb]',
      dateBg: 'bg-[#f0f8ff] text-[#2563eb]',
      tag: 'Exam',
      tagStyle: 'bg-[#eff6ff] text-[#2563eb]',
    },
    {
      id: 3,
      date: '28',
      month: 'Nov',
      title: 'Industry Expert Talk',
      location: 'Seminar Hall – B Block',
      dotColor: 'border-[#059669] text-[#059669]',
      dateBg: 'bg-[#f0faf4] text-[#059669]',
      tag: 'Seminar',
      tagStyle: 'bg-[#f0fdf4] text-[#16a34a]',
    },
    {
      id: 4,
      date: '02',
      month: 'Dec',
      title: 'Placement Drive – TCS',
      location: 'Placement Cell',
      dotColor: 'border-[#d97706] text-[#d97706]',
      dateBg: 'bg-[#fef9ee] text-[#d97706]',
      tag: 'Placement',
      tagStyle: 'bg-[#fff7ed] text-[#ea580c]',
    },
  ];

  return (
    <div className="p-5 space-y-4 max-w-[1400px] mx-auto select-none">
      {/* Top Banner & Header Section: Sits directly on background as in Figma */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Greetings & Title */}
        <div className="shrink-0">
          <div className="flex items-center gap-1.5 text-slate-500 text-[12px] font-medium">
            <span>Welcome back, Administrator</span>
            <span className="text-[13px]">👋</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] tracking-tight mt-0.5">
            Campus Overview
          </h1>

          {/* Academic Year Selector */}
          <div className="relative mt-2.5 inline-block">
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-[12px] font-semibold text-slate-700 transition-colors shadow-sm"
            >
              <Calendar size={13} className="text-slate-400" />
              <span>Academic Year: {academicYear}</span>
              <ChevronDown size={13} className="text-slate-400 ml-0.5" />
            </button>

            {showYearDropdown && (
              <div className="absolute left-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 animate-pop">
                {['2026 – 27', '2025 – 26', '2024 – 25'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => {
                      setAcademicYear(yr);
                      setShowYearDropdown(false);
                    }}
                    className={`w-full px-3.5 py-1.5 text-left text-[12px] ${
                      academicYear === yr
                        ? 'bg-[#f5f3ff] text-[#4f39f6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Academic Year: {yr}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: College Building Banner (AIMT College of Engineering) */}
        <div className="flex-1 h-[120px] rounded-2xl overflow-hidden relative border border-slate-200/70 shadow-sm min-w-[280px]">
          <img
            src="/assets/hero_banner.png"
            alt="AIMT College of Engineering"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Students */}
        <div
          onClick={onNavigateToStudents}
          className="relative bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-[0_2px_6px_rgba(79,57,246,0.03)] cursor-pointer hover:shadow-md transition-all group overflow-hidden"
        >
          <div className="absolute -right-3 -bottom-3 text-[#4f39f6]/10 pointer-events-none">
            <Users size={80} strokeWidth={1.5} />
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shrink-0">
              <Users size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Students</span>
          </div>

          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              8,426
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ▲ +12.4%
              </span>
              <span className="text-[10.5px] text-slate-400">vs. last academic year</span>
            </div>
          </div>
        </div>

        {/* Card 2: Faculty */}
        <div className="relative bg-[#f0f8ff] rounded-2xl p-4 border border-[#daf0ff] shadow-[0_2px_6px_rgba(2,132,199,0.03)] hover:shadow-md transition-all group overflow-hidden">
          <div className="absolute -right-3 -bottom-3 text-[#0284c7]/10 pointer-events-none">
            <GraduationCap size={80} strokeWidth={1.5} />
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shrink-0">
              <GraduationCap size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Faculty</span>
          </div>

          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              384
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ▲ +5.2%
              </span>
              <span className="text-[10.5px] text-slate-400">vs. last academic year</span>
            </div>
          </div>
        </div>

        {/* Card 3: Attendance (Today) */}
        <div className="relative bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-[0_2px_6px_rgba(217,119,6,0.03)] hover:shadow-md transition-all group overflow-hidden">
          <div className="absolute -right-3 -bottom-3 text-[#d97706]/10 pointer-events-none">
            <CalendarCheck size={80} strokeWidth={1.5} />
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
              <CalendarCheck size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Attendance (Today)</span>
          </div>

          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              92.6%
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ▲ +1.8%
              </span>
              <span className="text-[10.5px] text-slate-400">vs. yesterday</span>
            </div>
          </div>
        </div>

        {/* Card 4: Fees Collected */}
        <div className="relative bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-[0_2px_6px_rgba(16,185,129,0.03)] hover:shadow-md transition-all group overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shrink-0">
                <CreditCard size={17} />
              </div>
              <span className="text-[12px] font-medium text-slate-600">Fees Collected</span>
            </div>

            {/* Circular Gauge 78% */}
            <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
              <svg className="w-11 h-11 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#10b981]"
                  strokeDasharray="78, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10.5px] font-bold text-[#0f172a]">78%</span>
            </div>
          </div>

          <div className="mt-1.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              ₹ 2.84 Cr
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1.5">
              of ₹ 3.64 Cr (Total)
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Charts & Upcoming Events (5 cols + 3 cols + 4 cols = 12 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Student Enrollment Line/Area Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-[#4f39f6]">
                  <Users size={16} />
                </div>
                <h3 className="text-[13.5px] font-bold text-[#0f172a]">Student Enrollment</h3>
              </div>

              {/* Period Dropdown */}
              <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-slate-200/80 rounded-lg text-[11px] font-medium text-slate-600 cursor-pointer">
                <span>{chartPeriod}</span>
                <ChevronDown size={11} className="text-slate-400" />
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-[20px] font-extrabold text-[#0f172a]">8,426</span>
              <span className="px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10px] font-bold rounded">
                ▲ +12.4%
              </span>
            </div>
            <div className="text-[10.5px] text-slate-400">Total Enrolled Students</div>
          </div>

          {/* SVG Area Chart */}
          <div className="mt-2.5 relative h-[140px] w-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 450 140"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="enrollmentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f39f6" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#4f39f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[20, 50, 80, 110, 135].map((yVal, i) => (
                <line
                  key={i}
                  x1="35"
                  y1={yVal}
                  x2="445"
                  y2={yVal}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              ))}

              {/* Y Axis Labels */}
              <text x="5" y="24" className="text-[8.5px] fill-slate-400 font-medium">9,000</text>
              <text x="5" y="54" className="text-[8.5px] fill-slate-400 font-medium">8,500</text>
              <text x="5" y="84" className="text-[8.5px] fill-slate-400 font-medium">8,000</text>
              <text x="5" y="114" className="text-[8.5px] fill-slate-400 font-medium">7,500</text>
              <text x="5" y="137" className="text-[8.5px] fill-slate-400 font-medium">6,000</text>

              {/* Area fill */}
              <path
                d="M 40 134 L 75 128 L 110 121 L 145 112 L 180 104 L 215 94 L 250 84 L 285 74 L 320 66 L 355 54 L 390 44 L 425 32 L 425 135 L 40 135 Z"
                fill="url(#enrollmentGrad)"
              />

              {/* Smooth trend curve */}
              <path
                d="M 40 134 Q 110 121 180 104 T 320 66 T 425 32"
                fill="none"
                stroke="#4f39f6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              {[
                [40, 134],
                [75, 128],
                [110, 121],
                [145, 112],
                [180, 104],
                [215, 94],
                [250, 84],
                [285, 74],
                [320, 66],
                [355, 54],
                [390, 44],
                [425, 32],
              ].map(([cx, cy], idx) => (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r="3"
                  className="fill-white stroke-[#4f39f6] stroke-[2]"
                />
              ))}

              <circle cx="425" cy="32" r="4.5" className="fill-[#4f39f6] stroke-white stroke-[2]" />
            </svg>

            {/* Custom Tooltip over last month */}
            <div className="absolute -top-1 right-2 bg-white rounded-lg shadow border border-slate-200/90 px-2 py-0.5 text-center pointer-events-none">
              <span className="text-[8px] text-slate-400 block font-medium leading-none">Mar</span>
              <span className="text-[10px] font-bold text-[#4f39f6] leading-tight">8,426</span>
            </div>

            {/* X Axis Months */}
            <div className="flex justify-between pl-8 pr-1 text-[9px] text-slate-400 font-medium mt-1">
              {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map(
                (m) => (
                  <span key={m}>{m}</span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Attendance Overview Donut Chart (3 cols: Donut on Left, Legend on Right) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="text-[#4f39f6]">
              <BarChart2 size={16} />
            </div>
            <h3 className="text-[13.5px] font-bold text-[#0f172a]">Attendance Overview</h3>
          </div>

          {/* Donut Chart & Legend Side-by-Side as in Figma */}
          <div className="flex items-center justify-between gap-3 my-auto py-2">
            {/* Donut Chart on Left */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#e0e7ff"
                  strokeWidth="11"
                  strokeDasharray="251.2"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#93c5fd"
                  strokeWidth="11"
                  strokeDasharray="251.2"
                  strokeDashoffset="3.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#4f39f6"
                  strokeWidth="11"
                  strokeDasharray="232.6 251.2"
                  strokeDashoffset="0"
                />
              </svg>

              <div className="absolute flex flex-col items-center text-center">
                <span className="text-[18px] font-extrabold text-[#0f172a] leading-none">92.6%</span>
                <span className="text-[9px] text-slate-400 font-medium mt-0.5">Present</span>
              </div>
            </div>

            {/* Vertical Stacked Legend on Right */}
            <div className="flex flex-col gap-2.5 text-[11px] shrink-0 pr-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4f39f6] shrink-0" />
                <span className="text-slate-600 font-medium">Present</span>
                <span className="text-slate-700 font-bold ml-auto pl-1">92.6%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#93c5fd] shrink-0" />
                <span className="text-slate-600 font-medium">Absent</span>
                <span className="text-slate-700 font-bold ml-auto pl-1">6.3%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e0e7ff] shrink-0" />
                <span className="text-slate-600 font-medium">On Leave</span>
                <span className="text-slate-700 font-bold ml-auto pl-1">1.1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="text-[#4f39f6]">
                <Calendar size={16} />
              </div>
              <h3 className="text-[13.5px] font-bold text-[#0f172a]">Upcoming Events</h3>
            </div>
            <button className="text-[11px] font-semibold text-[#4f39f6] hover:text-[#4338ca] flex items-center gap-0.5">
              <span>View All</span>
              <ArrowRight size={11} />
            </button>
          </div>

          {/* Timeline Event list with colored nodes on left line */}
          <div className="relative space-y-2 mt-2">
            <div className="absolute top-2 bottom-3 left-[4px] w-[1px] border-l border-dashed border-slate-200 -z-0" />

            {upcomingEventsData.map((evt) => (
              <div key={evt.id} className="relative flex items-center justify-between gap-2 z-10">
                <div className="flex items-center gap-2.5">
                  {/* Timeline circular node */}
                  <div className={`w-2.5 h-2.5 rounded-full bg-white border-2 shrink-0 ${evt.dotColor}`} />

                  {/* Date badge */}
                  <div className={`w-8 h-8 rounded-lg flex flex-col items-center justify-center shrink-0 ${evt.dateBg}`}>
                    <span className="text-[10.5px] font-extrabold leading-none">{evt.date}</span>
                    <span className="text-[7.5px] font-bold uppercase leading-none mt-0.5">
                      {evt.month}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[11.5px] font-bold text-slate-800 leading-tight">
                      {evt.title}
                    </span>
                    <span className="text-[9.5px] text-slate-400 flex items-center gap-0.5 mt-0.5">
                      <MapPin size={10} className="shrink-0 text-slate-400" />
                      <span>{evt.location}</span>
                    </span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${evt.tagStyle}`}>
                  {evt.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Admissions & Promo Card (8 cols + 4 cols = 12 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Recent Admissions Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-3.5 border border-slate-200/70 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[199px]">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="text-[#4f39f6]">
                  <FileText size={15} />
                </div>
                <h3 className="text-[13px] font-bold text-[#0f172a]">Recent Admissions</h3>
              </div>
              <button
                onClick={onNavigateToStudents}
                className="text-[11px] font-semibold text-[#4f39f6] hover:text-[#4338ca] flex items-center gap-0.5"
              >
                <span>View All Admissions</span>
                <ArrowRight size={11} />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f5f3ff] text-[10.5px] font-bold text-slate-500 border-b border-slate-100">
                    <th className="py-1 px-2">#</th>
                    <th className="py-1 px-2">Student Name</th>
                    <th className="py-1 px-2">Program</th>
                    <th className="py-1 px-2">Application ID</th>
                    <th className="py-1 px-2">Applied On</th>
                    <th className="py-1 px-2">Status</th>
                    <th className="py-1 px-2 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80 text-[11px]">
                  {recentAdmissions.map((adm, index) => (
                    <tr key={adm.id} className="hover:bg-slate-50/70 transition-colors group">
                      <td className="py-1 px-2 text-slate-400 font-medium">{index + 1}</td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={adm.avatar}
                            alt={adm.name}
                            className="w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <span className="font-bold text-slate-800">{adm.name}</span>
                        </div>
                      </td>
                      <td className="py-1 px-2 text-slate-600 font-medium">{adm.program}</td>
                      <td className="py-1 px-2 text-slate-500 font-mono text-[10px]">{adm.applicationId}</td>
                      <td className="py-1 px-2 text-slate-500 text-[10.5px]">{adm.appliedOn}</td>
                      <td className="py-1 px-2">
                        {adm.status === 'Admitted' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#ecfdf5] text-[#059669]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            Admitted
                          </span>
                        )}
                        {adm.status === 'Documents Pending' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#fffbeb] text-[#d97706]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                            Documents Pending
                          </span>
                        )}
                        {adm.status === 'Under Review' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-[#eff6ff] text-[#2563eb]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                            Under Review
                          </span>
                        )}
                      </td>
                      <td className="py-1 px-2 text-right">
                        <button className="p-0.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                          <MoreHorizontal size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Promo / Management Card (4 cols) */}
        <div
          onClick={onNavigateToStudents}
          className="lg:col-span-4 rounded-2xl overflow-hidden relative shadow-md border border-slate-200/80 group select-none cursor-pointer hover:shadow-lg transition-all h-[199px] flex items-center justify-center bg-[#100d2b]"
        >
          <img
            src="/assets/promo_card.png"
            alt="One Campus, Complete Management - Explore Modules"
            className="w-full h-full object-fill group-hover:scale-[1.01] transition-transform duration-300 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};
