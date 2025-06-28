export type LoanStatus = 'New' | 'In Review' | 'Approved' | 'Renew';
export type LoanType = 'Home Loan' | 'Personal Loan' | 'Auto Loan';

export interface BorrowerPipelineItem {
    id: string;
    name: string;
    loan_type: LoanType;
    amount: number;
    status: LoanStatus;
}

export interface BorrowerDetail extends BorrowerPipelineItem {
    email: string;
    phone: string;
    loan_amount: number;
    employment: string;
    income: number;
    existing_loan: number;
    credit_score: number;
    source_of_funds: string;
    risk_signal?: string;
    ai_flags?: string[];
}

export interface PipelineResponse {
    new: BorrowerPipelineItem[];
    in_review: BorrowerPipelineItem[];
    approved: BorrowerPipelineItem[];
}