import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { StudentManagement } from "@/components/students/StudentManagement";

const StudentsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <DashboardHeader />
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <StudentManagement />
      </main>
    </div>
  );
};

export default StudentsPage;