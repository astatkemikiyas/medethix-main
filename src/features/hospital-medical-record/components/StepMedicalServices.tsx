import React from 'react';
import { Calculator, FileText, Plus, Trash2 } from 'lucide-react';
import {NomenclatureCode} from "@/shared/types/nomenclature-types";
import {ServiceLine} from "@/shared/types/supplements/ServiceLine";
import {SupplementMode} from "@/shared/types/supplements/SupplementMode";

interface LineAmount {
    id: string;
    fee: number;
    refund: number;
    copay: number;
}

interface StepMedicalServicesProps {
    supplementMode: SupplementMode;
    onSupplementModeChange: (mode: SupplementMode) => void;
    serviceLines: ServiceLine[];
    addLine: () => void;
    removeLine: (id: string) => void;
    updateLine: (id: string, patch: Partial<ServiceLine>) => void;
    lineAmounts: LineAmount[];
    totals: { fee: number; refund: number; copay: number };
    mockNomenclatureCodes: NomenclatureCode[];
    canContinue: boolean;
    onBack: () => void;
    onContinue: () => void;
}

export const StepMedicalServices: React.FC<StepMedicalServicesProps> = ({
                                                                            supplementMode,
                                                                            onSupplementModeChange,
                                                                            serviceLines,
                                                                            addLine,
                                                                            removeLine,
                                                                            updateLine,
                                                                            lineAmounts,
                                                                            totals,
                                                                            mockNomenclatureCodes,
                                                                            canContinue,
                                                                            onBack,
                                                                            onContinue,
                                                                        }) => {
    return (
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
                                onClick={() => onSupplementModeChange('with')}
                                className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                                    supplementMode === 'with'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                With Supplement
                            </button>
                            <button
                                onClick={() => onSupplementModeChange('without')}
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
                        const amounts = lineAmounts.find((a) => a.id === line.id);
                        const code = mockNomenclatureCodes.find((c) => c.id === line.codeId);

                        return (
                            <div
                                key={line.id}
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                            >
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
                                                    onChange={(e) =>
                                                        updateLine(line.id, { codeId: e.target.value || null })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Select a code...</option>
                                                    {mockNomenclatureCodes.map((c) => (
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
                                                    onChange={(e) =>
                                                        updateLine(line.id, {
                                                            quantity: Math.max(1, Number(e.target.value)),
                                                        })
                                                    }
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
                                                    {code.specialty && (
                                                        <>
                                                            {' '}
                                                            • <span className="font-semibold">Specialty:</span>{' '}
                                                            {code.specialty}
                                                        </>
                                                    )}
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
                        <p className="text-2xl font-bold text-gray-900">
                            €{totals.fee.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                        <p className="text-xs text-gray-600 mb-1">Total Refund (CBHI)</p>
                        <p className="text-2xl font-bold text-green-700">
                            €{totals.refund.toFixed(2)}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                        <p className="text-xs text-gray-600 mb-1">Total Co-payment</p>
                        <p className="text-2xl font-bold text-orange-700">
                            €{totals.copay.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Back to Patient Info
                </button>
                <button
                    onClick={onContinue}
                    disabled={!canContinue}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                        canContinue
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Continue to Review
                </button>
            </div>
        </div>
    );
};
