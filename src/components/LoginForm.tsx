import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/utils/mockDatabase";

export const LoginForm = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call to authenticate
      // For now, we'll simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store user info in localStorage (in a real app, use proper auth tokens)
      localStorage.setItem('userRole', role || '');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('isAuthenticated', 'true');

      toast({
        title: "Login Successful",
        description: `Welcome back, ${formData.email}!`,
      });

      // Redirect based on role
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-effect">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {role === 'admin' ? 'Admin Login' : 'Lecturer Login'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-white/50"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="bg-white/50"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full button-hover"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="text-sm text-center space-x-4 mt-4">
            <a href="#" className="text-primary hover:underline">
              Forgot your Password?
            </a>
            <a href="#" className="text-primary hover:underline">
              Contact Support
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};