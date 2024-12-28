import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { CourseManagement } from "@/components/courses/CourseManagement";

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <DashboardHeader />
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <CourseManagement />
      </main>
    </div>
  );
};

export default CoursesPage;