import './App.css'
import { Layout } from './components/layout/Layout';
import { BorrowerPipeline } from './components/borrower/BorrowerPipeline';
import { BorrowerDetails } from './components/borrower/BorrowerDetails';
import { BrokerOverview } from './components/broker/BrokerOverview';
import { useAppStore } from './store/useAppStore';
import { useEffect } from 'react';
import {
    mockPipelineData,
    mockBorrowerDetails,
    mockBroker,
    workflowSteps,
    mockApiResponses
} from './data/mockData';
import { Toaster, toast } from 'sonner';

function App() {
    const {
        activeBorrower,
        setActiveBorrower,
        activeTab,
        setActiveTab,
        setBorrowerPipeline,
        isAIAssistantEnabled,
        toggleAIAssistant,
        loading,
        setLoading
    } = useAppStore();

    // Initialize data on component mount
    useEffect(() => {
        const initializeData = async () => {
            try {
                setLoading(true);

                // Simulate API call for pipeline data
                setBorrowerPipeline(mockPipelineData);

                // Set initial active borrower if data exists
                if (mockPipelineData.new.length > 0) {
                    const initialId = mockPipelineData.new[0].id;
                    const initialBorrower = mockBorrowerDetails[initialId];
                    setActiveBorrower(initialBorrower);
                }
            } catch (error) {
                console.error('Error initializing data:', error);
                toast.error('Failed to load initial data');
            } finally {
                setLoading(false);
            }
        };

        initializeData();
    }, [setActiveBorrower, setBorrowerPipeline, setLoading]);

    // Handle API actions
    const handleAction = async (action: 'requestDocs' | 'sendToValuer' | 'approve' | 'escalate') => {
        if (!activeBorrower) return;

        try {
            let response: { success: boolean; message: string } | undefined;

            switch (action) {
                case 'requestDocs':
                    response = mockApiResponses.requestDocuments;
                    break;
                case 'sendToValuer':
                    response = mockApiResponses.sendToValuer;
                    break;
                case 'approve':
                    response = mockApiResponses.approveLoan;
                    break;
                case 'escalate':
                    response = mockApiResponses.escalate;
                    break;
            }

            if (response?.success) {
                toast.success(response.message);
            } else {
                throw new Error('Action failed');
            }
        } catch (error) {
            toast.error('Error processing your request');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Layout>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 p-4">
                    {/* Left Panel - Borrower Pipeline */}
                    <div className="lg:col-span-1">
                        <BorrowerPipeline
                            onSelectBorrower={(id) => {
                                const borrower = mockBorrowerDetails[id];
                                setActiveBorrower(borrower);
                            }}
                            onTabChange={setActiveTab}
                        />
                    </div>

                    {/* Middle Panel - Borrower Details */}
                    <div className="lg:col-span-1">
                        <BorrowerDetails
                            activeBorrower={activeBorrower}
                            onAction={handleAction}
                        />
                    </div>

                    {/* Right Panel - Broker Overview */}
                    <div className="lg:col-span-1">
                        <BrokerOverview
                            broker={mockBroker}
                            workflowSteps={workflowSteps}
                            isAIAssistantEnabled={isAIAssistantEnabled}
                            onToggleAIAssistant={toggleAIAssistant}
                        />
                    </div>
                </div>
            </Layout>
            <Toaster position="top-right" richColors />
        </div>
    );
}

export default App;