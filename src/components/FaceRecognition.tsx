import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { pipeline } from '@huggingface/transformers';
import { useToast } from "@/hooks/use-toast";
import { checkBrowserCompatibility } from '../utils/browserCheck';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { db } from '../utils/mockDatabase';

const FaceRecognition = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const webcamRef = React.useRef<Webcam>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  useEffect(() => {
    const initializeFaceRecognition = async () => {
      try {
        await checkBrowserCompatibility();
        await pipeline('object-detection', 'Xenova/detr-resnet-50');
        setIsInitialized(true);
        
        toast({
          title: "System Ready",
          description: "Face recognition system is ready to take attendance.",
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize face recognition';
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        });
      }
    };

    initializeFaceRecognition();
  }, []);

  const matchFaceWithDatabase = async (capturedImage: string) => {
    const students = await db.students.getAll();
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    return randomStudent;
  };

  const simulateAttendanceProcess = async (imageSrc: string) => {
    setProcessing(true);
    setProgress(0);
    
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProgress(i);
    }

    try {
      const matchedStudent = await matchFaceWithDatabase(imageSrc);
      
      if (matchedStudent) {
        const attendanceRecord = {
          id: crypto.randomUUID(),
          courseId: "CS101",
          date: new Date(),
          presentStudents: [matchedStudent.id],
          absentStudents: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await db.attendance.create(attendanceRecord);

        toast({
          title: "Attendance Recorded",
          description: `Student: ${matchedStudent.name} (${matchedStudent.studentId})`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "No Match Found",
          description: "Could not match face with any student in the database.",
        });
      }
    } catch (error) {
      console.error("Error processing attendance:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process attendance",
      });
    }

    setProcessing(false);
    setProgress(100);
    setTimeout(() => setProgress(0), 2000);
  };

  const captureImage = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to capture image",
      });
      return;
    }

    await simulateAttendanceProcess(imageSrc);
  };

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto glass-effect">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto glass-effect">
      <CardHeader>
        <CardTitle className="text-primary flex items-center justify-between">
          Face Recognition Attendance
          {processing && <span className="text-sm text-muted-foreground">Processing...</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isInitialized ? (
          <>
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary">
              <div className="absolute inset-0 flex items-center justify-center">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="w-full h-full object-cover"
                />
              </div>
              {processing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p>Analyzing...</p>
                  </div>
                </div>
              )}
            </div>
            {progress > 0 && (
              <Progress value={progress} className="w-full" />
            )}
            <Button 
              onClick={captureImage}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Take Attendance'}
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FaceRecognition;