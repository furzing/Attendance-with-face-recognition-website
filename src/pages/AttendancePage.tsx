import { useLocation, useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import FaceRecognition from "@/components/FaceRecognition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bell, FileText } from "lucide-react";
import { ReportsList } from "@/components/dashboard/ReportsList";
import { useState } from "react";

const AttendancePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseInfo = location.state?.courseInfo;
  const { toast } = useToast();
  const [showReports, setShowReports] = useState(false);

  if (!courseInfo) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <DashboardNav />
        <main className="container mx-auto px-4 py-8">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">No course information provided. Please start from the dashboard.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const handleNotifyAbsent = () => {
    toast({
      title: "Notifications Sent",
      description: "Absent students have been notified successfully.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Attendance report has been generated and saved.",
    });
    setShowReports(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8">
        {!showReports ? (
          <>
            <div className="mb-8 glass-effect rounded-lg p-4">
              <h2 className="text-xl font-semibold text-primary mb-2">Active Session</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Course:</span>
                  <span className="ml-2 font-medium">{courseInfo.courseName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Section:</span>
                  <span className="ml-2 font-medium">{courseInfo.sectionNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Date:</span>
                  <span className="ml-2 font-medium">{courseInfo.date}</span>
                </div>
                <div>
                  <span className="text-gray-600">Week:</span>
                  <span className="ml-2 font-medium">{courseInfo.week}</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <FaceRecognition />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleNotifyAbsent}
                  className="bg-accent hover:bg-accent/90 flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Notify Absent Students
                </Button>
                <Button
                  onClick={handleGenerateReport}
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </>
        ) : (
          <ReportsList />
        )}
      </main>
    </div>
  );
};

export default AttendancePage;