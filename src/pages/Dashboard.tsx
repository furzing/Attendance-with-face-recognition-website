import { useState } from "react";
import { DashboardStats } from "@/components/DashboardStats";
import { AttendanceChart } from "@/components/AttendanceChart";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { CourseInfoStep } from "@/components/dashboard/CourseInfoStep";

const Dashboard = () => {
  const [courseInfo, setCourseInfo] = useState({
    courseName: '',
    sectionNumber: '',
    date: '',
    week: ''
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <DashboardHeader />
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="glass-effect rounded-lg p-6">
            <DashboardStats />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AttendanceChart />
            <CourseInfoStep 
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;