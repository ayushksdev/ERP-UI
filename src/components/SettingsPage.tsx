import React, { useState } from 'react';
import {
  Settings,
  Building,
  Bell,
  Lock,
  Save,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'academic' | 'notifications' | 'security'>('general');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Institution State
  const [institution, setInstitution] = useState({
    name: 'AIMT College of Engineering',
    code: 'AIMT-ENG-089',
    affiliation: 'Affiliated to State Technical University & AICTE Approved',
    email: 'registrar@aimt.ac.in',
    phone: '+91 120 4567890',
    address: 'Plot No. 12, Knowledge Park III, Greater Noida, UP - 201306',
  });

  // Academic Settings
  const [academicSettings, setAcademicSettings] = useState({
    academicYear: '2026 – 27',
    term: 'Odd Semester',
    gradingSystem: '10-Point CGPA (UGC Compliant)',
    minAttendancePercent: 75,
    maxCourseCredits: 26,
  });

  // Notification Toggles
  const [notifications, setNotifications] = useState({
    attendanceSmsToParents: true,
    feeDueAlerts: true,
    examScheduleAnnouncements: true,
    facultyLeaveNotifications: false,
    weeklyDigest: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('System settings and configuration saved successfully!');
    setTimeout(() => setToastMessage(null), 3500);
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
            <Settings size={20} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Settings & Configuration
            </h1>
            <p className="text-slate-500 text-xs">
              Manage institution profile, academic rules, notifications and access security
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all cursor-pointer"
        >
          <Save size={15} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'general'
              ? 'bg-[#4f39f6] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building size={14} />
          <span>General Info</span>
        </button>

        <button
          onClick={() => setActiveTab('academic')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'academic'
              ? 'bg-[#4f39f6] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck size={14} />
          <span>Academic Term</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'notifications'
              ? 'bg-[#4f39f6] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell size={14} />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'security'
              ? 'bg-[#4f39f6] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock size={14} />
          <span>Security & Auth</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Campus Identity & Metadata</h2>
            <p className="text-xs text-slate-400">
              Details reflected on student transcripts, fee receipts, and official reports
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={institution.name}
                  onChange={(e) => setInstitution({ ...institution, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Institution Code
                </label>
                <input
                  type="text"
                  value={institution.code}
                  onChange={(e) => setInstitution({ ...institution, code: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#4f39f6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                University Affiliation & Accreditation
              </label>
              <input
                type="text"
                value={institution.affiliation}
                onChange={(e) => setInstitution({ ...institution, affiliation: e.target.value })}
                className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administrative Contact Email
                </label>
                <input
                  type="email"
                  value={institution.email}
                  onChange={(e) => setInstitution({ ...institution, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Helpdesk Telephone
                </label>
                <input
                  type="text"
                  value={institution.phone}
                  onChange={(e) => setInstitution({ ...institution, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#4f39f6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Campus Postal Address
              </label>
              <textarea
                rows={2}
                value={institution.address}
                onChange={(e) => setInstitution({ ...institution, address: e.target.value })}
                className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all"
              >
                Update Institution Info
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Academic Term & Criteria</h2>
            <p className="text-xs text-slate-400">
              Rules governing student eligibility, attendance cutoff and credits
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Academic Year
                </label>
                <select
                  value={academicSettings.academicYear}
                  onChange={(e) =>
                    setAcademicSettings({ ...academicSettings, academicYear: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                >
                  <option value="2026 – 27">2026 – 27</option>
                  <option value="2025 – 26">2025 – 26</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Active Term
                </label>
                <select
                  value={academicSettings.term}
                  onChange={(e) =>
                    setAcademicSettings({ ...academicSettings, term: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                >
                  <option value="Odd Semester">Odd Semester (July - Dec)</option>
                  <option value="Even Semester">Even Semester (Jan - June)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Minimum Attendance Cutoff (%)
                </label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={academicSettings.minAttendancePercent}
                  onChange={(e) =>
                    setAcademicSettings({
                      ...academicSettings,
                      minAttendancePercent: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Max Semester Credit Limit
                </label>
                <input
                  type="number"
                  min="16"
                  max="35"
                  value={academicSettings.maxCourseCredits}
                  onChange={(e) =>
                    setAcademicSettings({
                      ...academicSettings,
                      maxCourseCredits: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#f8f9fd] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4f39f6]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all"
              >
                Save Academic Rules
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Notification Triggers</h2>
            <p className="text-xs text-slate-400">
              Configure automatic SMS and Email alerts for campus events
            </p>
          </div>

          <div className="space-y-3 max-w-xl">
            {[
              {
                id: 'attendanceSmsToParents',
                title: 'Daily Student Absence SMS',
                desc: 'Send automated SMS to parents when a student is marked Absent before 11:00 AM',
                val: notifications.attendanceSmsToParents,
              },
              {
                id: 'feeDueAlerts',
                title: 'Fee Payment Reminders',
                desc: 'Email and push alerts 7 days prior to semester fee installment deadline',
                val: notifications.feeDueAlerts,
              },
              {
                id: 'examScheduleAnnouncements',
                title: 'Examination Timetable Notifications',
                desc: 'Broadcast circular to students when semester exam dates are published',
                val: notifications.examScheduleAnnouncements,
              },
              {
                id: 'weeklyDigest',
                title: 'Dean Weekly Executive Digest',
                desc: 'Consolidated attendance and financial report emailed every Monday 8:00 AM',
                val: notifications.weeklyDigest,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 bg-[#f8f9fd] rounded-xl border border-slate-200"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{item.title}</span>
                  <span className="text-[11px] text-slate-500">{item.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={item.val}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      [item.id]: !item.val,
                    })
                  }
                  className="w-4 h-4 text-[#4f39f6] rounded focus:ring-[#4f39f6] cursor-pointer"
                />
              </div>
            ))}

            <div className="pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Security & Administrative Access</h2>
            <p className="text-xs text-slate-400">
              Role-based access control, session timeouts and credential verification
            </p>
          </div>

          <div className="space-y-4 max-w-xl">
            <div className="p-4 bg-[#f0fbf5] border border-[#d4f6e3] rounded-xl flex items-center gap-3">
              <ShieldCheck size={24} className="text-[#059669] shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#065f46] block">
                  Two-Factor Authentication (2FA) Active
                </span>
                <span className="text-[11px] text-[#047857]">
                  All administrator and faculty accounts require TOTP code verification on login
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#f8f9fd] border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Session Management</span>
              <p className="text-[11px] text-slate-500">
                Automatic logout after 30 minutes of idle activity to prevent unauthorized terminal access.
              </p>
              <button
                onClick={() => {
                  setToastMessage('All active sessions re-authenticated.');
                }}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Force Revoke Other Sessions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
