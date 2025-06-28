import { create } from 'zustand';
import type {
    BorrowerPipelineItem,
    BorrowerDetail,
    LoanStatus
} from '../types';

interface AppState {
    // Borrower state
    activeBorrower: BorrowerDetail | null;
    borrowerPipeline: {
        new: BorrowerPipelineItem[];
        in_review: BorrowerPipelineItem[];
        approved: BorrowerPipelineItem[];
    };
    activeTab: LoanStatus;

    // UI state
    isAIAssistantEnabled: boolean;

    // Actions
    setActiveBorrower: (borrower: BorrowerDetail | null) => void;
    setActiveTab: (tab: LoanStatus) => void;
    setBorrowerPipeline: (
        pipeline: AppState['borrowerPipeline']
    ) => void;
    toggleAIAssistant: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Initial state
    activeBorrower: null,
    borrowerPipeline: {
        new: [],
        in_review: [],
        approved: []
    },
    activeTab: 'New',
    isAIAssistantEnabled: false,

    // Actions
    setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setBorrowerPipeline: (pipeline) => set({ borrowerPipeline: pipeline }),
    toggleAIAssistant: () => set((state) => ({
        isAIAssistantEnabled: !state.isAIAssistantEnabled
    }))
}));