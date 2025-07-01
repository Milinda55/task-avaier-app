import type {
    BorrowerPipelineItem,
    BorrowerDetail,
    Broker,
    LoanStatus,
    LoanType,
    WorkflowStep
} from '../types';

export const mockPipelineData = {
    new: [
        {
            id: "1",
            name: "Sarah Dunn",
            loan_type: "Home Loan" as LoanType,
            amount: 300000,
            status: "Renew" as LoanStatus
        },
        {
            id: "3",
            name: "Lisa Carter",
            loan_type: "Home Loan" as LoanType,
            amount: 450000,
            status: "New" as LoanStatus
        }
    ],
    in_review: [
        {
            id: "2",
            name: "Alan Matthews",
            loan_type: "Personal Loan" as LoanType,
            amount: 20000,
            status: "In Review" as LoanStatus
        }
    ],
    approved: [] as BorrowerPipelineItem[]
};

export const mockBorrowerDetails: Record<string, BorrowerDetail> = {
    "1": {
        id: "1",
        name: "Sarah Dunn",
        email: "sarah.dunn@example.com",
        phone: "(355)123-4557",
        loan_amount: 300000,
        loan_type: "Home Loan",
        status: "In Review",
        employment: "At Tech Company",
        income: 120000,
        existing_loan: 240000,
        credit_score: 720,
        source_of_funds: "Declared",
        risk_signal: "Missing Source of Funds declaration",
        ai_flags: [
            "Income Inconsistent with Bank statements",
            "High Debt-to-Income Ratio detected"
        ]
    },
    "2": {
        id: "2",
        name: "Alan Matthews",
        email: "alan.matthews@example.com",
        phone: "(355)987-6543",
        loan_amount: 20000,
        loan_type: "Personal Loan",
        status: "In Review",
        employment: "Self-Employed",
        income: 85000,
        existing_loan: 15000,
        credit_score: 680,
        source_of_funds: "Savings",
        risk_signal: "Variable income history",
        ai_flags: [
            "Unstable employment history"
        ]
    },
    "3": {
        id: "3",
        name: "Lisa Carter",
        email: "lisa.carter@example.com",
        phone: "(355)555-1234",
        loan_amount: 450000,
        loan_type: "Home Loan",
        status: "New",
        employment: "Self-Employed",
        income: 85000,
        existing_loan: 15000,
        credit_score: 680,
        source_of_funds: "Savings",
        risk_signal: "Variable income history",
        ai_flags: [
            "Unstable employment history"
        ]
    }
};

export const mockBroker: Broker = {
    name: "Robert Turner",
    deals: 16,
    approval_rate: "75%",
    pending: 7660
};

export const workflowSteps: WorkflowStep[] = [
    { id: 1, title: "Deal Intake", completed: true },
    { id: 2, title: "IDV & Credit Check", completed: true },
    { id: 3, title: "Document Upload", completed: false },
    { id: 4, title: "AI Validation", completed: false },
    { id: 5, title: "Credit Committee", completed: false },
    { id: 6, title: "Approval & Docs", completed: false },
    { id: 7, title: "Funder Syndication", completed: false }
];

export const mockApiResponses = {
    requestDocuments: {
        success: true,
        message: "Documents requested."
    },
    sendToValuer: {
        success: true,
        message: "Valuer notified."
    },
    approveLoan: {
        success: true,
        message: "Loan approved."
    },
    escalate: {
        success: true,
        message: "Escalated to Credit Committee."
    }
};