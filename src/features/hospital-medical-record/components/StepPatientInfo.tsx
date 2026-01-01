import React from 'react';
import { Building2, User } from 'lucide-react';

interface PatientInfoValues {
    rightsHolder: string;
    patientName: string;
    region: string;
    invoiceType: string;
    countNo: string;
    multipleProviders: boolean;
    providerMain: string;
    providerOther: string;
    date: string;
    multipleCertificates: boolean;
    claimCode: string;
    claimNo: string;
}

interface PatientInfoChangeHandlers {
    setRightsHolder: (v: string) => void;
    setPatientName: (v: string) => void;
    setRegion: (v: string) => void;
    setInvoiceType: (v: string) => void;
    setCountNo: (v: string) => void;
    setMultipleProviders: (v: boolean) => void;
    setProviderMain: (v: string) => void;
    setProviderOther: (v: string) => void;
    setDate: (v: string) => void;
    setMultipleCertificates: (v: boolean) => void;
    setClaimCode: (v: string) => void;
    setClaimNo: (v: string) => void;
}

interface StepPatientInfoProps {
    values: PatientInfoValues;
    onChange: PatientInfoChangeHandlers;
    canContinue: boolean;
    onContinue: () => void;
}

export const StepPatientInfo: React.FC<StepPatientInfoProps> = ({
                                                                    values,
                                                                    onChange,
                                                                    canContinue,
                                                                    onContinue,
                                                                }) => {
    const {
        rightsHolder,
        patientName,
        region,
        invoiceType,
        countNo,
        multipleProviders,
        providerMain,
        providerOther,
        date,
        multipleCertificates,
        claimCode,
        claimNo,
    } = values;

    return (
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
                            onChange={(e) => onChange.setRightsHolder(e.target.value)}
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
                            onChange={(e) => onChange.setPatientName(e.target.value)}
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
                            onChange={(e) => onChange.setRegion(e.target.value)}
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
                            onChange={(e) => onChange.setInvoiceType(e.target.value)}
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
                            onChange={(e) => onChange.setCountNo(e.target.value)}
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
                            onChange={(e) => onChange.setDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={multipleProviders}
                                onChange={(e) => onChange.setMultipleProviders(e.target.checked)}
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
                            onChange={(e) => onChange.setProviderMain(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter provider name"
                        />
                        {multipleProviders && (
                            <input
                                value={providerOther}
                                onChange={(e) => onChange.setProviderOther(e.target.value)}
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
                                    onChange={(e) => onChange.setMultipleCertificates(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                  Multiple Certificates
                </span>
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Code</label>
                                <input
                                    value={claimCode}
                                    onChange={(e) => onChange.setClaimCode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Code"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">No</label>
                                <input
                                    value={claimNo}
                                    onChange={(e) => onChange.setClaimNo(e.target.value)}
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
                    onClick={onContinue}
                    disabled={!canContinue}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                        canContinue
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Continue to Services
                </button>
            </div>
        </div>
    );
};
