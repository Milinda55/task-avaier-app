export interface ApiResponse<T> {
    message: any;
    data?: T;
    error?: {
        code: number;
        message: string;
    };
    success: boolean;
    timestamp?: string;
}

export interface DocumentRequestResponse {
    success: boolean;
    message: string;
}

export interface ValuerSubmissionResponse {
    success: boolean;
    message: string;
    valuer_id?: string;
}

export interface LoanApprovalResponse {
    success: boolean;
    message: string;
    approval_code?: string;
}

export interface EscalationResponse {
    success: boolean;
    message: string;
    committee_case_id?: string;
}


export interface RequestDocumentsParams {
    borrower_id: string;
    document_types: string[];
}

export interface ApproveLoanParams {
    borrower_id: string;
    officer_id: string;
    terms: {
        amount: number;
        interest_rate: number;
        term_months: number;
    };
}