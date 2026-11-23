import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  UserCheck,
  UserX,
  Search,
  Building,
  Briefcase,
  RotateCcw,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  X,
  UserPlus,
} from 'lucide-react';
import { FacultyMember } from '../types';
import { initialFaculty } from '../data/mockData';

export const FacultyPage: React.FC = () => {
  const [faculty, setFaculty] = useState<FacultyMember[]>(initialFaculty);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showDesigDropdown, setShowDesigDropdown] = useState(false);

  // New faculty form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [designation, setDesignation] = useState<FacultyMember['designation']>('Assistant Professor');
  const [experience, setExperience] = useState('5 Years');

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      f.facultyId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      f.email.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesDept = selectedDept === 'All Departments' || f.department === selectedDept;
    const matchesDesig = selectedDesignation === 'All Designations' || f.designation === selectedDesignation;

    return matchesSearch && matchesDept && matchesDesig;
  });

  const handleReset = () => {
    setSearchFilter('');
    setSelectedDept('All Departments');
    setSelectedDesignation('All Designations');
    setCurrentPage(1);
  };

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newMember: FacultyMember = {
      id: Date.now(),
      facultyId: `FAC${2026 + faculty.length}`,
      name: name.trim(),
      email: email.trim(),
      department,
      designation,
      experience,
      status: 'Active',
      avatar: '/assets/avatars/aditya.png',
      courses: [`${department}101 - Core Foundations`],
    };

    setFaculty([newMember, ...faculty]);
    setIsAddModalOpen(false);
    setName('');
    setEmail('');
  };

  const handleDelete = (id: number) => {
    setFaculty(faculty.filter((f) => f.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setFaculty(
      faculty.map((f) =>
        f.id === id ? { ...f, status: f.status === 'Active' ? 'On Leave' : 'Active' } : f
      )
    );
  };

  const departments = ['All Departments', 'CSE', 'IT', 'ECE', 'Mechanical', 'Civil'];
  const designations = ['All Designations', 'HOD', 'Professor', 'Associate Professor', 'Assistant Professor'];

  return (
    <div className="p-5 space-y-3.5 max-w-[1400px] mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shadow-[0_2px_8px_rgba(2,132,199,0.12)] shrink-0">
            <GraduationCap size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Faculty Directory
            </h1>
            <p className="text-[12px] text-slate-500 font-medium">
              Manage academic staff, department allocations, and teaching appointments
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4f39f6] hover:bg-[#4338ca] text-white rounded-xl text-[12.5px] font-bold shadow-[0_4px_12px_rgba(79,57,246,0.3)] transition-all active:scale-95"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add Faculty</span>
        </button>
      </div>

      {/* 3 Metric Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="relative bg-[#f0f8ff] rounded-2xl p-4 border border-[#daf0ff] shadow-[0_2px_6px_rgba(2,132,199,0.03)] overflow-hidden">
          <div className="absolute -right-3 -bottom-3 text-[#0284c7]/10 pointer-events-none">
            <GraduationCap size={85} strokeWidth={1.4} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shrink-0">
              <Users size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Faculty</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              384
            </div>
          </div>
        </div>

        <div className="relative bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-[0_2px_6px_rgba(16,185,129,0.03)] overflow-hidden">
          <div className="absolute -right-3 -bottom-3 text-[#10b981]/10 pointer-events-none">
            <UserCheck size={85} strokeWidth={1.4} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shrink-0">
              <UserCheck size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Active Teaching Staff</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              372
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#d1fae5] text-[#059669] text-[10.5px] font-bold rounded">
              ▲ 96.8%
            </span>
          </div>
        </div>

        <div className="relative bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-[0_2px_6px_rgba(217,119,6,0.03)] overflow-hidden">
          <div className="absolute -right-3 -bottom-3 text-[#d97706]/10 pointer-events-none">
            <UserX size={85} strokeWidth={1.4} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
              <UserX size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">On Leave / Sabbatical</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              12
            </div>
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
            placeholder="Search by name, ID or email..."
            className="w-full pl-8 pr-3 py-1.5 bg-white text-[12px] text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <button
              onClick={() => {
                setShowDeptDropdown(!showDeptDropdown);
                setShowDesigDropdown(false);
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
                setShowDesigDropdown(!showDesigDropdown);
                setShowDeptDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <Briefcase size={13} className="text-slate-400" />
              <span>{selectedDesignation}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>
            {showDesigDropdown && (
              <div className="absolute left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
                {designations.map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setSelectedDesignation(d);
                      setShowDesigDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11.5px] ${
                      selectedDesignation === d
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

      {/* Faculty Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] border-b border-slate-200/60 text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-3.5 w-10 text-slate-400">#</th>
                <th className="py-2.5 px-3.5">Faculty ID</th>
                <th className="py-2.5 px-3.5">Name</th>
                <th className="py-2.5 px-3.5">Email</th>
                <th className="py-2.5 px-3.5">Department</th>
                <th className="py-2.5 px-3.5">Designation</th>
                <th className="py-2.5 px-3.5">Experience</th>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredFaculty.map((f, index) => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors group cursor-default">
                  <td className="py-2.5 px-3.5 text-slate-400 font-medium">{index + 1}</td>
                  <td className="py-2.5 px-3.5 font-mono font-medium text-slate-600 text-[11.5px]">
                    {f.facultyId}
                  </td>
                  <td className="py-2.5 px-3.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0 shadow-sm"
                      />
                      <span className="font-bold text-slate-800">{f.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-500 font-normal">{f.email}</td>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">{f.department}</td>
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium">{f.designation}</td>
                  <td className="py-2.5 px-3.5 text-slate-500">{f.experience}</td>
                  <td className="py-2.5 px-3.5">
                    {f.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ecfdf5] text-[#059669]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#fff7ed] text-[#ea580c]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                        On Leave
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 text-center relative">
                    <div className="inline-block text-left">
                      <button
                        onClick={() =>
                          setActiveActionMenu(activeActionMenu === f.id ? null : f.id)
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                      {activeActionMenu === f.id && (
                        <div className="absolute right-4 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop text-left">
                          <button
                            onClick={() => {
                              handleToggleStatus(f.id);
                              setActiveActionMenu(null);
                            }}
                            className="w-full px-2.5 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                          >
                            <UserCheck size={12} className="text-slate-400" />
                            Toggle Status
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(f.id);
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-0.5">
        <span className="text-[11.5px] text-slate-500 font-medium">
          Showing 1 to {filteredFaculty.length} of 384 faculty members
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

      {/* Add Faculty Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#f8f9fd] to-[#f4f2ff] border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#4f39f6] flex items-center justify-center text-white">
                  <UserPlus size={16} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Add Faculty Member</h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddFaculty} className="p-5 space-y-3.5">
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Ramesh Gupta"
                  className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramesh.gupta@aimt.ac.in"
                  className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Designation</label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value as FacultyMember['designation'])}
                    className="w-full px-2.5 py-1.5 text-[12px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  >
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="HOD">HOD</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 8 Years"
                  className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                />
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
