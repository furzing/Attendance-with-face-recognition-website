# Face Recognition Attendance System Documentation

## Project Overview
This is a web-based attendance system that uses facial recognition to track student attendance in university courses. The system is built using React, TypeScript, and modern web technologies.

## Architecture

### Frontend Structure
The frontend is organized into several key directories:

#### Components
- `src/components/`
  - `FaceRecognition.tsx`: Core component handling facial recognition using HuggingFace's transformers library
  - `UniversityLogo.tsx`: University branding component
  - `AuthGuard.tsx`: Authentication wrapper component for protected routes
  - `DashboardStats.tsx`: Displays attendance statistics
  - `AttendanceChart.tsx`: Visualizes attendance data using charts

#### Dashboard Components
- `src/components/dashboard/`
  - `DashboardHeader.tsx`: Top navigation bar with user info and logout
  - `DashboardNav.tsx`: Main navigation menu
  - `CourseInfoStep.tsx`: Course selection and information form
  - `QuickActions.tsx`: Quick access to common actions
  - `AttendanceReport.tsx`: Attendance report generation
  - `ReportsList.tsx`: Displays list of attendance reports

#### Course Management
- `src/components/courses/`
  - `CourseManagement.tsx`: CRUD operations for courses

#### Pages
- `src/pages/`
  - `Index.tsx`: Landing page with role selection
  - `Login.tsx`: Authentication page
  - `Dashboard.tsx`: Main dashboard view
  - `AttendancePage.tsx`: Attendance taking interface
  - `StudentsPage.tsx`: Student management
  - `CoursesPage.tsx`: Course management
  - `ReportsPage.tsx`: Attendance reports

### Database Structure
The project uses IndexedDB for local storage, structured as follows:

#### Database Models (`src/types/database.ts`):
- `Student`: Student profiles and face data
- `Course`: Course information and enrollment
- `AttendanceRecord`: Daily attendance records
- `AttendanceReport`: Aggregated attendance reports

### Face Recognition System

#### Implementation (`src/components/FaceRecognition.tsx`)
1. Uses HuggingFace's transformers library for face detection
2. Captures images through webcam using react-webcam
3. Processes images for face detection
4. Matches detected faces against stored student data
5. Records attendance in the database

#### Browser Compatibility
- `src/utils/browserCheck.ts`: Ensures browser supports required features (camera, WebGL)

### Data Management

#### Database Utilities
- `src/utils/mockDatabase.ts`: IndexedDB implementation
- `src/utils/indexedDB.ts`: Database service layer

### Key Features

1. **Authentication**
   - Role-based access (admin/lecturer)
   - Protected routes using AuthGuard

2. **Course Management**
   - Create, edit, delete courses
   - Assign sections and schedules
   - Manage student enrollment

3. **Attendance Taking**
   - Real-time face recognition
   - Automatic student identification
   - Attendance record creation

4. **Reporting**
   - Generate attendance reports
   - View attendance statistics
   - Export functionality

### Technical Implementation Details

#### Face Recognition Process
1. Camera initialization and permission handling
2. Frame capture using react-webcam
3. Face detection using HuggingFace transformers
4. Feature extraction and matching
5. Database record creation

#### Database Operations
- Uses IndexedDB for client-side storage
- Implements CRUD operations for all entities
- Handles relationships between entities
- Manages data persistence

#### UI/UX Features
- Responsive design using Tailwind CSS
- Component library using shadcn/ui
- Toast notifications for user feedback
- Loading states and error handling
- Interactive charts and statistics

### Error Handling
- Browser compatibility checks
- Camera permission handling
- Face detection error management
- Database operation error handling

### Future Improvements
1. Backend Integration
   - Move to server-side storage
   - Implement real-time updates
   - Add cloud backup

2. Enhanced Security
   - Implement JWT authentication
   - Add role-based permissions
   - Secure face data storage

3. Advanced Features
   - Batch attendance processing
   - Multiple face detection
   - Automated reports
   - Mobile app integration

## Getting Started

### Prerequisites
- Modern web browser with camera access
- Node.js and npm installed

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

### Configuration
- Camera settings in FaceRecognition component
- Database configuration in mockDatabase
- UI theme customization in Tailwind config