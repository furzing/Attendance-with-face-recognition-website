import { Button } from "@/components/ui/button";
import { UniversityLogo } from "@/components/UniversityLogo";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <UniversityLogo />
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-primary">Dr. Ahmad</span>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="hover:text-primary"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};