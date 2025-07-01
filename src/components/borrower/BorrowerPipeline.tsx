import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useAppStore } from '@/store/useAppStore.ts';
import {CheckCircle, Clock, FileText} from "lucide-react";

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

    // Enhanced Borrower Pipeline Component
    return (
        <Card className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-white shadow-lg border-0">
            <CardHeader className="pb-4 bg-white/50 backdrop-blur-sm border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Borrower Pipeline
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        Live Updates
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0">
                <Tabs
                    value={activeTab}
                    onValueChange={(tab) => onTabChange(tab as PipelineTab)}
                    className="flex flex-col h-full"
                >
                    <div className="px-6 pt-4">
                        <TabsList className="grid w-full grid-cols-3 bg-slate-100/70 backdrop-blur-sm p-1 rounded-xl">
                            <TabsTrigger
                                value="new"
                                className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 rounded-lg font-medium"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    New
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                value="in_review"
                                className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 rounded-lg font-medium"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                    In Review
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                value="approved"
                                className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 rounded-lg font-medium"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Approved
                                </div>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="px-6 py-4 flex-1 overflow-y-auto">
                        <TabsContent value="new" className="space-y-3 mt-0">
                            {borrowerPipeline.new.length > 0 ? (
                                borrowerPipeline.new.map(renderBorrowerCard)
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 font-medium mb-1">No new applications</p>
                                    <p className="text-sm text-slate-400">Applications will appear here when submitted</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="in_review" className="space-y-3 mt-0">
                            {borrowerPipeline.in_review.length > 0 ? (
                                borrowerPipeline.in_review.map(renderBorrowerCard)
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                                        <Clock className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <p className="text-slate-500 font-medium mb-1">No applications in review</p>
                                    <p className="text-sm text-slate-400">Review items will appear here</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="approved" className="space-y-3 mt-0">
                            {borrowerPipeline.approved.length > 0 ? (
                                borrowerPipeline.approved.map(renderBorrowerCard)
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <p className="text-slate-500 font-medium mb-1">No approved applications</p>
                                    <p className="text-sm text-slate-400">Approved items will appear here</p>
                                </div>
                            )}
                        </TabsContent>
                    </div>
                </Tabs>

                {/* Enhanced Filter Section */}
                <div className="border-t border-slate-100 bg-slate-50/50 backdrop-blur-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                            Filter Status
                        </h4>
                        <Badge variant="outline" className="text-xs bg-white">
                            F-SANITISED
                        </Badge>
                    </div>

                    <RadioGroup defaultValue="active" className="space-y-3">
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                            <RadioGroupItem value="active" id="active" className="border-emerald-500 text-emerald-600" />
                            <Label htmlFor="active" className="font-medium text-slate-700 cursor-pointer flex-1">
                                Active Applications
                            </Label>
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                                {borrowerPipeline.new.length + borrowerPipeline.in_review.length}
                            </Badge>
                        </div>
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors">
                            <RadioGroupItem value="inactive" id="inactive" className="border-slate-400" />
                            <Label htmlFor="inactive" className="font-medium text-slate-700 cursor-pointer flex-1">
                                Archived Applications
                            </Label>
                            <Badge variant="secondary" className="text-xs">
                                {borrowerPipeline.approved.length}
                            </Badge>
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    );
};