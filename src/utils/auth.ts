// Auth types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'lecturer';
  name: string;
}

// Auth utilities
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const getCurrentUser = (): User | null => {
  const email = localStorage.getItem('userEmail');
  const role = localStorage.getItem('userRole') as 'admin' | 'lecturer';
  
  if (!email || !role) return null;
  
  return {
    id: '1', // In a real app, this would come from your backend
    email,
    role,
    name: email.split('@')[0], // Simple name extraction, in real app would come from backend
  };
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
  window.location.href = '/';
};