import React, { useState } from 'react';
import {
  FileText,
  UserCheck,
  Clock,
  AlertCircle,
  Search,
  BookOpen,
  Filter,
  RotateCcw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  X,
  CheckCircle,
} from 'lucide-react';
import { Admission } from '../types';
import { recentAdmissions } from '../data/mockData';

export const AdmissionsPage: React.FC = () => {
  const [admissions, setAdmissions] = useState<Admission[]>(recentAdmissions);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // New application form
  const [name, setName] = useState('');
  const [program, setProgram] = useState('B.Tech – CSE');
  const [score, setScore] = useState('92.5');
  const [phone, setPhone] = useState('+91 98765 00000');
  const [category, setCategory] = useState('General');

  const filteredAdmissions = admissions.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.applicationId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.program.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesProg = selectedProgram === 'All Programs' || a.program.includes(selectedProgram);
    const matchesStat = selectedStatus === 'All Statuses' || a.status === selectedStatus;

    return matchesSearch && matchesProg && matchesStat;
  });

  const handleReset = () => {
    setSearchFilter('');
    setSelectedProgram('All Programs');
    setSelectedStatus('All Statuses');
    setCurrentPage(1);
  };

  const handleAddAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newAdm: Admission = {
      id: Date.now(),
      name: name.trim(),
      program,
      applicationId: `AIMT26${Math.floor(1000 + Math.random() * 9000)}`,
      appliedOn: '23 Nov 2026',
      status: 'Under Review',
      avatar: '/assets/avatars/priya_ov.png',
      score: parseFloat(score) || 90.0,
      phone,
      category,
    };

    setAdmissions([newAdm, ...admissions]);
    setIsAddModalOpen(false);
    setName('');
  };

  const programs = ['All Programs', 'CSE', 'AI & ML', 'ECE', 'IT', 'Mechanical', 'BCA'];
  const statuses = ['All Statuses', 'Admitted', 'Documents Pending', 'Under Review'];

  return (
    <div className="p-5 space-y-3.5 max-w-[1400px] mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shadow-[0_2px_8px_rgba(79,57,246,0.12)] shrink-0">
            <FileText size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Admissions Center
            </h1>
            <p className="text-[12px] text-slate-500 font-medium">
              Track candidate enrollments, merit verification, and document submissions
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4f39f6] hover:bg-[#4338ca] text-white rounded-xl text-[12.5px] font-bold shadow-[0_4px_12px_rgba(79,57,246,0.3)] transition-all active:scale-95"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>New Application</span>
        </button>
      </div>

      {/* 4 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="relative bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-[0_2px_6px_rgba(79,57,246,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shrink-0">
              <FileText size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Applications</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              1,420
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">2026 – 27 Academic Intake</div>
          </div>
        </div>

        <div className="relative bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-[0_2px_6px_rgba(16,185,129,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shrink-0">
              <UserCheck size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Admitted Candidates</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              840
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#d1fae5] text-[#059669] text-[10.5px] font-bold rounded">
              59.1%
            </span>
          </div>
        </div>

        <div className="relative bg-[#eff6ff] rounded-2xl p-4 border border-[#bfdbfe] shadow-[0_2px_6px_rgba(37,99,235,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#dbeafe] flex items-center justify-center text-[#2563eb] shrink-0">
              <Clock size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Under Review</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              460
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Merit evaluation in progress</div>
          </div>
        </div>

        <div className="relative bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-[0_2px_6px_rgba(217,119,6,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
              <AlertCircle size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Documents Pending</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              120
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Awaiting certificate upload</div>
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
            placeholder="Search by student name or application ID..."
            className="w-full pl-8 pr-3 py-1.5 bg-white text-[12px] text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <button
              onClick={() => {
                setShowProgramDropdown(!showProgramDropdown);
                setShowStatusDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <BookOpen size={13} className="text-slate-400" />
              <span>{selectedProgram}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>
            {showProgramDropdown && (
              <div className="absolute left-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
                {programs.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedProgram(p);
                      setShowProgramDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11.5px] ${
                      selectedProgram === p
                        ? 'bg-[#f5f3ff] text-[#4f39f6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowProgramDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <Filter size={13} className="text-slate-400" />
              <span>{selectedStatus}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>
            {showStatusDropdown && (
              <div className="absolute left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
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

      {/* Admissions Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] border-b border-slate-200/60 text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-3.5 w-10 text-slate-400">#</th>
                <th className="py-2.5 px-3.5">Application ID</th>
                <th className="py-2.5 px-3.5">Student Name</th>
                <th className="py-2.5 px-3.5">Program</th>
                <th className="py-2.5 px-3.5">Merit Score</th>
                <th className="py-2.5 px-3.5">Applied On</th>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredAdmissions.map((adm, index) => (
                <tr key={adm.id} className="hover:bg-slate-50/80 transition-colors group cursor-default">
                  <td className="py-2.5 px-3.5 text-slate-400 font-medium">{index + 1}</td>
                  <td className="py-2.5 px-3.5 font-mono font-medium text-slate-600 text-[11.5px]">
                    {adm.applicationId}
                  </td>
                  <td className="py-2.5 px-3.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={adm.avatar}
                        alt={adm.name}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0 shadow-sm"
                      />
                      <span className="font-bold text-slate-800">{adm.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-medium">{adm.program}</td>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-800">
                    {adm.score ? `${adm.score}%` : '91.2%'}
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-500">{adm.appliedOn}</td>
                  <td className="py-2.5 px-3.5">
                    {adm.status === 'Admitted' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ecfdf5] text-[#059669]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        Admitted
                      </span>
                    )}
                    {adm.status === 'Documents Pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#fffbeb] text-[#d97706]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                        Documents Pending
                      </span>
                    )}
                    {adm.status === 'Under Review' && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#eff6ff] text-[#2563eb]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                        Under Review
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 text-center relative">
                    <div className="inline-block text-left">
                      <button
                        onClick={() =>
                          setActiveActionMenu(activeActionMenu === adm.id ? null : adm.id)
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                      {activeActionMenu === adm.id && (
                        <div className="absolute right-4 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop text-left">
                          <button
                            onClick={() => {
                              setAdmissions(
                                admissions.map((a) =>
                                  a.id === adm.id ? { ...a, status: 'Admitted' } : a
                                )
                              );
                              setActiveActionMenu(null);
                            }}
                            className="w-full px-2.5 py-1.5 text-[11px] text-emerald-700 hover:bg-emerald-50 flex items-center gap-1.5 font-medium"
                          >
                            <CheckCircle size={12} className="text-emerald-500" />
                            Approve & Admit
                          </button>
                          <button
                            onClick={() => {
                              setAdmissions(admissions.filter((a) => a.id !== adm.id));
                              setActiveActionMenu(null);
                            }}
                            className="w-full px-2.5 py-1.5 text-[11px] text-rose-600 hover:bg-rose-50 flex items-center gap-1.5"
                          >
                            <Trash2 size={12} />
                            Reject Application
                          </button>
                        </div>
                      )}
                    </div>
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
          Showing 1 to {filteredAdmissions.length} of 1,420 applications
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

      {/* New Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#f8f9fd] to-[#f4f2ff] border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#4f39f6] flex items-center justify-center text-white">
                  <FileText size={16} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">New Admission Application</h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddAdmission} className="p-5 space-y-3.5">
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Applicant Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Siddharth Rao"
                  className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Program</label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[12px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  >
                    <option value="B.Tech – CSE">B.Tech – CSE</option>
                    <option value="B.Tech – AI & ML">B.Tech – AI & ML</option>
                    <option value="B.Tech – ECE">B.Tech – ECE</option>
                    <option value="B.Tech – IT">B.Tech – IT</option>
                    <option value="BCA">BCA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Merit Score (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[12px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
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
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
