export type LoanStatus = 'New' | 'In Review' | 'Approved' | 'Renew';
export type LoanType = 'Home Loan' | 'Personal Loan' | 'Auto Loan' | 'Investment Loan';

export interface BorrowerBase {
    id: string;
    name: string;
    loan_type: LoanType;
    status: LoanStatus;
}

export interface BorrowerPipelineItem extends BorrowerBase{
    amount: number;

}

export interface BorrowerDetail extends BorrowerBase {
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

export interface Broker {
    name: string;
    deals: number;
    approval_rate: string;
    pending: number;
}

export interface WorkflowStep {
    id: number;
    title: string;
    completed: boolean;
}

export interface PipelineResponse {
    new: BorrowerPipelineItem[];
    in_review: BorrowerPipelineItem[];
    approved: BorrowerPipelineItem[];
}

export interface BorrowerPipelineData {
    new: BorrowerPipelineItem[];
    in_review: BorrowerPipelineItem[];
    approved: BorrowerPipelineItem[];
}