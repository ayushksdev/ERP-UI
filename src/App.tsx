import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewPage } from './components/OverviewPage';
import { StudentsPage } from './components/StudentsPage';
import { FacultyPage } from './components/FacultyPage';
import { AdmissionsPage } from './components/AdmissionsPage';
import { AcademicsPage } from './components/AcademicsPage';
import { AttendancePage } from './components/AttendancePage';
import { FeesPage } from './components/FeesPage';
import { ExamsPage } from './components/ExamsPage';
import { LibraryPage } from './components/LibraryPage';
import { HostelPage } from './components/HostelPage';
import { TransportPage } from './components/TransportPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
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

          {activePage === 'faculty' && <FacultyPage />}

          {activePage === 'admissions' && <AdmissionsPage />}

          {activePage === 'academics' && <AcademicsPage />}

          {activePage === 'attendance' && <AttendancePage />}

          {activePage === 'fees' && <FeesPage />}

          {activePage === 'exams' && <ExamsPage />}

          {activePage === 'library' && <LibraryPage />}

          {activePage === 'hostel' && <HostelPage />}

          {activePage === 'transport' && <TransportPage />}

          {activePage === 'reports' && <ReportsPage />}

          {activePage === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default App;
