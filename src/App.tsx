/* eslint-disable */
import './App.css';
import { Layout } from './components/layout/Layout';
import { BorrowerPipeline } from './components/borrower/BorrowerPipeline';
import { BorrowerDetails } from './components/borrower/BorrowerDetails';
import { BrokerOverview } from './components/broker/BrokerOverview';
import { useAppStore } from './store/useAppStore';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import {
    mockPipelineData,
    mockBorrowerDetails,
    mockBroker,
    workflowSteps
} from './data/mockData';

type PipelineTab = 'new' | 'in_review' | 'approved';

function App() {
    const {
        activeBorrower,
        setActiveBorrower,
        activeTab,
        setActiveTab,
        borrowerPipeline,
        setBorrowerPipeline,
        isAIAssistantEnabled,
        toggleAIAssistant,
        loading,
        setLoading
    } = useAppStore();

    const [brokerData, setBrokerData] = useState(mockBroker);
    const [workflowData, setWorkflowData] = useState(workflowSteps);

    // Initialize data on component mount
    useEffect(() => {
        setBorrowerPipeline({
            new: mockPipelineData.new,
            in_review: mockPipelineData.in_review,
            approved: mockPipelineData.approved
        });

        // Set initial active borrower
        if (mockPipelineData.new.length > 0) {
            const initialBorrower = mockBorrowerDetails[mockPipelineData.new[0].id];
            setActiveBorrower(initialBorrower);
        }
    }, []);

    const handleSelectBorrower = (id: string) => {
        const borrower = mockBorrowerDetails[id];
        if (borrower) {
            setActiveBorrower(borrower);
        }
    };

    const handleTabChange = (tab: PipelineTab) => {
        setActiveTab(tab);
    };

    const handleAction = (action: 'requestDocs' | 'sendToValuer' | 'approve' | 'escalate') => {
        const messages = {
            requestDocs: 'Documents requested successfully',
            sendToValuer: 'Sent to valuer successfully',
            approve: 'Loan approved successfully',
            escalate: 'Escalated to credit committee'
        };
        toast.success(messages[action]);
    };

    const handleToggleAIAssistant = (enabled: boolean) => {
        toggleAIAssistant(enabled);
        toast.success(`AI Assistant ${enabled ? 'enabled' : 'disabled'}`);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Layout>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 p-4">
                    <div className="lg:col-span-1">
                        <BorrowerPipeline
                            onSelectBorrower={handleSelectBorrower}
                            onTabChange={handleTabChange}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <BorrowerDetails
                            activeBorrower={activeBorrower}
                            onAction={handleAction}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <BrokerOverview
                            broker={brokerData}
                            workflowSteps={workflowData}
                            isAIAssistantEnabled={isAIAssistantEnabled}
                            onToggleAIAssistant={handleToggleAIAssistant}
                        />
                    </div>
                </div>
            </Layout>
            <Toaster position="top-right" richColors />
        </div>
    );
}

export default App;