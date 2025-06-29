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
    ChevronDown
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
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                        <CardTitle className="text-xl font-semibold">
                            {activeBorrower.name}
                        </CardTitle>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-1 text-sm">
              <span className="text-muted-foreground">
                {activeBorrower.email}
              </span>
                            <span className="text-muted-foreground">
                {activeBorrower.phone}
              </span>
                            <span className="font-medium">
                ${activeBorrower.loan_amount?.toLocaleString()}
              </span>
                        </div>
                    </div>
                    <Badge className={statusVariants[activeBorrower.status]}>
                        {activeBorrower.status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-6 overflow-y-auto">
                {/* AI Risk Assessment */}
                <Collapsible defaultOpen>
                    <div className="rounded-lg border">
                        <CollapsibleTrigger className="w-full p-4 hover:bg-accent flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="h-5 w-5 text-destructive" />
                                <span className="font-medium">AI Risk Assessment</span>
                            </div>
                            <ChevronDown className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
                        </CollapsibleTrigger>

                        <CollapsibleContent className="p-4 space-y-4 border-t">
                            {activeBorrower.ai_flags?.map((flag, index) => (
                                <Alert key={index} variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <p className="text-sm">{flag}</p>
                                </Alert>
                            ))}

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => onAction?.('requestDocs')}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Request Documents
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onAction?.('sendToValuer')}
                                >
                                    <Building className="mr-2 h-4 w-4" />
                                    Send to Valuer
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-emerald-600 hover:bg-emerald-700"
                                    onClick={() => onAction?.('approve')}
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                </Button>
                            </div>
                        </CollapsibleContent>
                    </div>
                </Collapsible>

                {/* Loan Summary */}
                <section>
                    <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Employment</p>
                                <p className="text-sm font-medium">
                                    {activeBorrower.employment}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Existing Loan</p>
                                <p className="text-sm font-medium">
                                    ${activeBorrower.existing_loan?.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Credit Score</p>
                                <p className="text-sm font-medium">
                                    {activeBorrower.credit_score}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Source of Funds</p>
                                <p className="text-sm font-medium">
                                    {activeBorrower.source_of_funds}
                                </p>
                            </div>
                        </div>
                    </div>

                    {activeBorrower.risk_signal && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertTriangle className="h-4 w-4" />
                            <p className="text-sm">
                                <span className="font-medium">Risk Signal:</span>{' '}
                                {activeBorrower.risk_signal}
                            </p>
                        </Alert>
                    )}

                    <Button
                        variant="destructive"
                        className="w-full mt-4 font-semibold"
                        onClick={() => onAction?.('escalate')}
                    >
                        Escalate to Credit Committee
                    </Button>
                </section>
            </CardContent>
        </Card>
    );
};