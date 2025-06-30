// src/hooks/useApi.ts
import { useState } from 'react';
import { ApiService } from '../services/api';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: any) => {
        setError(err.message || 'An error occurred');
        console.error(err);
        return null;
    };

    const fetchPipelineData = async (status: 'new' | 'inReview' | 'approved') => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiService.getPipelineData(status);
            return response.approved;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBorrowerDetails = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await ApiService.getBorrowerDetails(id);
            return data;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBrokerInfo = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ApiService.getBrokerInfo();
            return data;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchWorkflowSteps = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ApiService.getWorkflowSteps();
            return data;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const requestDocuments = async (borrowerId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiService.requestDocuments(borrowerId);
            return response;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const sendToValuer = async (borrowerId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiService.sendToValuer(borrowerId);
            return response;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const approveLoan = async (borrowerId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiService.approveLoan(borrowerId);
            return response;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const escalateToCreditCommittee = async (borrowerId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiService.escalateToCreditCommittee(borrowerId);
            return response;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleAIAssistant = async (enabled: boolean) => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiService.toggleAIAssistant(enabled);
            return response;
        } catch (err) {
            return handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        fetchPipelineData,
        fetchBorrowerDetails,
        fetchBrokerInfo,
        fetchWorkflowSteps,
        requestDocuments,
        sendToValuer,
        approveLoan,
        escalateToCreditCommittee,
        toggleAIAssistant
    };
};