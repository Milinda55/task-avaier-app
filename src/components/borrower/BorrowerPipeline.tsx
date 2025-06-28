import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store/useAppStore';
import { mockPipelineData } from '@/data/mockData';
import type {LoanStatus} from '@/types';
import { BorrowerCard } from './BorrowerCard'; // New component

const statusVariants: Record<LoanStatus, 'default' | 'secondary' | 'destructive'> = {
    'New': 'secondary',
    'In Review': 'default',
    'Approved': 'default',
    'Renew': 'default'
};

export const BorrowerPipeline = () => {
    const { activeTab, setActiveTab, setActiveBorrower } = useAppStore();

    // Get borrowers for the active tab from mock data structure
    const currentBorrowers = mockPipelineData[
        activeTab === 'New' ? 'new' :
            activeTab === 'In Review' ? 'in_review' :
                'approved'
        ];

    return (
        <Card className="p-4 h-full flex flex-col">
            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as LoanStatus)}
                className="flex-1 flex flex-col"
            >
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="New">New</TabsTrigger>
                    <TabsTrigger value="In Review">In Review</TabsTrigger>
                    <TabsTrigger value="Approved">Approved</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="flex-1 mt-4 overflow-y-auto">
                    <div className="space-y-3">
                        {currentBorrowers.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No borrowers in this category
                            </div>
                        ) : (
                            currentBorrowers.map((borrower) => (
                                <BorrowerCard
                                    key={borrower.id}
                                    borrower={borrower}
                                    onClick={() => setActiveBorrower(borrower)}
                                    statusVariant={statusVariants[borrower.status]}
                                />
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    );
};