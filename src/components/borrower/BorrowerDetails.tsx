import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import {
    AlertTriangle,
    FileText,
    Building,
    CheckCircle,
    ChevronDown,
    Mail, Phone, DollarSign, CreditCard, Briefcase, TrendingDown, Star, Banknote, AlertCircle
} from 'lucide-react';
import type {BorrowerDetail} from '@/types';
import type {LoanStatus} from '@/types';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

interface BorrowerDetailProps {
    activeBorrower: BorrowerDetail | null;
    onAction?: (action: 'requestDocs' | 'sendToValuer' | 'approve' | 'escalate') => void;
}

const statusVariants: Record<LoanStatus, string> = {
    'New': 'bg-blue-500',
    'In Review': 'bg-amber-500',
    'Approved': 'bg-emerald-500',
    'Renew': 'bg-purple-500'
};

export const BorrowerDetails = ({
                                   activeBorrower,
                                   onAction
                               }: BorrowerDetailProps) => {
    if (!activeBorrower) {
        return (
            <Card className="h-full flex items-center justify-center">
                <CardContent>
                    <p className="text-muted-foreground text-center">
                        Select a borrower to view details
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="h-full flex flex-col bg-gradient-to-br from-white to-slate-50 shadow-xl border-0 overflow-hidden">
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative">
                    <div className="flex justify-between items-start gap-4 p-4">
                        <div className="space-y-2 min-w-0 flex-1">
                            <CardTitle className="text-xl font-bold truncate">
                                {activeBorrower.name}
                            </CardTitle>
                            <div className="flex flex-col gap-1 text-sm text-slate-200">
                                <div className="flex items-center gap-2 truncate">
                                    <Mail className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{activeBorrower.email}</span>
                                </div>
                                <div className="flex items-center gap-2 truncate">
                                    <Phone className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{activeBorrower.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm w-fit">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="font-semibold text-sm">
                                    ${activeBorrower.loan_amount?.toLocaleString()}
                                </span>
                                </div>
                            </div>
                        </div>
                        <Badge className={`${statusVariants[activeBorrower.status]} text-sm px-3 py-1 shadow-lg flex-shrink-0`}>
                            {activeBorrower.status}
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-6 overflow-y-auto p-4">
                <Collapsible defaultOpen>
                    <div className="rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 shadow-sm">
                        <CollapsibleTrigger className="w-full p-4 hover:bg-red-50/50 flex justify-between items-center transition-colors rounded-t-xl">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                                    <AlertTriangle className="h-4 w-4 text-red-600" />
                                </div>
                                <div className="text-left min-w-0">
                                    <span className="font-semibold text-red-900 block">AI Risk Assessment</span>
                                    <p className="text-sm text-red-600">
                                        {activeBorrower.ai_flags?.length || 0} risk factors detected
                                    </p>
                                </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-red-600 transition-transform [&[data-state=open]]:rotate-180 flex-shrink-0" />
                        </CollapsibleTrigger>

                        <CollapsibleContent className="border-t border-red-200 bg-white rounded-b-xl">
                            <div className="p-4 space-y-3">
                                {activeBorrower.ai_flags?.map((flag, index) => (
                                    <Alert key={index} className="border-red-200 bg-red-50">
                                        <AlertTriangle className="h-4 w-4 text-red-600" />
                                        <div className="ml-2">
                                            <p className="text-sm font-medium text-red-900">{flag}</p>
                                        </div>
                                    </Alert>
                                ))}

                                <div className="flex flex-wrap gap-2 pt-3 border-t border-red-100">
                                    <Button
                                        size="sm"
                                        onClick={() => onAction?.('requestDocs')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-md text-xs px-3 py-1"
                                    >
                                        <FileText className="mr-1 h-3 w-3" />
                                        Request Docs
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onAction?.('sendToValuer')}
                                        className="border-slate-300 hover:bg-slate-50 text-xs px-3 py-1"
                                    >
                                        <Building className="mr-1 h-3 w-3" />
                                        Send to Valuer
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md text-xs px-3 py-1"
                                        onClick={() => onAction?.('approve')}
                                    >
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                        Approve
                                    </Button>
                                </div>
                            </div>
                        </CollapsibleContent>
                    </div>
                </Collapsible>

                <section className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                            <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Loan Summary</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-3">
                            <div className="p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <Briefcase className="w-3 h-3 text-slate-600" />
                                    <p className="text-xs font-medium text-slate-600">Employment</p>
                                </div>
                                <p className="text-sm font-semibold text-slate-900 truncate">
                                    {activeBorrower.employment}
                                </p>
                            </div>

                            <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingDown className="w-3 h-3 text-amber-600" />
                                    <p className="text-xs font-medium text-amber-700">Existing Loan</p>
                                </div>
                                <p className="text-sm font-semibold text-amber-900">
                                    ${activeBorrower.existing_loan?.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <Star className="w-3 h-3 text-emerald-600" />
                                    <p className="text-xs font-medium text-emerald-700">Credit Score</p>
                                </div>
                                <p className="text-sm font-semibold text-emerald-900">
                                    {activeBorrower.credit_score}
                                </p>
                            </div>

                            <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                                <div className="flex items-center gap-2 mb-1">
                                    <Banknote className="w-3 h-3 text-purple-600" />
                                    <p className="text-xs font-medium text-purple-700">Source of Funds</p>
                                </div>
                                <p className="text-sm font-semibold text-purple-900 truncate">
                                    {activeBorrower.source_of_funds}
                                </p>
                            </div>
                        </div>
                    </div>

                    {activeBorrower.risk_signal && (
                        <Alert className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <div className="ml-2">
                                <p className="text-sm text-red-900">
                                    <span className="font-semibold">Risk Signal:</span>{' '}
                                    {activeBorrower.risk_signal}
                                </p>
                            </div>
                        </Alert>
                    )}

                    <Button
                        variant="destructive"
                        className="w-full font-semibold py-2 text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
                        onClick={() => onAction?.('escalate')}
                    >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Escalate to Credit Committee
                    </Button>
                </section>
            </CardContent>
        </Card>
    );
};