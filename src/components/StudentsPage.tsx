import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  UserCheck,
  UserX,
  Search,
  Building,
  Calendar,
  RotateCcw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
} from 'lucide-react';
import { Student } from '../types';
import { AddStudentModal } from './AddStudentModal';

interface StudentsPageProps {
  students: Student[];
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  onDeleteStudent: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export const StudentsPage: React.FC<StudentsPageProps> = ({
  students,
  onAddStudent,
  onDeleteStudent,
  onToggleStatus,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);

  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.email.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesDept = selectedDept === 'All Departments' || s.department === selectedDept;
    const matchesYear = selectedYear === 'All Years' || s.year === selectedYear;

    return matchesSearch && matchesDept && matchesYear;
  });

  const handleReset = () => {
    setSearchFilter('');
    setSelectedDept('All Departments');
    setSelectedYear('All Years');
    setCurrentPage(1);
  };

  const departments = ['All Departments', 'CSE', 'IT', 'ECE', 'Mechanical', 'Civil'];
  const years = ['All Years', 'Year 1', 'Year 2', 'Year 3', 'Year 4'];

  return (
    <div className="p-5 space-y-3.5 max-w-[1400px] mx-auto select-none">
      {/* Page Title & Add Student Button Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Graduation Cap Badge */}
          <div className="w-10 h-10 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shadow-[0_2px_8px_rgba(79,57,246,0.1)] shrink-0">
            <GraduationCap size={22} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Students
            </h1>
            <p className="text-[12px] text-slate-500 font-medium">
              Manage student records and profiles
            </p>
          </div>
        </div>

        {/* Solid Purple Add Student Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4f39f6] hover:bg-[#4338ca] text-white rounded-xl text-[12.5px] font-bold shadow-[0_4px_12px_rgba(79,57,246,0.3)] transition-all active:scale-95"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add Student</span>
        </button>
      </div>

      {/* 3 Metric Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Card 1: Total Students */}
        <div className="relative bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-[0_2px_6px_rgba(79,57,246,0.03)] overflow-hidden">
          <div className="absolute -right-3 -bottom-3 text-[#4f39f6]/10 pointer-events-none">
            <GraduationCap size={85} strokeWidth={1.4} />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shrink-0">
              <Users size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Students</span>
          </div>

          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              8,426
            </div>
          </div>
        </div>

        {/* Card 2: Active Students */}
        <div className="relative bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-[0_2px_6px_rgba(16,185,129,0.03)] overflow-hidden">
          <div className="absolute -right-3 -bottom-3 text-[#10b981]/10 pointer-events-none">
            <Users size={85} strokeWidth={1.4} />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shrink-0">
              <UserCheck size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Active Students</span>
          </div>

          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              8,102
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#d1fae5] text-[#059669] text-[10.5px] font-bold rounded">
              ▲ 96.2%
            </span>
          </div>
        </div>

        {/* Card 3: Inactive Students */}
        <div className="relative bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-[0_2px_6px_rgba(217,119,6,0.03)] overflow-hidden">
          <div className="absolute -right-3 -bottom-3 text-[#d97706]/10 pointer-events-none">
            <Users size={85} strokeWidth={1.4} />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
              <UserX size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Inactive Students</span>
          </div>

          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              324
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={14} />
          </div>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search by name, ID or email..."
            className="w-full pl-8 pr-3 py-1.5 bg-white text-[12px] text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all"
          />
        </div>

        {/* Right: Dropdowns & Reset */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Departments dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDeptDropdown(!showDeptDropdown);
                setShowYearDropdown(false);
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

          {/* Years dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowYearDropdown(!showYearDropdown);
                setShowDeptDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <Calendar size={13} className="text-slate-400" />
              <span>{selectedYear}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>

            {showYearDropdown && (
              <div className="absolute left-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      setSelectedYear(y);
                      setShowYearDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11.5px] ${
                      selectedYear === y
                        ? 'bg-[#f5f3ff] text-[#4f39f6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#f5f3ff] border border-[#d8d2fb] text-[#4f39f6] rounded-lg text-[11.5px] font-semibold transition-colors shadow-sm"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Students Data Table Container */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] border-b border-slate-200/60 text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-3.5 w-10 text-slate-400">#</th>
                <th className="py-2.5 px-3.5">Student ID</th>
                <th className="py-2.5 px-3.5">Name</th>
                <th className="py-2.5 px-3.5">Email</th>
                <th className="py-2.5 px-3.5">Department</th>
                <th className="py-2.5 px-3.5">Year</th>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-slate-400 text-[12px]">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st, index) => (
                  <tr
                    key={st.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-default"
                  >
                    {/* Index */}
                    <td className="py-2 px-3.5 text-slate-400 font-medium">{index + 1}</td>

                    {/* Student ID */}
                    <td className="py-2 px-3.5 font-mono font-medium text-slate-600 text-[11.5px]">
                      {st.studentId}
                    </td>

                    {/* Name + Avatar */}
                    <td className="py-2 px-3.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="font-bold text-slate-800">{st.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-2 px-3.5 text-slate-500 font-normal">{st.email}</td>

                    {/* Department */}
                    <td className="py-2 px-3.5 font-semibold text-slate-600">{st.department}</td>

                    {/* Year */}
                    <td className="py-2 px-3.5 text-slate-600 font-medium">{st.year}</td>

                    {/* Status Pill */}
                    <td className="py-2 px-3.5">
                      {st.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ecfdf5] text-[#059669]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#fff7ed] text-[#ea580c]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-2 px-3.5 text-center relative">
                      <div className="inline-block text-left">
                        <button
                          onClick={() =>
                            setActiveActionMenu(activeActionMenu === st.id ? null : st.id)
                          }
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          <MoreHorizontal size={14} />
                        </button>

                        {/* Action menu popover */}
                        {activeActionMenu === st.id && (
                          <div className="absolute right-4 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop text-left">
                            <button
                              onClick={() => {
                                onToggleStatus(st.id);
                                setActiveActionMenu(null);
                              }}
                              className="w-full px-2.5 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                            >
                              <UserCheck size={12} className="text-slate-400" />
                              Toggle Status
                            </button>
                            <button
                              onClick={() => {
                                onDeleteStudent(st.id);
                                setActiveActionMenu(null);
                              }}
                              className="w-full px-2.5 py-1.5 text-[11px] text-rose-600 hover:bg-rose-50 flex items-center gap-1.5"
                            >
                              <Trash2 size={12} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-0.5">
        <span className="text-[11.5px] text-slate-500 font-medium">
          Showing 1 to {filteredStudents.length} of 8,426 students
        </span>

        {/* Pagination buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            onClick={() => setCurrentPage(1)}
            className={`w-7 h-7 rounded-lg text-[11.5px] font-bold transition-all shadow-sm ${
              currentPage === 1
                ? 'bg-[#4f39f6] text-white shadow-[#4f39f6]/30'
                : 'text-slate-600 hover:bg-white hover:border border-slate-200'
            }`}
          >
            1
          </button>

          {[2, 3, 4, 5].map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-7 h-7 rounded-lg text-[11.5px] font-semibold transition-all ${
                currentPage === p
                  ? 'bg-[#4f39f6] text-white shadow-[#4f39f6]/30 font-bold'
                  : 'text-slate-600 hover:bg-white hover:border border-slate-200'
              }`}
            >
              {p}
            </button>
          ))}

          <span className="text-slate-400 px-1 text-[11px]">...</span>

          <button
            onClick={() => setCurrentPage(1405)}
            className="w-9 h-7 rounded-lg text-[11px] font-semibold text-slate-600 hover:bg-white hover:border border-slate-200 transition-all"
          >
            1405
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStudent={onAddStudent}
        nextStudentIndex={students.length + 1}
      />
    </div>
  );
};
