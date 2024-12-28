import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/utils/mockDatabase";
import { Course } from "@/types/database";

export const CourseManagement = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    section: "",
    schedule: [{ day: "Monday", time: "08:00" }]
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await db.courses.getAll();
        console.log("Fetched existing courses:", result);
        setCourses(result || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch courses.",
        });
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (!newCourse.name || !newCourse.code || !newCourse.section) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all course details.",
      });
      return;
    }

    try {
      const course: Course = {
        id: crypto.randomUUID(),
        name: newCourse.name,
        code: newCourse.code,
        sectionNumber: newCourse.section,
        instructor: "Current User",
        schedule: newCourse.schedule,
        students: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.courses.create(course);
      setCourses([...courses, course]);
      setNewCourse({
        name: "",
        code: "",
        section: "",
        schedule: [{ day: "Monday", time: "08:00" }]
      });

      toast({
        title: "Course Added",
        description: "The course has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding course:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add course.",
      });
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await db.courses.delete(id);
      setCourses(courses.filter(course => course.id !== id));
      toast({
        title: "Course Deleted",
        description: "The course has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete course.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Add New Course</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="border-gray-200 focus:border-primary"
            />
            <Input
              placeholder="Course Code"
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
              className="border-gray-200 focus:border-primary"
            />
            <Input
              placeholder="Section"
              value={newCourse.section}
              onChange={(e) => setNewCourse({ ...newCourse, section: e.target.value })}
              className="border-gray-200 focus:border-primary"
            />
          </div>
          <Button 
            onClick={handleAddCourse}
            className="mt-4 bg-primary hover:bg-primary/90"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id} className="p-4 hover:bg-accent/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Code: {course.code} | Section: {course.sectionNumber}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};