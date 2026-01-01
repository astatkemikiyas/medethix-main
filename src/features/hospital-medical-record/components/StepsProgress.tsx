import React from 'react';
import { User, FileText, Calculator, CheckCircle2 } from 'lucide-react';

interface StepsProgressProps {
    activeStep: 1 | 2 | 3;
    onStepChange: (step: 1 | 2 | 3) => void;
    saveSuccess: boolean;
}

const steps = [
    { num: 1 as const, label: 'Patient Info', icon: User },
    { num: 2 as const, label: 'Medical Services', icon: FileText },
    { num: 3 as const, label: 'Review & Submit', icon: Calculator },
];

export const StepsProgress: React.FC<StepsProgressProps> = ({
                                                                activeStep,
                                                                onStepChange,
                                                                saveSuccess,
                                                            }) => {
    return (
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
                {steps.map((step, idx) => (
                    <React.Fragment key={step.num}>
                        <button
                            onClick={() => onStepChange(step.num)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                activeStep === step.num
                                    ? 'bg-blue-50 border-2 border-blue-600'
                                    : activeStep > step.num
                                        ? 'bg-green-50 border-2 border-green-500 cursor-pointer hover:bg-green-100'
                                        : 'bg-gray-50 border-2 border-gray-200 cursor-pointer hover:bg-gray-100'
                            }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    activeStep === step.num
                                        ? 'bg-blue-600 text-white'
                                        : activeStep > step.num
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                }`}
                            >
                                {activeStep > step.num ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                    <step.icon className="w-4 h-4" />
                                )}
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-gray-500">Step {step.num}</div>
                                <div
                                    className={`text-sm font-medium ${
                                        activeStep === step.num ? 'text-blue-900' : 'text-gray-700'
                                    }`}
                                >
                                    {step.label}
                                </div>
                            </div>
                        </button>
                        {idx < steps.length - 1 && (
                            <div
                                className={`flex-1 h-0.5 ${
                                    activeStep > step.num ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
