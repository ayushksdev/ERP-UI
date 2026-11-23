import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  PieChart,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('2026 – 27 Odd Sem');
  const [reportType, setReportType] = useState('Academic');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const departmentMetrics = [
    {
      dept: 'Computer Science & Engineering',
      code: 'CSE',
      enrolled: 2840,
      facultyCount: 112,
      avgAttendance: '94.2%',
      passRate: '96.8%',
      avgCgpa: '8.42',
      placements: '91.4%',
    },
    {
      dept: 'Information Technology',
      code: 'IT',
      enrolled: 1950,
      facultyCount: 84,
      avgAttendance: '93.0%',
      passRate: '95.2%',
      avgCgpa: '8.28',
      placements: '89.6%',
    },
    {
      dept: 'Electronics & Communication',
      code: 'ECE',
      enrolled: 1620,
      facultyCount: 76,
      avgAttendance: '91.8%',
      passRate: '93.5%',
      avgCgpa: '8.15',
      placements: '84.0%',
    },
    {
      dept: 'Mechanical Engineering',
      code: 'MECH',
      enrolled: 1140,
      facultyCount: 62,
      avgAttendance: '89.4%',
      passRate: '91.2%',
      avgCgpa: '7.85',
      placements: '78.5%',
    },
    {
      dept: 'Civil Engineering',
      code: 'CIVIL',
      enrolled: 876,
      facultyCount: 50,
      avgAttendance: '90.1%',
      passRate: '90.4%',
      avgCgpa: '7.70',
      placements: '74.2%',
    },
  ];

  const handleDownload = (format: 'PDF' | 'Excel') => {
    setToastMessage(`Generating official ${format} institutional report...`);
    setTimeout(() => {
      setToastMessage(`${format} report downloaded successfully.`);
    }, 1500);
  };

  return (
    <div className="p-5 space-y-4 max-w-[1400px] mx-auto select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#141033] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-slide-up border border-purple-500/30">
          <Sparkles size={14} className="text-[#a78bfa]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f5f1fe] text-[#4f39f6] flex items-center justify-center font-bold shadow-sm">
            <BarChart3 size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Reports & Analytics
            </h1>
            <p className="text-slate-500 text-xs">
              Institutional intelligence, student academic performance, and department KPIs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload('PDF')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm transition-all"
          >
            <FileText size={14} className="text-rose-500" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => handleDownload('Excel')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all"
          >
            <FileSpreadsheet size={14} />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#f5f1fe] rounded-2xl p-4 border border-[#e9e1fc] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ede9fe] flex items-center justify-center text-[#4f39f6]">
              <Award size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Institutional CGPA</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              8.24 / 10
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ▲ +0.31
              </span>
              <span className="text-[10.5px] text-slate-400">vs. last batch</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0fbf5] rounded-2xl p-4 border border-[#d4f6e3] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#d1fae5] flex items-center justify-center text-[#059669]">
              <TrendingUp size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Overall Pass Rate</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              94.8%
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#ecfdf5] text-[#059669] text-[10.5px] font-bold rounded">
                ▲ +1.9%
              </span>
              <span className="text-[10.5px] text-slate-400">semester exams</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f0f8ff] rounded-2xl p-4 border border-[#daf0ff] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
              <Users size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Placement Offer Rate</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              87.2%
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#eff6ff] text-[#2563eb] text-[10.5px] font-bold rounded">
                1,420 Offers
              </span>
              <span className="text-[10.5px] text-slate-400">top recruiters</span>
            </div>
          </div>
        </div>

        <div className="bg-[#fef9ee] rounded-2xl p-4 border border-[#feeec8] shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706]">
              <PieChart size={17} />
            </div>
            <span className="text-[12px] font-medium text-slate-600">Fee Compliance</span>
          </div>
          <div className="mt-2.5">
            <div className="text-[25px] font-extrabold text-[#0f172a] leading-none">
              96.4%
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#fef3c7] text-[#b45309] text-[10.5px] font-bold rounded">
                ● Low Dues
              </span>
              <span className="text-[10.5px] text-slate-400">settlement rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Period Selection */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['Academic', 'Attendance', 'Financial', 'Placements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setReportType(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                reportType === tab
                  ? 'bg-[#4f39f6] text-white shadow-sm'
                  : 'bg-[#f8f9fd] text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab} Analytics
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-400" />
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="px-3 py-1.5 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="2026 – 27 Odd Sem">Academic Year: 2026 – 27 (Odd Sem)</option>
            <option value="2025 – 26 Even Sem">Academic Year: 2025 – 26 (Even Sem)</option>
            <option value="2025 – 26 Odd Sem">Academic Year: 2025 – 26 (Odd Sem)</option>
          </select>
        </div>
      </div>

      {/* Department Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              Department Performance Breakdown ({selectedTerm})
            </h2>
            <p className="text-xs text-slate-400">
              Comparative matrix across enrollment, faculty strength, attendance and graduate outcomes
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f3ff] text-[11px] font-bold text-slate-600 border-b border-slate-200/80">
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Students</th>
                <th className="py-2.5 px-3">Faculty Ratio</th>
                <th className="py-2.5 px-3">Attendance Rate</th>
                <th className="py-2.5 px-3">Exam Pass %</th>
                <th className="py-2.5 px-3">Batch CGPA</th>
                <th className="py-2.5 px-3 text-right">Placement %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {departmentMetrics.map((dm) => (
                <tr key={dm.code} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#f5f1fe] text-[#4f39f6] font-bold text-xs flex items-center justify-center shrink-0">
                        {dm.code}
                      </span>
                      <div>
                        <span className="font-bold text-slate-800">{dm.dept}</span>
                        <span className="block text-[10.5px] text-slate-400">Full-time B.Tech/M.Tech</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700">
                    {dm.enrolled.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    1 : {Math.round(dm.enrolled / dm.facultyCount)}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-600">
                    {dm.avgAttendance}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ecfdf5] text-[#059669]">
                      {dm.passRate}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-800 font-mono">
                    {dm.avgCgpa}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#eff6ff] text-[#2563eb]">
                      {dm.placements}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#f8f9fd] border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>5 Engineering & Technology Divisions Reported</span>
          <span className="text-[11px] text-slate-400">
            Last audit updated: 20 Nov 2026, 04:30 PM
          </span>
        </div>
      </div>
    </div>
  );
};
