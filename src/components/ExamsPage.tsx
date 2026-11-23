import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Search,
  Building,
  RotateCcw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { ExamRecord } from '../types';
import { initialExams } from '../data/mockData';

export const ExamsPage: React.FC = () => {
  const [exams, setExams] = useState<ExamRecord[]>(initialExams);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // New exam form
  const [examCode, setExamCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [semester, setSemester] = useState('Semester 5');
  const [date, setDate] = useState('25 Nov 2026');
  const [time, setTime] = useState('10:00 AM - 01:00 PM');
  const [hall, setHall] = useState('Hall A-101');
  const [totalStudents, setTotalStudents] = useState('120');

  const filteredExams = exams.filter((e) => {
    const matchesSearch =
      e.examCode.toLowerCase().includes(searchFilter.toLowerCase()) ||
      e.courseName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      e.hall.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesDept = selectedDept === 'All Departments' || e.department === selectedDept;
    const matchesStat = selectedStatus === 'All Statuses' || e.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStat;
  });

  const handleReset = () => {
    setSearchFilter('');
    setSelectedDept('All Departments');
    setSelectedStatus('All Statuses');
    setCurrentPage(1);
  };

  const handleScheduleExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examCode.trim() || !courseName.trim()) return;

    const newExam: ExamRecord = {
      id: Date.now(),
      examCode: examCode.trim().toUpperCase(),
      courseName: courseName.trim(),
      department,
      semester,
      date,
      time,
      hall,
      totalStudents: parseInt(totalStudents) || 100,
      status: 'Scheduled',
    };

    setExams([newExam, ...exams]);
    setIsAddModalOpen(false);
    setExamCode('');
    setCourseName('');
  };

  const departments = ['All Departments', 'CSE', 'IT', 'ECE', 'Mechanical', 'Civil'];
  const statuses = ['All Statuses', 'Scheduled', 'In Progress', 'Completed'];

  return (
    <div className="p-5 space-y-3.5 max-w-[1400px] mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#eff6ff] flex items-center justify-center text-[#2563eb] shadow-[0_2px_8px_rgba(37,99,235,0.12)] shrink-0">
            <FileSpreadsheet size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Examinations & Schedule
            </h1>
            <p className="text-[12px] text-slate-500 font-medium">
              Mid-term timetables, end-semester evaluations, and seating hall rosters
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4f39f6] hover:bg-[#4338ca] text-white rounded-xl text-[12.5px] font-bold shadow-[0_4px_12px_rgba(79,57,246,0.3)] transition-all active:scale-95"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Schedule Exam</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="relative bg-[#eff6ff] rounded-2xl p-4 border border-[#bfdbfe] shadow-[0_2px_6px_rgba(37,99,235,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#dbeafe] flex items-center justify-center text-[#2563eb] shrink-0">
              <FileSpreadsheet size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Exams</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              28
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Odd Semester 2026</div>
          </div>
        </div>

        <div className="relative bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-[0_2px_6px_rgba(16,185,129,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Scheduled Sessions</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              24
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Halls confirmed</div>
          </div>
        </div>

        <div className="relative bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-[0_2px_6px_rgba(217,119,6,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
              <Clock size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Ongoing Exams</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              4
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
              Active Now
            </span>
          </div>
        </div>

        <div className="relative bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-[0_2px_6px_rgba(79,57,246,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shrink-0">
              <MapPin size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Hall Capacity</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              1,800
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Seats across 12 Examination Halls</div>
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
            placeholder="Search by exam code, course or hall..."
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

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#f5f3ff] border border-[#d8d2fb] text-[#4f39f6] rounded-lg text-[11.5px] font-semibold transition-colors shadow-sm"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Exams Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] border-b border-slate-200/60 text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-3.5 w-10 text-slate-400">#</th>
                <th className="py-2.5 px-3.5">Exam Code</th>
                <th className="py-2.5 px-3.5">Course Name</th>
                <th className="py-2.5 px-3.5">Department</th>
                <th className="py-2.5 px-3.5">Semester</th>
                <th className="py-2.5 px-3.5">Exam Date & Time</th>
                <th className="py-2.5 px-3.5">Exam Hall</th>
                <th className="py-2.5 px-3.5">Students</th>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredExams.map((ex, index) => (
                <tr key={ex.id} className="hover:bg-slate-50/80 transition-colors group cursor-default">
                  <td className="py-2.5 px-3.5 text-slate-400 font-medium">{index + 1}</td>
                  <td className="py-2.5 px-3.5 font-mono font-bold text-[#4f39f6] text-[11.5px]">
                    {ex.examCode}
                  </td>
                  <td className="py-2.5 px-3.5 font-bold text-slate-800">{ex.courseName}</td>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">{ex.department}</td>
                  <td className="py-2.5 px-3.5 text-slate-500">{ex.semester}</td>
                  <td className="py-2.5 px-3.5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">{ex.date}</span>
                      <span className="text-[10.5px] text-slate-400">{ex.time}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5 font-medium text-slate-700">📍 {ex.hall}</td>
                  <td className="py-2.5 px-3.5 font-medium text-slate-600">{ex.totalStudents} Seats</td>
                  <td className="py-2.5 px-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#eff6ff] text-[#2563eb]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                      {ex.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-center relative">
                    <button
                      onClick={() => setExams(exams.filter((x) => x.id !== ex.id))}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                      title="Cancel Exam"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Exam Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#f8f9fd] to-[#f4f2ff] border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#4f39f6] flex items-center justify-center text-white">
                  <FileSpreadsheet size={16} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Schedule Examination</h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleScheduleExam} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Exam Code</label>
                  <input
                    type="text"
                    value={examCode}
                    onChange={(e) => setExamCode(e.target.value)}
                    placeholder="e.g. EXM-CS502"
                    className="w-full px-3 py-1.5 text-[12.5px] font-mono rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[12px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. Compiler Design & Automata"
                  className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Hall</label>
                  <input
                    type="text"
                    value={hall}
                    onChange={(e) => setHall(e.target.value)}
                    placeholder="Hall A-101"
                    className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  />
                </div>
              </div>
              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-1.5 text-[12px] text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-[12px] font-bold text-white bg-[#4f39f6] hover:bg-[#4338ca] rounded-lg shadow"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
