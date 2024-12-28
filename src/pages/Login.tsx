import { UniversityLogo } from "@/components/UniversityLogo";
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="mb-8">
          <UniversityLogo />
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
            <p className="text-gray-600">Please login to continue</p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;