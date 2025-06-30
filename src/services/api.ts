import type {
    BorrowerPipelineItem,
    BorrowerDetail,
    Broker,
    WorkflowStep,
    LoanStatus,
    LoanType
} from '@/types';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Define response types for API actions
type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

type ActionResponse = {
    success: boolean;
    message: string;
};

class ApiService {
    private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        const url = `${BASE_URL}${endpoint}`;
        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data: T = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    // Borrower endpoints
    async getBorrowerPipeline(): Promise<ApiResponse<{
        new: BorrowerPipelineItem[];
        in_review: BorrowerPipelineItem[];
        approved: BorrowerPipelineItem[];
    }>> {
        return this.request('/borrowers/pipeline');
    }

    async getBorrowerDetail(id: string): Promise<ApiResponse<BorrowerDetail>> {
        return this.request(`/borrowers/${id}`);
    }

    async requestDocuments(id: string): Promise<ApiResponse<ActionResponse>> {
        return this.request(`/borrowers/${id}/request-documents`, {
            method: 'POST',
        });
    }

    async sendToValuer(id: string): Promise<ApiResponse<ActionResponse>> {
        return this.request(`/borrowers/${id}/send-valuer`, {
            method: 'POST',
        });
    }

    async approveLoan(id: string): Promise<ApiResponse<ActionResponse>> {
        return this.request(`/borrowers/${id}/approve`, {
            method: 'POST',
        });
    }

    async escalateToCredit(id: string): Promise<ApiResponse<ActionResponse>> {
        return this.request(`/borrowers/${id}/escalate`, {
            method: 'POST',
        });
    }

    // Broker endpoints
    async getBrokerInfo(id: string): Promise<ApiResponse<Broker>> {
        return this.request(`/broker/${id}`);
    }

    async getOnboardingWorkflow(): Promise<ApiResponse<WorkflowStep[]>> {
        return this.request('/onboarding/workflow');
    }

    // Utility methods
    async getLoanTypes(): Promise<ApiResponse<LoanType[]>> {
        return this.request('/meta/loan-types');
    }

    async getStatusOptions(): Promise<ApiResponse<LoanStatus[]>> {
        return this.request('/meta/status-options');
    }
}

export const apiService = new ApiService();
export default apiService;