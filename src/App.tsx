// src/App.tsx
import './App.css';
import { Layout } from './components/layout/Layout';
import { BorrowerPipeline } from './components/borrower/BorrowerPipeline';
import { BorrowerDetails } from './components/borrower/BorrowerDetails';
import { BrokerOverview } from './components/broker/BrokerOverview';
import { useAppStore } from './store/useAppStore';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useApi } from './hooks/useApi';

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

    const api = useApi();
    const [brokerData, setBrokerData] = useState(null);
    const [workflowData, setWorkflowData] = useState([]);

    // Initialize data on component mount
    useEffect(() => {
        let isMounted = true;

        const initializeData = async () => {
            try {
                setLoading(true);

                // Fetch pipeline data from API
                const pipelineData = await api.fetchPipelineData('new');
                if (isMounted && pipelineData) {
                    setBorrowerPipeline({
                        new: pipelineData,
                        inReview: [],
                        approved: []
                    });

                    // Set initial active borrower if data exists
                    if (pipelineData.length > 0) {
                        const initialId = pipelineData[0].id;
                        const initialBorrower = await api.fetchBorrowerDetails(initialId);
                        if (isMounted && initialBorrower) {
                            setActiveBorrower(initialBorrower);
                        }
                    }
                }

                // Fetch broker and workflow data
                const broker = await api.fetchBrokerInfo();
                const workflow = await api.fetchWorkflowSteps();
                if (isMounted) {
                    setBrokerData(broker);
                    setWorkflowData(workflow || []);
                }
            } catch (error) {
                if (isMounted) {
                    toast.error('Failed to load initial data');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initializeData();

        return () => {
            isMounted = false;
        };
    }, []);

    // Handle tab changes
    const handleTabChange = async (tab: 'new' | 'inReview' | 'approved') => {
        try {
            setLoading(true);
            setActiveTab(tab);
            const data = await api.fetchPipelineData(tab);
            if (data) {
                setBorrowerPipeline(prev => ({
                    ...prev,
                    [tab]: data
                }));
            }
        } catch (error) {
            toast.error('Failed to load pipeline data');
        } finally {
            setLoading(false);
        }
    };

    // Handle borrower selection
    const handleSelectBorrower = async (id: string) => {
        try {
            setLoading(true);
            const borrower = await api.fetchBorrowerDetails(id);
            if (borrower) {
                setActiveBorrower(borrower);
            }
        } catch (error) {
            toast.error('Failed to load borrower details');
        } finally {
            setLoading(false);
        }
    };

    // Handle API actions
    const handleAction = async (action: 'requestDocs' | 'sendToValuer' | 'approve' | 'escalate') => {
        if (!activeBorrower) return;

        try {
            let response;
            switch (action) {
                case 'requestDocs':
                    response = await api.requestDocuments(activeBorrower.id);
                    break;
                case 'sendToValuer':
                    response = await api.sendToValuer(activeBorrower.id);
                    break;
                case 'approve':
                    response = await api.approveLoan(activeBorrower.id);
                    break;
                case 'escalate':
                    response = await api.escalateToCreditCommittee(activeBorrower.id);
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

    // Handle AI assistant toggle
    const handleToggleAIAssistant = async (enabled: boolean) => {
        try {
            const response = await api.toggleAIAssistant(enabled);
            if (response?.success) {
                toggleAIAssistant(enabled);
            }
        } catch (error) {
            toast.error('Failed to toggle AI assistant');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Layout>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 p-4">
                    {/* Left Panel - Borrower Pipeline */}
                    <div className="lg:col-span-1">
                        <BorrowerPipeline
                            onSelectBorrower={handleSelectBorrower}
                            onTabChange={handleTabChange}
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