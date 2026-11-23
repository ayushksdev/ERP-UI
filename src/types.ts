export interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  department: string;
  year: string;
  status: 'Active' | 'Inactive';
  avatar: string;
}

export interface Admission {
  id: number;
  name: string;
  program: string;
  applicationId: string;
  appliedOn: string;
  status: 'Admitted' | 'Documents Pending' | 'Under Review';
  avatar: string;
  score?: number;
  phone?: string;
  category?: string;
}

export interface UpcomingEvent {
  id: number;
  date: string;
  month: string;
  title: string;
  location: string;
  tag: 'Event' | 'Exam' | 'Seminar' | 'Placement';
  tagColor: string;
}

export interface FacultyMember {
  id: number;
  facultyId: string;
  name: string;
  email: string;
  department: string;
  designation: 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'HOD';
  experience: string;
  status: 'Active' | 'On Leave';
  avatar: string;
  courses: string[];
}

export interface Course {
  id: number;
  code: string;
  name: string;
  department: string;
  credits: number;
  semester: string;
  faculty: string;
  enrolledStudents: number;
  status: 'Active' | 'Upcoming';
}

export interface AttendanceRecord {
  id: number;
  studentId: string;
  name: string;
  department: string;
  date: string;
  status: 'Present' | 'Absent' | 'On Leave';
  inTime: string;
  outTime: string;
}

export interface FeeTransaction {
  id: number;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  department: string;
  amount: number;
  feeType: 'Tuition Fee' | 'Hostel Fee' | 'Exam Fee' | 'Library Fee' | 'Transport Fee';
  paymentMode: 'Online' | 'Bank Transfer' | 'Cash' | 'Cheque';
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface ExamRecord {
  id: number;
  examCode: string;
  courseName: string;
  department: string;
  semester: string;
  date: string;
  time: string;
  hall: string;
  totalStudents: number;
  status: 'Scheduled' | 'Completed' | 'In Progress';
}

export interface BookRecord {
  id: number;
  isbn: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelf: string;
  status: 'Available' | 'Reserved' | 'Out of Stock';
}

export interface HostelRoom {
  id: number;
  roomNumber: string;
  block: string;
  type: 'Single AC' | 'Double AC' | 'Double Non-AC' | 'Triple Non-AC';
  capacity: number;
  occupied: number;
  monthlyRent: number;
  warden: string;
  status: 'Available' | 'Full' | 'Maintenance';
}

export interface TransportRoute {
  id: number;
  routeNumber: string;
  routeName: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  stopsCount: number;
  totalCapacity: number;
  assignedStudents: number;
  status: 'On Time' | 'Delayed' | 'Maintenance';
}

export type ActivePage =
  | 'overview'
  | 'students'
  | 'faculty'
  | 'admissions'
  | 'academics'
  | 'attendance'
  | 'fees'
  | 'exams'
  | 'library'
  | 'hostel'
  | 'transport'
  | 'reports'
  | 'settings';
