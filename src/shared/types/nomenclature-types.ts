export interface HistoryEntry {
    version: string;
    date: string;
    changes: string;
    user: string;
}

export type Status = 'active' | 'pending' | 'review' | 'inactive';

// Payment configuration for different scenarios
export interface PaymentConfig {
    withSupplementedRefund: number;
    withoutSupplementedRefund: number;
    withSupplementedCoPayment: number;
    withoutSupplementedCoPayment: number;
}

// Main nomenclature code interface matching the Excel structure
export interface NomenclatureCode {
    id: string;
    code: string; // e.g., "10105M", "15001M"
    description: string; // Full description of the medical service
    category: string; // e.g., "Consultation", "Physiotherapy", "Specialist"
    specialty?: string; // e.g., "Pediatrics", "Cardiology", "Gastroenterology"
    fee: number; // Base fee amount
    refund: PaymentConfig; // Refund amounts for different scenarios
    coPayment: PaymentConfig; // Co-payment amounts for different scenarios
    status: Status;
    version: string;
    effectiveDate: string; // e.g., "Rate 11-09-2026"
    history: HistoryEntry[];
    notes?: string; // Additional notes or requirements
}

export interface FormData {
    code: string;
    description: string;
    category: string;
    specialty?: string;
    fee: number;
    refund: PaymentConfig;
    coPayment: PaymentConfig;
    status: Status;
    effectiveDate: string;
    notes?: string;
}

export type TabType = 'dashboard' | 'codes' | 'rates';
export type CategoryType =
    | 'consultations'
    | 'examinations'
    | 'procedures'
    | 'therapy'
    | 'diagnostics'
    | 'all';

export type SpecialtyType =
    | 'general'
    | 'pediatrics'
    | 'cardiology'
    | 'gastroenterology'
    | 'pulmonology'
    | 'rheumatology'
    | 'physiotherapy'
    | 'all';

export interface Stats {
    totalCodes: number;
    activeCodes: number;
    pendingCodes: number;
    updatedThisMonth: number;
    totalFeeValue: number;
    averageFee: number;
}
