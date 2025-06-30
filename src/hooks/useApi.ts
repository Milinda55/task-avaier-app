import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { toast } from 'sonner';
import type {
    BorrowerPipelineItem,
    BorrowerDetail,
    Broker,
    WorkflowStep
} from '@/types';

// Query keys with type safety
export const QUERY_KEYS = {
    BORROWER_PIPELINE: ['borrower-pipeline'] as const,
    BORROWER_DETAIL: (id: string) => ['borrower-detail', id] as const,
    BROKER_INFO: (id: string) => ['broker-info', id] as const,
    ONBOARDING_WORKFLOW: ['onboarding-workflow'] as const,
};

// Helper type for API responses
type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

// Borrower Pipeline Hook
export const useBorrowerPipeline = () => {
    return useQuery<ApiResponse<{
        new: BorrowerPipelineItem[];
        in_review: BorrowerPipelineItem[];
        approved: BorrowerPipelineItem[];
    }>>({
        queryKey: QUERY_KEYS.BORROWER_PIPELINE,
        queryFn: apiService.getBorrowerPipeline,
        staleTime: 1000 * 60 * 5, // 5 mins
        gcTime: 1000 * 60 * 10, // 10 mins cache
        select: (response) => {
            if (!response.success) {
                throw new Error(response.error || 'Failed to fetch pipeline');
            }
            return response;
        },
    });
};

// Borrower Detail Hook
export const useBorrowerDetail = (id: string | null) => {
    return useQuery<ApiResponse<BorrowerDetail>>({
        queryKey: id ? QUERY_KEYS.BORROWER_DETAIL(id) : ['skip'],
        queryFn: () => id ? apiService.getBorrowerDetail(id) : Promise.reject(new Error('No ID provided')),
        enabled: !!id,
        staleTime: 1000 * 60 * 2, // 2 minutes
        select: (response) => {
            if (!response.success) {
                throw new Error(response.error || 'Failed to fetch borrower details');
            }
            return response;
        },
    });
};

// Broker Info Hook
export const useBrokerInfo = (id: string) => {
    return useQuery<ApiResponse<Broker>>({
        queryKey: QUERY_KEYS.BROKER_INFO(id),
        queryFn: () => apiService.getBrokerInfo(id),
        staleTime: 1000 * 60 * 10, // 10 minutes
        select: (response) => {
            if (!response.success) {
                throw new Error(response.error || 'Failed to fetch broker info');
            }
            return response;
        },
    });
};

// Onboarding Workflow Hook
export const useOnboardingWorkflow = () => {
    return useQuery<ApiResponse<WorkflowStep[]>>({
        queryKey: QUERY_KEYS.ONBOARDING_WORKFLOW,
        queryFn: apiService.getOnboardingWorkflow,
        staleTime: 1000 * 60 * 30, // 30 minutes
        select: (response) => {
            if (!response.success) {
                throw new Error(response.error || 'Failed to fetch workflow');
            }
            return response;
        },
    });
};

// Base mutation configuration
const baseMutationConfig = {
    onError: (error: Error) => {
        toast.error(error.message || 'Action failed');
    },
};

// Request Documents Mutation
export const useRequestDocuments = () => {
    const queryClient = useQueryClient();

    return useMutation({
        ...baseMutationConfig,
        mutationFn: (id: string) => apiService.requestDocuments(id),
        onSuccess: (response, id) => {
            if (response.success) {
                toast.success(response.data?.message || 'Documents requested successfully');
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.BORROWER_DETAIL(id)
                });
            } else {
                throw new Error(response.error);
            }
        },
    });
};

// Send to Valuer Mutation
export const useSendToValuer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        ...baseMutationConfig,
        mutationFn: (id: string) => apiService.sendToValuer(id),
        onSuccess: (response, id) => {
            if (response.success) {
                toast.success(response.data?.message || 'Sent to valuer successfully');
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.BORROWER_DETAIL(id)
                });
            } else {
                throw new Error(response.error);
            }
        },
    });
};

// Approve Loan Mutation
export const useApproveLoan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        ...baseMutationConfig,
        mutationFn: (id: string) => apiService.approveLoan(id),
        onSuccess: (response, id) => {
            if (response.success) {
                toast.success(response.data?.message || 'Loan approved successfully');
                queryClient.invalidateQueries({queryKey: QUERY_KEYS.BORROWER_PIPELINE});
                queryClient.invalidateQueries({queryKey: QUERY_KEYS.BORROWER_DETAIL(id)});
            } else {
                throw new Error(response.error);
            }
        },
    });
};

// Escalate to Credit Mutation
export const useEscalateToCredit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        ...baseMutationConfig,
        mutationFn: (id: string) => apiService.escalateToCredit(id),
        onSuccess: (response, id) => {
            if (response.success) {
                toast.success(response.data?.message || 'Escalated successfully');
                queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.BORROWER_DETAIL(id)
                });
            } else {
                throw new Error(response.error);
            }
        },
    });
};