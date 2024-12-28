import { UniversityLogo } from "@/components/UniversityLogo";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/lovable-uploads/b6603e61-2682-4524-8ac8-f340e0e27540.png')] bg-cover bg-center">
      <Card className="w-full max-w-4xl p-8 glass-effect">
        <div className="flex flex-col items-center space-y-8">
          <UniversityLogo />
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">Welcome to JUST</h1>
            <p className="text-gray-600">Facial Recognition Attendance System</p>
            <p className="text-gray-500 italic">Efficient and Secure Attendance Tracking</p>
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold text-primary text-center mb-6">Login</h2>
            <p className="text-center mb-8 text-gray-600">You are?</p>
            
            <div className="grid grid-cols-2 gap-8">
              <button
                onClick={() => navigate('/login/admin')}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/50 transition-colors"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-lg font-medium">Admin</span>
              </button>

              <button
                onClick={() => navigate('/login/lecturer')}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/50 transition-colors"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-lg font-medium">Lecturer</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;