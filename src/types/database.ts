// Student Profile Types
export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  faceData?: string; // Base64 encoded face recognition data
  courses: string[]; // Array of course IDs
  createdAt: Date;
  updatedAt: Date;
}

// Course Types
export interface Course {
  id: string;
  name: string;
  code: string; // Added this field
  sectionNumber: string;
  instructor: string;
  schedule: {
    day: string;
    time: string;
  }[];
  students: string[]; // Array of student IDs
  createdAt: Date;
  updatedAt: Date;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  courseId: string;
  date: Date;
  presentStudents: string[]; // Array of student IDs
  absentStudents: string[]; // Array of student IDs
  createdAt: Date;
  updatedAt: Date;
}

// Report Types
export interface AttendanceReport {
  id: string;
  courseId: string;
  date: Date;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  attendanceRate: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock Database Interface
export interface LocalDatabase {
  students: Student[];
  courses: Course[];
  attendanceRecords: AttendanceRecord[];
  reports: AttendanceReport[];
}