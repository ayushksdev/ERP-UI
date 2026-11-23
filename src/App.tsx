import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewPage } from './components/OverviewPage';
import { StudentsPage } from './components/StudentsPage';
import { initialStudents } from './data/mockData';
import { ActivePage, Student } from './types';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('header input') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddStudent = (newSt: Omit<Student, 'id'>) => {
    const studentWithId: Student = {
      ...newSt,
      id: Date.now(),
    };
    setStudents([studentWithId, ...students]);
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setStudents(
      students.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
          : s
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fd] text-[#1e202e]">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          onOpenMobileMenu={() => setMobileOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 pb-12">
          {activePage === 'overview' && (
            <OverviewPage onNavigateToStudents={() => setActivePage('students')} />
          )}

          {activePage === 'students' && (
            <StudentsPage
              students={students}
              onAddStudent={handleAddStudent}
              onDeleteStudent={handleDeleteStudent}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {activePage !== 'overview' && activePage !== 'students' && (
            <div className="p-8 max-w-4xl mx-auto text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-[#ede9fe] text-[#4f39f6] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl font-bold uppercase">{activePage.slice(0, 2)}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 capitalize">
                {activePage} Module
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
                The {activePage} section is configured in the ERP system. Switch back to Campus Overview or Students directory to view full Figma replica screens.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setActivePage('overview')}
                  className="px-4 py-2 bg-[#4f39f6] text-white rounded-xl text-xs font-semibold shadow-md hover:bg-[#4338ca] transition-all"
                >
                  Go to Overview
                </button>
                <button
                  onClick={() => setActivePage('students')}
                  className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all"
                >
                  Go to Students
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default App;
