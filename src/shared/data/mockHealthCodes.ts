import {NomenclatureCode} from "@/shared/types/nomenclature-types";

export const mockNomenclatureCodes: NomenclatureCode[] = [
    {
        id: 'N001',
        code: '10105M',
        description: 'Consultation with a general physician with acquired rights in the consulting room weekdays',
        category: 'consultations',
        specialty: 'general',
        fee: 25.00,
        refund: {
            withSupplementedRefund: 21.25,
            withoutSupplementedRefund: 18.75,
            withSupplementedCoPayment: 0,
            withoutSupplementedCoPayment: 0,
        },
        coPayment: {
            withSupplementedRefund: 3.75,
            withoutSupplementedRefund: 6.25,
            withSupplementedCoPayment: 3.75,
            withoutSupplementedCoPayment: 6.25,
        },
        status: 'active',
        version: '1.0',
        effectiveDate: '2026-09-11',
        history: [
            {
                version: '1.0',
                date: '2026-09-11',
                changes: 'Initial rate setting for consultation services',
                user: 'System Admin',
            },
        ],
    },
    {
        id: 'N002',
        code: '15001M',
        description: 'Consultative physiotherapy examination of the patient',
        category: 'examinations',
        specialty: 'physiotherapy',
        fee: 30.00,
        refund: {
            withSupplementedRefund: 25.50,
            withoutSupplementedRefund: 22.50,
            withSupplementedCoPayment: 0,
            withoutSupplementedCoPayment: 0,
        },
        coPayment: {
            withSupplementedRefund: 4.50,
            withoutSupplementedRefund: 7.50,
            withSupplementedCoPayment: 4.50,
            withoutSupplementedCoPayment: 7.50,
        },
        status: 'active',
        version: '1.0',
        effectiveDate: '2026-09-11',
        history: [
            {
                version: '1.0',
                date: '2026-09-11',
                changes: 'Initial rate setting for physiotherapy examination',
                user: 'System Admin',
            },
        ],
    },
    {
        id: 'N003',
        code: '15002M',
        description: 'Individual physiotherapy session in which the personal involvement of the physiotherapist has an overall average duration of 45 minutes per person entitled',
        category: 'therapy',
        specialty: 'physiotherapy',
        fee: 45.00,
        refund: {
            withSupplementedRefund: 38.25,
            withoutSupplementedRefund: 33.75,
            withSupplementedCoPayment: 0,
            withoutSupplementedCoPayment: 0,
        },
        coPayment: {
            withSupplementedRefund: 6.75,
            withoutSupplementedRefund: 11.25,
            withSupplementedCoPayment: 6.75,
            withoutSupplementedCoPayment: 11.25,
        },
        status: 'active',
        version: '1.1',
        effectiveDate: '2026-09-11',
        history: [
            {
                version: '1.1',
                date: '2024-11-20',
                changes: 'Updated duration requirements and fee structure',
                user: 'Physiotherapy Board',
            },
            {
                version: '1.0',
                date: '2026-09-11',
                changes: 'Initial rate setting',
                user: 'System Admin',
            },
        ],
    },
    {
        id: 'N004',
        code: '18117M',
        description: 'Consultation in the consulting room by an accredited specialist physician in pediatrics, including any possible written report to the treating doctor',
        category: 'consultations',
        specialty: 'pediatrics',
        fee: 40.00,
        refund: {
            withSupplementedRefund: 34.00,
            withoutSupplementedRefund: 30.00,
            withSupplementedCoPayment: 0,
            withoutSupplementedCoPayment: 0,
        },
        coPayment: {
            withSupplementedRefund: 6.00,
            withoutSupplementedRefund: 10.00,
            withSupplementedCoPayment: 6.00,
            withoutSupplementedCoPayment: 10.00,
        },
        status: 'active',
        version: '1.0',
        effectiveDate: '2026-09-11',
        history: [
            {
                version: '1.0',
                date: '2026-09-11',
                changes: 'Initial rate setting for pediatric consultations',
                user: 'Pediatric Board',
            },
        ],
        notes: 'Includes written report if required',
    },
    {
        id: 'N005',
        code: '19118Q',
        description: 'Consultation in the office by an accredited medical specialist in cardiology, including a possible written report to the attending physician',
        category: 'consultations',
        specialty: 'cardiology',
        fee: 50.00,
        refund: {
            withSupplementedRefund: 42.50,
            withoutSupplementedRefund: 37.50,
            withSupplementedCoPayment: 0,
            withoutSupplementedCoPayment: 0,
        },
        coPayment: {
            withSupplementedRefund: 7.50,
            withoutSupplementedRefund: 12.50,
            withSupplementedCoPayment: 7.50,
            withoutSupplementedCoPayment: 12.50,
        },
        status: 'active',
        version: '1.2',
        effectiveDate: '2026-09-11',
        history: [
            {
                version: '1.2',
                date: '2024-11-15',
                changes: 'Updated fee structure based on market analysis',
                user: 'Cardiology Dept',
            },
            {
                version: '1.1',
                date: '2024-08-10',
                changes: 'Clarified reporting requirements',
                user: 'Admin Team',
            },
            {
                version: '1.0',
                date: '2026-09-11',
                changes: 'Initial rate setting',
                user: 'System Admin',
            },
        ],
        notes: 'Report to attending physician optional',
    },
    {
        id: 'N006',
        code: '90119Q',
        description: 'Consultation in the examination room by an accredited medical specialist in gastroenterology, including any possible written report to the treating physician',
        category: 'consultations',
        specialty: 'gastroenterology',
        fee: 48.00,
        refund: {
            withSupplementedRefund: 40.80,
            withoutSupplementedRefund: 36.00,
            withSupplementedCoPayment: 0,
            withoutSupplementedCoPayment: 0,
        },
        coPayment: {
            withSupplementedRefund: 7.20,
            withoutSupplementedRefund: 12.00,
            withSupplementedCoPayment: 7.20,
            withoutSupplementedCoPayment: 12.00,
        },
        status: 'pending',
        version: '2.0',
        effectiveDate: '2026-09-11',
        history: [
            {
                version: '2.0',
                date: '2024-12-01',
                changes: 'Major revision pending approval - updated examination protocols',
                user: 'Gastroenterology Board',
            },
            {
                version: '1.5',
                date: '2024-06-20',
                changes: 'Minor fee adjustment',
                user: 'Finance Team',
            },
        ],
    },
    {
        id: 'N007',
        code: '90120T',
        description: 'Consultation in the office by an accredited medical specialist in pulmonology, including a mandatory written report to the attending physician',
        category: 'consultations',
        specialty: 'pulmonology',
        fee: 46.00,
        refund: {
            withSupplementedRefund: 39.10,
            withoutSupplementedRefund: 34.50,
            withSupplementedCoPayment: 0,
            withoutSupplementedCoPayment: 0,
        },
        coPayment: {
            withSupplementedRefund: 6.90,
            withoutSupplementedRefund: 11.50,
            withSupplementedCoPayment: 6.90,
            withoutSupplementedCoPayment: 11.50,
        },
        status: 'active',
        version: '1.0',
        effectiveDate: '2026-09-11',
        history: [
            {
                version: '1.0',
                date: '2026-09-11',
                changes: 'Initial rate setting for pulmonology consultations',
                user: 'Pulmonology Dept',
            },
        ],
        notes: 'Written report is mandatory',
    },
    {
        id: 'N008',
        code: '90121T',
        description: 'Consultation in the clinic by an accredited medical specialist in rheumatology, including a mandatory written report to the treating physician',
        category: 'consultations',
        specialty: 'rheumatology',
        fee: 44.00,
        refund: {
            withSupplementedRefund: 37.40,
            withoutSupplementedRefund: 33.00,
            withSupplementedCoPayment: 0,
            withoutSupplementedCoPayment: 0,
        },
        coPayment: {
            withSupplementedRefund: 6.60,
            withoutSupplementedRefund: 11.00,
            withSupplementedCoPayment: 6.60,
            withoutSupplementedCoPayment: 11.00,
        },
        status: 'active',
        version: '1.0',
        effectiveDate: '2026-09-11',
        history: [
            {
                version: '1.0',
                date: '2026-09-11',
                changes: 'Initial rate setting for rheumatology consultations',
                user: 'Rheumatology Dept',
            },
        ],
        notes: 'Written report to treating physician required',
    },
];

export const getCategoryCounts = () => {
    const counts: Record<string, number> = {
        consultations: 0,
        examinations: 0,
        procedures: 0,
        therapy: 0,
        diagnostics: 0,
    };

    mockNomenclatureCodes.forEach((code) => {
        if (counts.hasOwnProperty(code.category)) {
            counts[code.category]++;
        }
    });

    return counts;
};

export const getSpecialtyCounts = () => {
    const counts: Record<string, number> = {};

    mockNomenclatureCodes.forEach((code) => {
        if (code.specialty) {
            counts[code.specialty] = (counts[code.specialty] || 0) + 1;
        }
    });

    return counts;
};