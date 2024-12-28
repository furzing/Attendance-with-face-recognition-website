import { Card, CardContent } from "@/components/ui/card";
import { UserCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleRoleSelect('admin')}
      >
        <CardContent className="flex flex-col items-center justify-center p-6">
          <UserCircle className="w-20 h-20 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Admin</h3>
        </CardContent>
      </Card>

      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => handleRoleSelect('lecturer')}
      >
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Users className="w-20 h-20 text-primary mb-4" />
          <h3 className="text-xl font-semibold">Lecturer</h3>
        </CardContent>
      </Card>
    </div>
  );
};