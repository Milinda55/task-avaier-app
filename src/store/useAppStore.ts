// src/store/useAppStore.ts
import { create } from 'zustand';
import type {BorrowerDetail, BorrowerPipelineItem} from '../types';

type TabStatus = 'new' | 'inReview' | 'approved';

interface AppStore {
    activeTab: TabStatus;
    setActiveTab: (tab: TabStatus) => void;
    borrowerPipeline: {
        new: BorrowerPipelineItem[];
        inReview: BorrowerPipelineItem[];
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
    setActiveTab: (tab) => set({ activeTab: tab }),
    borrowerPipeline: {
        new: [],
        inReview: [],
        approved: []
    },
    setBorrowerPipeline: (data) => set({ setBorrowerPipeline: data }),
    activeBorrower: null,
    setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
    isAIAssistantEnabled: false,
    toggleAIAssistant: (enabled) => set((state) => ({
        isAIAssistantEnabled: enabled !== undefined ? enabled : !state.isAIAssistantEnabled
    })),
    loading: false,
    setLoading: (loading) => set({ loading })
}));