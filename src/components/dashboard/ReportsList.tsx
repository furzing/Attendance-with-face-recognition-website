import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Report {
  id: string;
  date: string;
  courseName: string;
  section: string;
  totalStudents: number;
  presentStudents: number;
  absentStudents: number;
  attendanceRate: string;
}

// Mock data for demonstration
const reports: Report[] = [
  {
    id: "1",
    date: "2024-03-18",
    courseName: "Computer Science 101",
    section: "A",
    totalStudents: 45,
    presentStudents: 42,
    absentStudents: 3,
    attendanceRate: "93.33%"
  },
  {
    id: "2",
    date: "2024-03-18",
    courseName: "Data Structures",
    section: "B",
    totalStudents: 38,
    presentStudents: 35,
    absentStudents: 3,
    attendanceRate: "92.11%"
  },
  // Add more mock reports as needed
];

export const ReportsList = () => {
  return (
    <Card className="w-full glass-effect">
      <CardHeader>
        <CardTitle className="text-primary">Attendance Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id} className="p-4 hover:bg-white/50 transition-colors">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Course</p>
                    <p className="font-medium">{report.courseName}</p>
                    <p className="text-sm text-gray-500">Section {report.section}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{new Date(report.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attendance</p>
                    <p className="font-medium text-green-600">{report.presentStudents} Present</p>
                    <p className="font-medium text-red-600">{report.absentStudents} Absent</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rate</p>
                    <p className="font-medium text-primary">{report.attendanceRate}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};