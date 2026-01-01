'use client';

import { useState } from 'react';
import { Lock, User, FileText, Mail } from 'lucide-react';

// Cookie utilities
const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

// Login component for Medical Record Portal
const MedicalRecordLogin = ({ onLogin }: { onLogin: () => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setError('');
        setIsLoading(true);

        // Simulate authentication (replace with real API call)
        setTimeout(() => {
            if (username.toLowerCase() === 'user' && password === 'password') {
                // Generate a simple token (in production, use a proper JWT from your backend)
                const token = btoa(`${username}:${Date.now()}`);
                setCookie('medrecord_auth', token, 7); // Expires in 7 days
                onLogin();
            } else {
                setError('Invalid username or password');
                setIsLoading(false);
            }
        }, 800);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && username && password) {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-sm">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">MedEthiX</h1>
                    <p className="text-gray-600">Medical Claims Management</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                            Sign In
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Access your medical records portal
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                <span className="text-red-500 font-bold">✕</span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading || !username || !password}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-700 font-semibold mb-2">Demo Credentials:</p>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-600">
                                Username: <span className="font-mono font-semibold text-gray-900">user</span>
                            </p>
                            <p className="text-xs text-gray-600">
                                Password: <span className="font-mono font-semibold text-gray-900">password</span>
                            </p>
                        </div>
                    </div>

                    {/* Help Link */}
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2 mx-auto transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            Need help? Contact support
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        MedEthiX © 2025 • Version 1.0.0
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        For hospitals and insurance providers
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecordLogin;