/* eslint-disable */
import {
    mockPipelineData,
    mockBorrowerDetails,
    mockBroker,
    workflowSteps,
    mockApiResponses
} from '../data/mockData';
import type {BorrowerDetail, BorrowerPipelineItem} from '@/types';

// Simulate API delay for more realistic behavior
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));

export const ApiService = {
    // Fetch pipeline data by status
    async getPipelineData(status: "new" | "inReview" | "approved"): Promise<{
        approved: any[];
        in_review: any[];
        new: any[];
        success: boolean;
        data: {
            id: string;
            name: string;
            loan_type: "Home Loan" | "Personal Loan" | "Auto Loan" | "Investment Loan";
            amount: number;
            status: "New" | "In Review" | "Approved" | "Renew"
        }[] | BorrowerPipelineItem[]
    }> {
        await simulateDelay();
        return {
            approved: [], in_review: [], new: [],
            success: true,
            data: mockPipelineData[status]
        };
    },

    // Fetch borrower details by ID
    async getBorrowerDetails(id: string): Promise<BorrowerDetail> {
        await simulateDelay();
        const borrower = mockBorrowerDetails[id];
        if (!borrower) {
            throw new Error('Borrower not found');
        }
        return borrower;
    },

    // Fetch broker information
    async getBrokerInfo(): Promise<any> {
        await simulateDelay();
        return mockBroker;
    },

    // Fetch workflow steps
    async getWorkflowSteps(): Promise<any[]> {
        await simulateDelay();
        return workflowSteps;
    },

    // Action: Request documents
    async requestDocuments(borrowerId: string): Promise<any> {
        await simulateDelay();
        return mockApiResponses.requestDocuments;
    },

    // Action: Send to valuer
    async sendToValuer(borrowerId: string): Promise<any> {
        await simulateDelay();
        return mockApiResponses.sendToValuer;
    },

    // Action: Approve loan
    async approveLoan(borrowerId: string): Promise<any> {
        await simulateDelay();
        return mockApiResponses.approveLoan;
    },

    // Action: Escalate to credit committee
    async escalateToCreditCommittee(borrowerId: string): Promise<any> {
        await simulateDelay();
        return mockApiResponses.escalate;
    },

    // Toggle AI assistant
    async toggleAIAssistant(enabled: boolean): Promise<any> {
        await simulateDelay();
        return { success: true, enabled };
    }
};