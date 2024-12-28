import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "@/utils/mockDatabase";
import { Course } from "@/types/database";

interface CourseInfoStepProps {
  courseInfo: {
    courseName: string;
    sectionNumber: string;
    date: string;
    week: string;
  };
  setCourseInfo: (info: any) => void;
}

export const CourseInfoStep = ({ courseInfo, setCourseInfo }: CourseInfoStepProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await db.courses.getAll();
        console.log("Fetched courses:", result);
        setCourses(result);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch courses. Please try again.",
        });
      }
    };

    fetchCourses();
  }, []);

  const handleNext = () => {
    if (!courseInfo.courseName || !courseInfo.sectionNumber || !courseInfo.date || !courseInfo.week) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all course information fields before proceeding.",
      });
      return;
    }
    
    navigate("/attendance", { 
      state: { courseInfo },
      replace: true
    });
  };

  const handleCourseSelect = (courseId: string) => {
    const selectedCourse = courses.find(course => course.id === courseId);
    if (selectedCourse) {
      setCourseInfo({
        ...courseInfo,
        courseName: selectedCourse.name,
        sectionNumber: selectedCourse.sectionNumber
      });
      
      toast({
        title: "Course Selected",
        description: `Selected ${selectedCourse.name} - Section ${selectedCourse.sectionNumber}`,
      });
    }
  };

  return (
    <Card className="lg:col-span-2 card-hover">
      <CardHeader>
        <CardTitle className="text-primary">Course Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-gray-600">Select Course</label>
            <Select onValueChange={handleCourseSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {`${course.name} (${course.code}) - Section ${course.sectionNumber}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">Date</label>
            <Input 
              type="date" 
              className="w-full"
              value={courseInfo.date}
              onChange={(e) => setCourseInfo({ ...courseInfo, date: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">Week</label>
            <Input 
              type="number" 
              placeholder="Enter week number" 
              className="w-full"
              value={courseInfo.week}
              onChange={(e) => setCourseInfo({ ...courseInfo, week: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleNext}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};