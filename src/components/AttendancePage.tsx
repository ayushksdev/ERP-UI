import React, { useState } from 'react';
import {
  CalendarCheck,
  Users,
  UserCheck,
  UserX,
  Search,
  Building,
  Calendar,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AttendanceRecord } from '../types';
import { initialAttendance } from '../data/mockData';

export const AttendancePage: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialAttendance);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedDate, setSelectedDate] = useState('23 Nov 2026');
  const [currentPage, setCurrentPage] = useState(1);

  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.studentId.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesDept = selectedDept === 'All Departments' || r.department === selectedDept;
    const matchesStat = selectedStatus === 'All Statuses' || r.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStat;
  });

  const handleToggleStatus = (id: number) => {
    setRecords(
      records.map((r) => {
        if (r.id === id) {
          const nextStatus: AttendanceRecord['status'] =
            r.status === 'Present' ? 'Absent' : r.status === 'Absent' ? 'On Leave' : 'Present';
          return {
            ...r,
            status: nextStatus,
            inTime: nextStatus === 'Present' ? '08:45 AM' : '--:--',
            outTime: nextStatus === 'Present' ? '04:30 PM' : '--:--',
          };
        }
        return r;
      })
    );
  };

  const handleMarkAllPresent = () => {
    setRecords(
      records.map((r) => ({
        ...r,
        status: 'Present',
        inTime: '08:45 AM',
        outTime: '04:30 PM',
      }))
    );
  };

  const handleReset = () => {
    setSearchFilter('');
    setSelectedDept('All Departments');
    setSelectedStatus('All Statuses');
    setCurrentPage(1);
  };

  const departments = ['All Departments', 'CSE', 'IT', 'ECE', 'Mechanical', 'Civil'];
  const statuses = ['All Statuses', 'Present', 'Absent', 'On Leave'];

  return (
    <div className="p-5 space-y-3.5 max-w-[1400px] mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shadow-[0_2px_8px_rgba(217,119,6,0.12)] shrink-0">
            <CalendarCheck size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Attendance Records
            </h1>
            <p className="text-[12px] text-slate-500 font-medium">
              Daily student check-ins, biometric logs, and department attendance analytics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Date Display */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[12px] font-semibold text-slate-700 shadow-sm">
            <Calendar size={13} className="text-slate-400" />
            <span>{selectedDate}</span>
          </div>

          <button
            onClick={handleMarkAllPresent}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4f39f6] hover:bg-[#4338ca] text-white rounded-xl text-[12.5px] font-bold shadow-[0_4px_12px_rgba(79,57,246,0.3)] transition-all active:scale-95"
          >
            <Check size={15} strokeWidth={2.5} />
            <span>Mark All Present</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="relative bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-[0_2px_6px_rgba(217,119,6,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
              <CalendarCheck size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Today's Attendance</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              92.6%
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
              ▲ +1.8%
            </span>
          </div>
        </div>

        <div className="relative bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-[0_2px_6px_rgba(16,185,129,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shrink-0">
              <UserCheck size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Present Count</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              7,802
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Checked-in on campus</div>
          </div>
        </div>

        <div className="relative bg-[#fff5f5] rounded-2xl p-4 border border-[#fed7d7] shadow-[0_2px_6px_rgba(239,68,68,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fee2e2] flex items-center justify-center text-[#dc2626] shrink-0">
              <UserX size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Absent Count</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              531
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Absentees flagged</div>
          </div>
        </div>

        <div className="relative bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-[0_2px_6px_rgba(79,57,246,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shrink-0">
              <Clock size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Approved Leave</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              93
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Medical / OD requests</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search student by name or ID..."
            className="w-full pl-8 pr-3 py-1.5 bg-white text-[12px] text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <button
              onClick={() => {
                setShowDeptDropdown(!showDeptDropdown);
                setShowStatusDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <Building size={13} className="text-slate-400" />
              <span>{selectedDept}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>
            {showDeptDropdown && (
              <div className="absolute left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
                {departments.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDept(d);
                      setShowDeptDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11.5px] ${
                      selectedDept === d
                        ? 'bg-[#f5f3ff] text-[#4f39f6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowDeptDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <Clock size={13} className="text-slate-400" />
              <span>{selectedStatus}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>
            {showStatusDropdown && (
              <div className="absolute left-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedStatus(s);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11.5px] ${
                      selectedStatus === s
                        ? 'bg-[#f5f3ff] text-[#4f39f6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#f5f3ff] border border-[#d8d2fb] text-[#4f39f6] rounded-lg text-[11.5px] font-semibold transition-colors shadow-sm"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] border-b border-slate-200/60 text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-3.5 w-10 text-slate-400">#</th>
                <th className="py-2.5 px-3.5">Student ID</th>
                <th className="py-2.5 px-3.5">Student Name</th>
                <th className="py-2.5 px-3.5">Department</th>
                <th className="py-2.5 px-3.5">Date</th>
                <th className="py-2.5 px-3.5">Check In</th>
                <th className="py-2.5 px-3.5">Check Out</th>
                <th className="py-2.5 px-3.5">Attendance Status</th>
                <th className="py-2.5 px-3.5 text-center">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredRecords.map((r, index) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors group cursor-default">
                  <td className="py-2.5 px-3.5 text-slate-400 font-medium">{index + 1}</td>
                  <td className="py-2.5 px-3.5 font-mono font-medium text-slate-600 text-[11.5px]">
                    {r.studentId}
                  </td>
                  <td className="py-2.5 px-3.5 font-bold text-slate-800">{r.name}</td>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">{r.department}</td>
                  <td className="py-2.5 px-3.5 text-slate-500">{r.date}</td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-medium font-mono text-[11px]">{r.inTime}</td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-medium font-mono text-[11px]">{r.outTime}</td>
                  <td className="py-2.5 px-3.5">
                    {r.status === 'Present' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ecfdf5] text-[#059669]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        Present
                      </span>
                    )}
                    {r.status === 'Absent' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#fff5f5] text-[#dc2626]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                        Absent
                      </span>
                    )}
                    {r.status === 'On Leave' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#fffbeb] text-[#d97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                        On Leave
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    <button
                      onClick={() => handleToggleStatus(r.id)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#ede9fe] hover:text-[#4f39f6] text-slate-600 rounded-lg text-[11px] font-semibold transition-colors"
                    >
                      Change
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-0.5">
        <span className="text-[11.5px] text-slate-500 font-medium">
          Showing 1 to {filteredRecords.length} of 8,426 attendance records
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <button className="w-7 h-7 rounded-lg text-[11.5px] font-bold bg-[#4f39f6] text-white shadow-sm">
            1
          </button>
          <button className="w-7 h-7 rounded-lg text-[11.5px] font-semibold text-slate-600 hover:bg-white hover:border border-slate-200">
            2
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
