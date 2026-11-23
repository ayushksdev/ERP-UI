import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Student } from '../types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Omit<Student, 'id'>) => void;
  nextStudentIndex: number;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  nextStudentIndex,
}) => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState(`AIMT24${String(nextStudentIndex).padStart(4, '0')}`);
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('CSE');
  const [year, setYear] = useState('Year 1');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddStudent({
      studentId: studentId.trim(),
      name: name.trim(),
      email: email.trim(),
      department,
      year,
      status,
      avatar: '/assets/avatars/aarav.png',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#f8f9fd] to-[#f4f2ff] border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4f39f6] flex items-center justify-center text-white shadow-md">
              <UserPlus size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0f172a]">Add New Student</h2>
              <p className="text-[11.5px] text-slate-500">Create a new student enrollment profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="e.g. Rahul Gupta"
                className={`w-full px-3.5 py-2 text-[13px] rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 ${
                  errors.name ? 'border-rose-500' : 'border-slate-200 focus:border-[#4f39f6]'
                }`}
              />
              {errors.name && <p className="text-[10.5px] text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Student ID *
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => {
                  setStudentId(e.target.value);
                  if (errors.studentId) setErrors({ ...errors, studentId: '' });
                }}
                placeholder="e.g. AIMT240007"
                className={`w-full px-3.5 py-2 text-[13px] font-mono rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 ${
                  errors.studentId ? 'border-rose-500' : 'border-slate-200 focus:border-[#4f39f6]'
                }`}
              />
              {errors.studentId && <p className="text-[10.5px] text-rose-500 mt-1">{errors.studentId}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="e.g. rahul.gupta@aimt.ac.in"
              className={`w-full px-3.5 py-2 text-[13px] rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 ${
                errors.email ? 'border-rose-500' : 'border-slate-200 focus:border-[#4f39f6]'
              }`}
            />
            {errors.email && <p className="text-[10.5px] text-rose-500 mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-[12.5px] rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6]"
              >
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 text-[12.5px] rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6]"
              >
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                className="w-full px-3 py-2 text-[12.5px] rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#4f39f6]/20 focus:border-[#4f39f6]"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[12.5px] font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-[12.5px] font-bold text-white bg-[#4f39f6] hover:bg-[#4338ca] rounded-xl shadow-md shadow-[#4f39f6]/25 transition-all"
            >
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
