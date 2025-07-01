/* eslint-disable */
import { create } from 'zustand';
import type {BorrowerDetail, BorrowerPipelineItem} from '../types';

type TabStatus = 'new' | 'inReview' | 'approved';

interface AppStore {
    activeTab: TabStatus;
    setActiveTab: (tab: TabStatus) => void;
    borrowerPipeline: {
        new: BorrowerPipelineItem[];
        in_review: BorrowerPipelineItem[];
        approved: BorrowerPipelineItem[];
    };
    setBorrowerPipeline: (data: (prev: any) => any) => void;
    activeBorrower: BorrowerDetail | null;
    setActiveBorrower: (borrower: BorrowerDetail | null) => void;
    isAIAssistantEnabled: boolean;
    toggleAIAssistant: (enabled?: boolean) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
    activeTab: 'new',
    setActiveTab: (tab: any) => set({ activeTab: tab }),
    borrowerPipeline: {
        new: [],
        in_review: [],
        approved: []
    },
    setBorrowerPipeline: (data) => set(state => ({
        borrowerPipeline: typeof data === 'function'
            ? data(state.borrowerPipeline)
            : data
    })),
    activeBorrower: null,
    setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
    isAIAssistantEnabled: false,
    toggleAIAssistant: (enabled) => set((state) => ({
        isAIAssistantEnabled: enabled !== undefined ? enabled : !state.isAIAssistantEnabled
    })),
    loading: false,
    setLoading: (loading) => set({ loading })
}));