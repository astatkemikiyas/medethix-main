"use client";

import HealthCodesPage from "@/features/health-codes/components/HealthCodesPage";
import {useEffect, useState} from "react";
import LoginPage from "@/features/auth/Login";
import HospitalMedicalRecordPage from "@/app/hospital-medical-record/page";

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};


// Main component with auth logic
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token
    const token = getCookie('medethix_auth');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    deleteCookie('medethix_auth');
    setIsAuthenticated(false);
  };

  // Show loading state briefly
  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
    );
  }

  // Show login or main app based on auth state
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <HospitalMedicalRecordPage onLogout={handleLogout} />;
}