import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useAppStore } from '@/store/useAppStore.ts';

type PipelineTab = 'new' | 'in_review' | 'approved';

interface BorrowerPipelineProps {
    onSelectBorrower: (id: string) => void;
    onTabChange: (tab: PipelineTab) => void;
}

const statusVariantMap = {
    'New': 'default',
    'In Review': 'secondary',
    'Approved': 'success',
    'Renew': 'outline'
} as const;

type StatusKey = keyof typeof statusVariantMap;

export const BorrowerPipeline: React.FC<BorrowerPipelineProps> = ({
                                                                      onSelectBorrower,
                                                                      onTabChange
                                                                  }) => {
    const {
        activeTab,
        borrowerPipeline,
        activeBorrower
    } = useAppStore();

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('');
    };

    const handleCardClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        onSelectBorrower(id);
    };

    const renderBorrowerCard = (borrower: typeof borrowerPipeline.new[0]) => (
        <div
            key={borrower.id}
            className={`p-4 border rounded-lg cursor-pointer mb-3 transition-all hover:shadow-md ${
                activeBorrower?.id === borrower.id
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={(e) => handleCardClick(e, borrower.id)}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getInitials(borrower.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                        <h4 className="font-medium truncate">{borrower.name}</h4>
                        <span className="font-medium text-sm ml-2 whitespace-nowrap">
              ${borrower.amount.toLocaleString()}
            </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600 truncate">{borrower.loan_type}</span>
                        <Badge
                            variant={statusVariantMap[borrower.status as StatusKey]}
                            className="ml-2"
                        >
                            {borrower.status}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg">Borrower Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <Tabs
                    value={activeTab}
                    onValueChange={(tab) => onTabChange(tab as PipelineTab)}
                    className="flex flex-col h-full"
                >
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="new">New</TabsTrigger>
                        <TabsTrigger value="in_review">In Review</TabsTrigger>
                        <TabsTrigger value="approved">Approved</TabsTrigger>
                    </TabsList>

                    <div className="py-4 flex-1 overflow-y-auto">
                        <TabsContent value="new" className="space-y-3">
                            {borrowerPipeline.new.length > 0 ? (
                                borrowerPipeline.new.map(renderBorrowerCard)
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">
                                    No new applications
                                </p>
                            )}
                        </TabsContent>

                        <TabsContent value="in_review" className="space-y-3">
                            {borrowerPipeline.in_review.length > 0 ? (
                                borrowerPipeline.in_review.map(renderBorrowerCard)
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">
                                    No applications in review
                                </p>
                            )}
                        </TabsContent>

                        <TabsContent value="approved" className="space-y-3">
                            {borrowerPipeline.approved.length > 0 ? (
                                borrowerPipeline.approved.map(renderBorrowerCard)
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">
                                    No approved applications
                                </p>
                            )}
                        </TabsContent>
                    </div>
                </Tabs>

                <div className="border-t pt-4 mt-auto">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        F-SANITISED ACTIVE
                    </h4>
                    <RadioGroup defaultValue="active" className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="active" />
                            <Label htmlFor="active" className="font-normal">Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inactive" id="inactive" />
                            <Label htmlFor="inactive" className="font-normal">Inactive</Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    );
};