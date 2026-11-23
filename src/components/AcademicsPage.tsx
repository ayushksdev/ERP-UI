import React, { useState } from 'react';
import {
  BookOpen,
  Layers,
  GraduationCap,
  Calendar,
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
  BookMarked,
} from 'lucide-react';
import { Course } from '../types';
import { initialCourses } from '../data/mockData';

export const AcademicsPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedSem, setSelectedSem] = useState('All Semesters');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showSemDropdown, setShowSemDropdown] = useState(false);

  // New course form
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [credits, setCredits] = useState('4');
  const [semester, setSemester] = useState('Semester 3');
  const [faculty, setFaculty] = useState('Dr. Rajesh Kulkarni');

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.faculty.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesDept = selectedDept === 'All Departments' || c.department === selectedDept;
    const matchesSem = selectedSem === 'All Semesters' || c.semester === selectedSem;

    return matchesSearch && matchesDept && matchesSem;
  });

  const handleReset = () => {
    setSearchFilter('');
    setSelectedDept('All Departments');
    setSelectedSem('All Semesters');
    setCurrentPage(1);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    const newCourse: Course = {
      id: Date.now(),
      code: code.trim().toUpperCase(),
      name: name.trim(),
      department,
      credits: parseInt(credits) || 3,
      semester,
      faculty,
      enrolledStudents: 60,
      status: 'Active',
    };

    setCourses([newCourse, ...courses]);
    setIsAddModalOpen(false);
    setCode('');
    setName('');
  };

  const departments = ['All Departments', 'CSE', 'IT', 'ECE', 'Mechanical', 'Civil'];
  const semesters = ['All Semesters', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7'];

  return (
    <div className="p-5 space-y-3.5 max-w-[1400px] mx-auto select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f5f3ff] flex items-center justify-center text-[#7c3aed] shadow-[0_2px_8px_rgba(124,58,237,0.12)] shrink-0">
            <BookOpen size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight leading-tight">
              Academic Curriculum
            </h1>
            <p className="text-[12px] text-slate-500 font-medium">
              Course syllabus, semester credit matrix, and faculty allocations
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4f39f6] hover:bg-[#4338ca] text-white rounded-xl text-[12.5px] font-bold shadow-[0_4px_12px_rgba(79,57,246,0.3)] transition-all active:scale-95"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add Course</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="relative bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-[0_2px_6px_rgba(79,57,246,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6] shrink-0">
              <BookOpen size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Courses</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              64
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Across 6 Engineering Depts</div>
          </div>
        </div>

        <div className="relative bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-[0_2px_6px_rgba(16,185,129,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669] shrink-0">
              <Layers size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Active Batches</span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              48
            </div>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#d1fae5] text-[#059669] text-[10.5px] font-bold rounded">
              Ongoing
            </span>
          </div>
        </div>

        <div className="relative bg-[#f0f8ff] rounded-2xl p-4 border border-[#daf0ff] shadow-[0_2px_6px_rgba(2,132,199,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shrink-0">
              <GraduationCap size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Total Credits</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              192
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">AICTE Accredited Schema</div>
          </div>
        </div>

        <div className="relative bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-[0_2px_6px_rgba(217,119,6,0.03)] overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
              <Calendar size={16} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Faculty Assigned</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] tracking-tight leading-none">
              52
            </div>
            <div className="text-[10.5px] text-slate-400 mt-1">Subject Matter Experts</div>
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
            placeholder="Search by course code, name or faculty..."
            className="w-full pl-8 pr-3 py-1.5 bg-white text-[12px] text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <button
              onClick={() => {
                setShowDeptDropdown(!showDeptDropdown);
                setShowSemDropdown(false);
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
                setShowSemDropdown(!showSemDropdown);
                setShowDeptDropdown(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[11.5px] font-medium text-slate-700 transition-colors shadow-sm"
            >
              <Calendar size={13} className="text-slate-400" />
              <span>{selectedSem}</span>
              <ChevronDown size={12} className="text-slate-400 ml-0.5" />
            </button>
            {showSemDropdown && (
              <div className="absolute left-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop">
                {semesters.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSem(s);
                      setShowSemDropdown(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-[11.5px] ${
                      selectedSem === s
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

      {/* Course Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] border-b border-slate-200/60 text-[11px] font-bold text-slate-500">
                <th className="py-2.5 px-3.5 w-10 text-slate-400">#</th>
                <th className="py-2.5 px-3.5">Code</th>
                <th className="py-2.5 px-3.5">Course Title</th>
                <th className="py-2.5 px-3.5">Department</th>
                <th className="py-2.5 px-3.5">Credits</th>
                <th className="py-2.5 px-3.5">Semester</th>
                <th className="py-2.5 px-3.5">Faculty Lead</th>
                <th className="py-2.5 px-3.5">Enrolled</th>
                <th className="py-2.5 px-3.5">Status</th>
                <th className="py-2.5 px-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px]">
              {filteredCourses.map((c, index) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors group cursor-default">
                  <td className="py-2.5 px-3.5 text-slate-400 font-medium">{index + 1}</td>
                  <td className="py-2.5 px-3.5 font-mono font-bold text-[#4f39f6] text-[11.5px]">
                    {c.code}
                  </td>
                  <td className="py-2.5 px-3.5 font-bold text-slate-800">{c.name}</td>
                  <td className="py-2.5 px-3.5 font-semibold text-slate-600">{c.department}</td>
                  <td className="py-2.5 px-3.5 text-slate-700 font-medium">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-600">
                      {c.credits} Credits
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-500">{c.semester}</td>
                  <td className="py-2.5 px-3.5 font-medium text-slate-700">{c.faculty}</td>
                  <td className="py-2.5 px-3.5 text-slate-600 font-medium">{c.enrolledStudents} Students</td>
                  <td className="py-2.5 px-3.5">
                    {c.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#ecfdf5] text-[#059669]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#eff6ff] text-[#2563eb]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                        Upcoming
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 text-center relative">
                    <div className="inline-block text-left">
                      <button
                        onClick={() =>
                          setActiveActionMenu(activeActionMenu === c.id ? null : c.id)
                        }
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoreHorizontal size={14} />
                      </button>
                      {activeActionMenu === c.id && (
                        <div className="absolute right-4 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-30 animate-pop text-left">
                          <button
                            onClick={() => {
                              setCourses(courses.filter((course) => course.id !== c.id));
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
          Showing 1 to {filteredCourses.length} of 64 courses
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

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#f8f9fd] to-[#f4f2ff] border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#4f39f6] flex items-center justify-center text-white">
                  <BookMarked size={16} />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Add Academic Course</h2>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. CS-305"
                    className="w-full px-3 py-1.5 text-[12.5px] font-mono rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Credits</label>
                  <input
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    className="w-full px-3 py-1.5 text-[12.5px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Operating Systems & Kernel Design"
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
                  <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[12px] rounded-lg border border-slate-200 focus:border-[#4f39f6] focus:outline-none"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold text-slate-700 mb-1">Faculty Lead</label>
                <input
                  type="text"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Kulkarni"
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
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
