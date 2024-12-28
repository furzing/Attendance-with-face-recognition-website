import { Button } from "@/components/ui/button";
import { FileText, Users, Bell, User, LifeBuoy, BookOpen, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const DashboardNav = () => {
  const location = useLocation();

  return (
    <nav className="bg-primary text-white sticky top-[73px] z-40 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 overflow-x-auto py-2">
          <Button
            variant="ghost"
            className={`text-white hover:bg-white/20 ${
              location.pathname === "/dashboard" ? "bg-white/20" : ""
            }`}
            asChild
          >
            <Link to="/dashboard">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`text-white hover:bg-white/20 ${
              location.pathname === "/reports" ? "bg-white/20" : ""
            }`}
            asChild
          >
            <Link to="/reports">
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`text-white hover:bg-white/20 ${
              location.pathname === "/students" ? "bg-white/20" : ""
            }`}
            asChild
          >
            <Link to="/students">
              <Users className="w-4 h-4 mr-2" />
              Students
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`text-white hover:bg-white/20 ${
              location.pathname === "/courses" ? "bg-white/20" : ""
            }`}
            asChild
          >
            <Link to="/courses">
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`text-white hover:bg-white/20 ${
              location.pathname === "/notifications" ? "bg-white/20" : ""
            }`}
            asChild
          >
            <Link to="/notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`text-white hover:bg-white/20 ${
              location.pathname === "/profile" ? "bg-white/20" : ""
            }`}
            asChild
          >
            <Link to="/profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
          </Button>
          <Button
            variant="ghost"
            className={`text-white hover:bg-white/20 ${
              location.pathname === "/support" ? "bg-white/20" : ""
            }`}
            asChild
          >
            <Link to="/support">
              <LifeBuoy className="w-4 h-4 mr-2" />
              Support
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};