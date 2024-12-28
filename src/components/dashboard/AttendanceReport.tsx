import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendanceReportProps {
  courseInfo: {
    courseName: string;
    sectionNumber: string;
    date: string;
    week: string;
  };
}

export const AttendanceReport = ({ courseInfo }: AttendanceReportProps) => {
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "The attendance report has been generated successfully.",
    });
  };

  return (
    <Card className="lg:col-span-2 card-hover">
      <CardHeader>
        <CardTitle className="text-primary">Attendance Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-lg mb-6">
          <h3 className="font-semibold mb-4">Course Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Course:</p>
              <p className="font-medium">{courseInfo.courseName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Section:</p>
              <p className="font-medium">{courseInfo.sectionNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date:</p>
              <p className="font-medium">{courseInfo.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Week:</p>
              <p className="font-medium">{courseInfo.week}</p>
            </div>
          </div>
        </div>
        <Button 
          onClick={handleGenerateReport}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </CardContent>
    </Card>
  );
};