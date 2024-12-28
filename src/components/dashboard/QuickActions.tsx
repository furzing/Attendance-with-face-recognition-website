import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FaceRecognition from "@/components/FaceRecognition";

interface QuickActionsProps {
  onAttendanceComplete: () => void;
  courseInfo: {
    courseName: string;
    sectionNumber: string;
  };
}

export const QuickActions = ({ onAttendanceComplete, courseInfo }: QuickActionsProps) => {
  const { toast } = useToast();

  const handleSendNotification = () => {
    toast({
      title: "Notifications Sent",
      description: "Absence notifications have been sent to all absent students.",
    });
  };

  return (
    <Card className="lg:col-span-2 card-hover">
      <CardHeader>
        <CardTitle className="text-primary flex items-center justify-between">
          Quick Actions - {courseInfo.courseName} (Section {courseInfo.sectionNumber})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FaceRecognition />
        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10"
            onClick={handleSendNotification}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Notifications
          </Button>
          <Button 
            onClick={onAttendanceComplete}
            className="bg-primary hover:bg-primary/90"
          >
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};