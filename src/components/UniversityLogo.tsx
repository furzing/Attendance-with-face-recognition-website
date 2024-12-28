export const UniversityLogo = () => {
  return (
    <div className="flex items-center justify-center space-x-4 hover-effect">
      <div className="w-16 h-16">
        <img 
          src="/lovable-uploads/f976b7e7-f2db-4b33-9875-e03861188075.png" 
          alt="JUST Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-left">
        <h1 className="text-xl font-bold text-primary">JUST</h1>
        <p className="text-sm text-gray-600">Jordan University of Science & Technology</p>
      </div>
    </div>
  );
};