import React, { useState } from 'react';
import {
    Menu,
    X,
    FileText,
    Users,
    CreditCard,
    Settings,
    LogOut,
    ChevronDown,
} from 'lucide-react';
interface HeaderPageProps {
    onLogout: () => void;
}
export const Header: React.FC<HeaderPageProps> = ({onLogout}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        if (onLogout) onLogout();
    };
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Title */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">MedEthiX</h1>
                                <p className="text-xs text-gray-500">Medical Claims Management</p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-1">
                        <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Records
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Patients
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Billing
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <button className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                            <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-blue-700">JD</span>
                            </div>
                            <span className="font-medium">Dr. Jane Doe</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-4 py-3 space-y-1">
                        <button className="w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Records
                        </button>
                        <button className="w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Patients
                        </button>
                        <button className="w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Billing
                        </button>
                        <button className="w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                        <button onClick={handleLogout} className="w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};
