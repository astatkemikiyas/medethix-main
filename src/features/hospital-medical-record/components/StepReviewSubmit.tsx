import React from 'react';
import {
    AlertCircle,
    Calculator,
    CheckCircle2,
    FileText,
    Info,
    User,
} from 'lucide-react';
import {SupplementMode} from "@/shared/types/supplements/SupplementMode";
import {ServiceLine} from "@/shared/types/supplements/ServiceLine";
import {NomenclatureCode} from "@/shared/types/nomenclature-types";

interface LineAmount {
    id: string;
    fee: number;
    refund: number;
    copay: number;
}

interface PatientSummaryData {
    rightsHolder: string;
    patientName: string;
    region: string;
    invoiceType: string;
    providerMain: string;
    date: string;
}

interface StepReviewSubmitProps {
    patientData: PatientSummaryData;
    supplementMode: SupplementMode;
    serviceLines: ServiceLine[];
    lineAmounts: LineAmount[];
    totals: { fee: number; refund: number; copay: number };
    getCode: (codeId: string | null) => NomenclatureCode | undefined;
    isSaving: boolean;
    onSave: () => void;
    onBack: () => void;
}

export const StepReviewSubmit: React.FC<StepReviewSubmitProps> = ({
                                                                      patientData,
                                                                      supplementMode,
                                                                      serviceLines,
                                                                      lineAmounts,
                                                                      totals,
                                                                      getCode,
                                                                      isSaving,
                                                                      onSave,
                                                                      onBack,
                                                                  }) => {
    const diff = totals.fee - (totals.refund + totals.copay);
    const amountsBalanced = Math.abs(diff) < 0.01;

    return (
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
                        <p className="font-medium text-gray-900">
                            {patientData.rightsHolder || '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Patient Name</p>
                        <p className="font-medium text-gray-900">
                            {patientData.patientName || '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Date</p>
                        <p className="font-medium text-gray-900">
                            {new Date(patientData.date).toLocaleDateString('en-GB')}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Region</p>
                        <p className="font-medium text-gray-900">
                            {patientData.region || '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Invoice Type</p>
                        <p className="font-medium text-gray-900">
                            {patientData.invoiceType || '—'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Provider</p>
                        <p className="font-medium text-gray-900">
                            {patientData.providerMain || '—'}
                        </p>
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
                    {serviceLines
                        .filter((l) => l.codeId)
                        .map((line, idx) => {
                            const code = getCode(line.codeId);
                            const amounts = lineAmounts.find((a) => a.id === line.id);
                            if (!code) return null;

                            return (
                                <div
                                    key={line.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
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
            Refund mode:{' '}
                        <span className="font-semibold">
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
                                <span className="font-semibold text-gray-900">
                  €{totals.fee.toFixed(2)}
                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Invoiced Amount (Patient + CBHI)
                </span>
                                <span className="font-semibold text-gray-900">
                  €{totals.fee.toFixed(2)}
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                            <h4 className="text-sm font-semibold text-green-900 mb-3">
                                Insurance (CBHI)
                            </h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-700">CBHI Refund</span>
                                    <span className="font-semibold text-green-900">
                    €{totals.refund.toFixed(2)}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                            <h4 className="text-sm font-semibold text-orange-900 mb-3">
                                Patient Responsibility
                            </h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-orange-700">Co-payment</span>
                                    <span className="font-semibold text-orange-900">
                    €{totals.copay.toFixed(2)}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                        <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-blue-900">
                Sum of Accepted Amount
              </span>
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
                                <span className="font-semibold text-gray-900">
                  €{totals.fee.toFixed(2)}
                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Sum of Accepted Amount</span>
                                <span className="font-semibold text-gray-900">
                  €{(totals.refund + totals.copay).toFixed(2)}
                </span>
                            </div>
                            <div className="pt-2 border-t border-gray-300 flex justify-between">
                                <span className="text-sm font-semibold text-gray-700">Difference</span>
                                <span
                                    className={`font-bold ${
                                        amountsBalanced ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                  €{diff.toFixed(2)}
                </span>
                            </div>
                        </div>
                    </div>

                    {amountsBalanced ? (
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
                    onClick={onBack}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    Back to Services
                </button>
                <button
                    onClick={onSave}
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
                            <Calculator className="w-4 h-4" />
                            Save Record
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
