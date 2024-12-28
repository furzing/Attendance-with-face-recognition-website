import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/utils/mockDatabase";
import { Student } from "@/types/database";
import { Search, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const StudentManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    studentId: "",
    email: "",
    faceData: "",
  });
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const { data: students = [], refetch } = useQuery({
    queryKey: ["students"],
    queryFn: () => db.students.getAll(),
  });

  const filteredStudents = students.filter((student: Student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const capturePhoto = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setNewStudent({ ...newStudent, faceData: imageSrc });
      setShowCamera(false);
      toast({
        title: "Photo captured",
        description: "Student photo has been successfully captured.",
      });
    }
  }, [webcamRef, newStudent]);

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.studentId || !newStudent.email || !newStudent.faceData) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all student details and capture a photo.",
      });
      return;
    }

    try {
      const student = {
        id: crypto.randomUUID(),
        ...newStudent,
        courses: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.students.create(student);
      setNewStudent({ name: "", studentId: "", email: "", faceData: "" });
      refetch();
      toast({
        title: "Success",
        description: "Student added successfully",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add student",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-effect p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Full Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <Input
            placeholder="Student ID"
            value={newStudent.studentId}
            onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <Dialog open={showCamera} onOpenChange={setShowCamera}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowCamera(true)}
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Capture Student Photo</DialogTitle>
                <DialogDescription>
                  Position the student's face within the frame
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: "user"
                  }}
                />
              </div>
              <Button onClick={capturePhoto} className="mt-4">Capture Photo</Button>
            </DialogContent>
          </Dialog>
          {newStudent.faceData && (
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          )}
        </div>
        <Button className="mt-4" onClick={handleAddStudent}>
          Add Student
        </Button>
      </div>

      <div className="glass-effect p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Students List</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              className="pl-10 w-64"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Courses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student: Student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    {student.faceData ? (
                      <img
                        src={student.faceData}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                    )}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.courses.length} courses</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
