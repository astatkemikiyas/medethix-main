'use client';

import React, { useMemo, useState } from 'react';
import { mockNomenclatureCodes } from '@/shared/data/mockHealthCodes';

import { StepsProgress } from '@/features/hospital-medical-record/components/StepsProgress';
import { StepPatientInfo } from '@/features/hospital-medical-record/components/StepPatientInfo';
import { StepMedicalServices } from '@/features/hospital-medical-record/components/StepMedicalServices';
import { StepReviewSubmit } from '@/features/hospital-medical-record/components/StepReviewSubmit';
import {SupplementMode} from "@/shared/types/supplements/SupplementMode";
import {ServiceLine} from "@/shared/types/supplements/ServiceLine";
import {NomenclatureCode} from "@/shared/types/nomenclature-types";
import {Header} from "@/shared/components/layout/Header";
import {Footer} from "@/shared/components/layout/Footer";
interface HospitalMedicalRecordPageProps {
    onLogout: () => void;
}
const HospitalMedicalRecordPage: React.FC<HospitalMedicalRecordPageProps> = ({ onLogout }) => {
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
        { id: 'line-1', codeId: null, quantity: 1 },
    ]);

    const getCode = (codeId: string | null): NomenclatureCode | undefined =>
        codeId ? mockNomenclatureCodes.find((c) => c.id === codeId) : undefined;

    // Calculations
    const lineAmounts = useMemo(() => {
        return serviceLines.map((line) => {
            const code = getCode(line.codeId);
            if (!code) return { id: line.id, fee: 0, refund: 0, copay: 0 };

            const q = line.quantity || 0;
            const fee = code.fee * q;
            const refund =
                supplementMode === 'with'
                    ? code.refund.withSupplementedRefund * q
                    : code.refund.withoutSupplementedRefund * q;
            const copay =
                supplementMode === 'with'
                    ? code.coPayment.withSupplementedCoPayment * q
                    : code.coPayment.withoutSupplementedCoPayment * q;

            return { id: line.id, fee, refund, copay };
        });
    }, [serviceLines, supplementMode]);

    const totals = useMemo(
        () =>
            lineAmounts.reduce(
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

    // Line operations
    const addLine = () => {
        setServiceLines((prev) => [
            ...prev,
            { id: `line-${Date.now()}`, codeId: null, quantity: 1 },
        ]);
    };

    const removeLine = (id: string) => {
        setServiceLines((prev) => prev.filter((l) => l.id !== id));
    };

    const updateLine = (id: string, patch: Partial<ServiceLine>) => {
        setServiceLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    };

    // Step guards (booleans instead of string trick)
    const canProceedFromStep1 = Boolean(patientName && rightsHolder && date);
    const canProceedFromStep2 = serviceLines.some((l) => l.codeId !== null);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onLogout={onLogout} />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    {/* Steps header */}
                    <StepsProgress
                        activeStep={activeStep}
                        onStepChange={setActiveStep}
                        saveSuccess={saveSuccess}
                    />

                    {/* Step 1 */}
                    {activeStep === 1 && (
                        <StepPatientInfo
                            values={{
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
                            }}
                            onChange={{
                                setRightsHolder,
                                setPatientName,
                                setRegion,
                                setInvoiceType,
                                setCountNo,
                                setMultipleProviders,
                                setProviderMain,
                                setProviderOther,
                                setDate,
                                setMultipleCertificates,
                                setClaimCode,
                                setClaimNo,
                            }}
                            canContinue={canProceedFromStep1}
                            onContinue={() => canProceedFromStep1 && setActiveStep(2)}
                        />
                    )}

                    {/* Step 2 */}
                    {activeStep === 2 && (
                        <StepMedicalServices
                            supplementMode={supplementMode}
                            onSupplementModeChange={setSupplementMode}
                            serviceLines={serviceLines}
                            addLine={addLine}
                            removeLine={removeLine}
                            updateLine={updateLine}
                            lineAmounts={lineAmounts}
                            totals={totals}
                            mockNomenclatureCodes={mockNomenclatureCodes}
                            canContinue={canProceedFromStep2}
                            onBack={() => setActiveStep(1)}
                            onContinue={() => canProceedFromStep2 && setActiveStep(3)}
                        />
                    )}

                    {/* Step 3 */}
                    {activeStep === 3 && (
                        <StepReviewSubmit
                            patientData={{
                                rightsHolder,
                                patientName,
                                region,
                                invoiceType,
                                providerMain,
                                date,
                            }}
                            supplementMode={supplementMode}
                            serviceLines={serviceLines}
                            lineAmounts={lineAmounts}
                            totals={totals}
                            getCode={getCode}
                            isSaving={isSaving}
                            onSave={handleSave}
                            onBack={() => setActiveStep(2)}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HospitalMedicalRecordPage;
