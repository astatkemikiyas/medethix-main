'use client';

import React, { useMemo, useState } from 'react';
import {
    Menu, X, Save, FileText, Users, CreditCard, Settings,
    LogOut, ChevronDown, Plus, Trash2, Calculator, Info,
    CheckCircle2, AlertCircle, User, Calendar, Building2
} from 'lucide-react';
import {mockNomenclatureCodes} from "@/shared/data/mockHealthCodes";
import {NomenclatureCode} from "@/shared/types/nomenclature-types";


type SupplementMode = 'with' | 'without';

interface ServiceLine {
    id: string;
    codeId: string | null;
    quantity: number;
}

const HospitalMedicalRecordPage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Patient & claim info
    const [rightsHolder, setRightsHolder] = useState('');
    const [patientName, setPatientName] = useState('');
    const [region, setRegion] = useState('');
    const [invoiceType, setInvoiceType] = useState('');
    const [countNo, setCountNo] = useState('');
    const [multipleProviders, setMultipleProviders] = useState(false);
    const [providerMain, setProviderMain] = useState('');
    const [providerOther, setProviderOther] = useState('');
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [multipleCertificates, setMultipleCertificates] = useState(false);
    const [claimCode, setClaimCode] = useState('');
    const [claimNo, setClaimNo] = useState('');

    // Medical services
    const [supplementMode, setSupplementMode] = useState<SupplementMode>('with');
    const [serviceLines, setServiceLines] = useState<ServiceLine[]>([
        { id: 'line-1', codeId: null, quantity: 1 }
    ]);

    const addLine = () => {
        setServiceLines(prev => [
            ...prev,
            { id: `line-${Date.now()}`, codeId: null, quantity: 1 }
        ]);
    };

    const removeLine = (id: string) => {
        setServiceLines(prev => prev.filter(l => l.id !== id));
    };

    const updateLine = (id: string, patch: Partial<ServiceLine>) => {
        setServiceLines(prev => prev.map(l => l.id === id ? { ...l, ...patch } : l));
    };

    const getCode = (codeId: string | null): NomenclatureCode | undefined =>
        codeId ? mockNomenclatureCodes.find(c => c.id === codeId) : undefined;

    // Calculations
    const lineAmounts = useMemo(() => {
        return serviceLines.map(line => {
            const code = getCode(line.codeId);
            if (!code) return { id: line.id, fee: 0, refund: 0, copay: 0 };

            const q = line.quantity || 0;
            const fee = code.fee * q;
            const refund = supplementMode === 'with'
                ? code.refund.withSupplementedRefund * q
                : code.refund.withoutSupplementedRefund * q;
            const copay = supplementMode === 'with'
                ? code.coPayment.withSupplementedCoPayment * q
                : code.coPayment.withoutSupplementedCoPayment * q;

            return { id: line.id, fee, refund, copay };
        });
    }, [serviceLines, supplementMode]);

    const totals = useMemo(
        () => lineAmounts.reduce(
            (acc, l) => {
                acc.fee += l.fee;
                acc.refund += l.refund;
                acc.copay += l.copay;
                return acc;
            },
            { fee: 0, refund: 0, copay: 0 }
        ),
        [lineAmounts]
    );

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const canProceed = (step: number): boolean => {
        if (step === 1) return !!(patientName && rightsHolder && date);
        if (step === 2) return serviceLines.some(l => l.codeId !== null);
        return true;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
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
                                onClick={() => setMenuOpen(!menuOpen)}
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
                            <button className="w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    {/* Progress Steps */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-semibold text-gray-900">New Medical Record</h2>
                            {saveSuccess && (
                                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Saved successfully
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            {[
                                { num: 1, label: 'Patient Info', icon: User },
                                { num: 2, label: 'Medical Services', icon: FileText },
                                { num: 3, label: 'Review & Submit', icon: Calculator }
                            ].map((step, idx) => (
                                <React.Fragment key={step.num}>
                                    <button
                                        onClick={() => setActiveStep(step.num as 1 | 2 | 3)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                            activeStep === step.num
                                                ? 'bg-blue-50 border-2 border-blue-600'
                                                : activeStep > step.num
                                                    ? 'bg-green-50 border-2 border-green-500 cursor-pointer hover:bg-green-100'
                                                    : 'bg-gray-50 border-2 border-gray-200 cursor-pointer hover:bg-gray-100'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            activeStep === step.num
                                                ? 'bg-blue-600 text-white'
                                                : activeStep > step.num
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-300 text-gray-600'
                                        }`}>
                                            {activeStep > step.num ? (
                                                <CheckCircle2 className="w-5 h-5" />
                                            ) : (
                                                <step.icon className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs text-gray-500">Step {step.num}</div>
                                            <div className={`text-sm font-medium ${
                                                activeStep === step.num ? 'text-blue-900' : 'text-gray-700'
                                            }`}>
                                                {step.label}
                                            </div>
                                        </div>
                                    </button>
                                    {idx < 2 && (
                                        <div className={`flex-1 h-0.5 ${
                                            activeStep > step.num ? 'bg-green-500' : 'bg-gray-200'
                                        }`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Step 1: Patient Information */}
                    {activeStep === 1 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <User className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Rights Holder *
                                        </label>
                                        <input
                                            value={rightsHolder}
                                            onChange={e => setRightsHolder(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter rights holder name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Patient Name *
                                        </label>
                                        <input
                                            value={patientName}
                                            onChange={e => setPatientName(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter patient name"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Region
                                        </label>
                                        <input
                                            value={region}
                                            onChange={e => setRegion(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter region"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Invoice Type
                                        </label>
                                        <select
                                            value={invoiceType}
                                            onChange={e => setInvoiceType(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select type</option>
                                            <option value="standard">Standard</option>
                                            <option value="emergency">Emergency</option>
                                            <option value="follow-up">Follow-up</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Count No
                                        </label>
                                        <input
                                            value={countNo}
                                            onChange={e => setCountNo(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="000000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={e => setDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={multipleProviders}
                                                onChange={e => setMultipleProviders(e.target.checked)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Multiple Providers</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Building2 className="w-4 h-4 inline mr-1" />
                                            Primary Provider
                                        </label>
                                        <input
                                            value={providerMain}
                                            onChange={e => setProviderMain(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter provider name"
                                        />
                                        {multipleProviders && (
                                            <input
                                                value={providerOther}
                                                onChange={e => setProviderOther(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                                                placeholder="Additional provider"
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={multipleCertificates}
                                                    onChange={e => setMultipleCertificates(e.target.checked)}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Multiple Certificates</span>
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Code</label>
                                                <input
                                                    value={claimCode}
                                                    onChange={e => setClaimCode(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Code"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">No</label>
                                                <input
                                                    value={claimNo}
                                                    onChange={e => setClaimNo(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => canProceed(1) && setActiveStep(2)}
                                    disabled={!canProceed(1)}
                                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                                        canProceed(1)
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Continue to Services
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Medical Services */}
                    {activeStep === 2 && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-lg font-semibold text-gray-900">Medical Services</h3>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-medium text-gray-700">Refund Mode:</span>
                                        <div className="inline-flex rounded-lg border border-gray-300 bg-white overflow-hidden">
                                            <button
                                                onClick={() => setSupplementMode('with')}
                                                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                                                    supplementMode === 'with'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                With Supplement
                                            </button>
                                            <button
                                                onClick={() => setSupplementMode('without')}
                                                className={`px-4 py-1.5 text-sm font-medium border-l border-gray-300 transition-colors ${
                                                    supplementMode === 'without'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            >
                                                Without
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {serviceLines.map((line, idx) => {
                                        const code = getCode(line.codeId);
                                        const amounts = lineAmounts.find(a => a.id === line.id);

                                        return (
                                            <div key={line.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                                                        {idx + 1}
                                                    </div>

                                                    <div className="flex-1 space-y-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                                            <div className="md:col-span-5">
                                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                    Nomenclature Code
                                                                </label>
                                                                <select
                                                                    value={line.codeId ?? ''}
                                                                    onChange={e => updateLine(line.id, { codeId: e.target.value || null })}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                                >
                                                                    <option value="">Select a code...</option>
                                                                    {mockNomenclatureCodes.map(c => (
                                                                        <option key={c.id} value={c.id}>
                                                                            {c.code} - {c.description}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="md:col-span-2">
                                                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                    Quantity
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min={1}
                                                                    value={line.quantity}
                                                                    onChange={e => updateLine(line.id, {
                                                                        quantity: Math.max(1, Number(e.target.value))
                                                                    })}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                />
                                                            </div>

                                                            <div className="md:col-span-5 grid grid-cols-3 gap-3">
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                        Fee
                                                                    </label>
                                                                    <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900">
                                                                        €{amounts?.fee.toFixed(2) ?? '0.00'}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                        Refund
                                                                    </label>
                                                                    <div className="px-3 py-2 bg-green-50 border border-green-300 rounded-lg text-sm font-semibold text-green-700">
                                                                        €{amounts?.refund.toFixed(2) ?? '0.00'}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                        Co-pay
                                                                    </label>
                                                                    <div className="px-3 py-2 bg-orange-50 border border-orange-300 rounded-lg text-sm font-semibold text-orange-700">
                                                                        €{amounts?.copay.toFixed(2) ?? '0.00'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {code && (
                                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                                <p className="text-xs text-blue-900">
                                                                    <span className="font-semibold">Category:</span> {code.category}
                                                                    {code.specialty && <> • <span className="font-semibold">Specialty:</span> {code.specialty}</>}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={() => removeLine(line.id)}
                                                        className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={addLine}
                                    className="mt-4 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Another Service
                                </button>
                            </div>

                            {/* Quick Summary */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Calculator className="w-4 h-4 text-blue-600" />
                                    Current Totals
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                        <p className="text-xs text-gray-600 mb-1">Total Fee</p>
                                        <p className="text-2xl font-bold text-gray-900">€{totals.fee.toFixed(2)}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-green-200">
                                        <p className="text-xs text-gray-600 mb-1">Total Refund (CBHI)</p>
                                        <p className="text-2xl font-bold text-green-700">€{totals.refund.toFixed(2)}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                                        <p className="text-xs text-gray-600 mb-1">Total Co-payment</p>
                                        <p className="text-2xl font-bold text-orange-700">€{totals.copay.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setActiveStep(1)}
                                    className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Back to Patient Info
                                </button>
                                <button
                                    onClick={() => canProceed(2) && setActiveStep(3)}
                                    disabled={!canProceed(2)}
                                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                                        canProceed(2)
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Continue to Review
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review & Submit */}
                    {activeStep === 3 && (
                        <div className="space-y-6">
                            {/* Patient Summary */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Patient Summary
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Rights Holder</p>
                                        <p className="font-medium text-gray-900">{rightsHolder || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Patient Name</p>
                                        <p className="font-medium text-gray-900">{patientName || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Date</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(date).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Region</p>
                                        <p className="font-medium text-gray-900">{region || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Invoice Type</p>
                                        <p className="font-medium text-gray-900">{invoiceType || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Provider</p>
                                        <p className="font-medium text-gray-900">{providerMain || '—'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Services Summary */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    Medical Services Summary
                                </h3>
                                <div className="space-y-2 mb-4">
                                    {serviceLines.filter(l => l.codeId).map((line, idx) => {
                                        const code = getCode(line.codeId);
                                        const amounts = lineAmounts.find(a => a.id === line.id);
                                        if (!code) return null;

                                        return (
                                            <div key={line.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold">
                            {idx + 1}
                          </span>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">
                                                            {code.code} - {code.description}
                                                        </p>
                                                        <p className="text-xs text-gray-500">Quantity: {line.quantity}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        €{amounts?.fee.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Info className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-700">
                    Refund mode: <span className="font-semibold">
                      {supplementMode === 'with' ? 'With Supplement' : 'Without Supplement'}
                    </span>
                  </span>
                                </div>
                            </div>

                            {/* Financial Summary */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-blue-600" />
                                    Financial Summary
                                </h3>

                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Amounts</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Communicated Amount</span>
                                                <span className="font-semibold text-gray-900">€{totals.fee.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Invoiced Amount (Patient + CBHI)</span>
                                                <span className="font-semibold text-gray-900">€{totals.fee.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                            <h4 className="text-sm font-semibold text-green-900 mb-3">Insurance (CBHI)</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-green-700">CBHI Refund</span>
                                                    <span className="font-semibold text-green-900">€{totals.refund.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                            <h4 className="text-sm font-semibold text-orange-900 mb-3">Patient Responsibility</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-orange-700">Co-payment</span>
                                                    <span className="font-semibold text-orange-900">€{totals.copay.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-semibold text-blue-900">Sum of Accepted Amount</span>
                                            <span className="text-xl font-bold text-blue-900">
                        €{(totals.refund + totals.copay).toFixed(2)}
                      </span>
                                        </div>
                                        <p className="text-xs text-blue-700 mt-1">Patient + CBHI accepted</p>
                                    </div>

                                    <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Invoice Amount</span>
                                                <span className="font-semibold text-gray-900">€{totals.fee.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Sum of Accepted Amount</span>
                                                <span className="font-semibold text-gray-900">€{(totals.refund + totals.copay).toFixed(2)}</span>
                                            </div>
                                            <div className="pt-2 border-t border-gray-300 flex justify-between">
                                                <span className="text-sm font-semibold text-gray-700">Difference</span>
                                                <span className={`font-bold ${
                                                    Math.abs(totals.fee - (totals.refund + totals.copay)) < 0.01
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}>
                          €{(totals.fee - (totals.refund + totals.copay)).toFixed(2)}
                        </span>
                                            </div>
                                        </div>
                                    </div>

                                    {Math.abs(totals.fee - (totals.refund + totals.copay)) < 0.01 ? (
                                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Amounts are balanced and ready for submission</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>There is a difference between invoice and accepted amounts</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setActiveStep(2)}
                                    className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Back to Services
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-8 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Record
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <p className="text-xs text-center text-gray-500">
                        MedEthiX © 2025 • Medical Claims Management System
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HospitalMedicalRecordPage;