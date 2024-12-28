import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ReportsList } from "@/components/dashboard/ReportsList";

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <DashboardHeader />
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <ReportsList />
      </main>
    </div>
  );
};

export default ReportsPage;