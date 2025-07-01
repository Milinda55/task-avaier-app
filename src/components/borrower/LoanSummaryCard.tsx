import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    CreditCard,
    BarChart2,
    DollarSign,
    FileText,
    Calendar,
    UserCheck, AlertTriangle
} from 'lucide-react';
import type {BorrowerDetail} from '@/types';
import type {LoanStatus} from '@/types';

interface LoanSummaryCardProps {
    borrower: BorrowerDetail;
    className?: string;
}

const statusVariants: Record<LoanStatus, string> = {
    'New': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'In Review': 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    'Approved': 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
    'Renew': 'bg-purple-100 text-purple-800 hover:bg-purple-200'
};

export const LoanSummaryCard = ({
                                    borrower,
                                    className
                                }: LoanSummaryCardProps) => {
    const summaryItems = [
        {
            icon: <CreditCard className="h-4 w-4" />,
            label: 'Loan Type',
            value: borrower.loan_type
        },
        {
            icon: <DollarSign className="h-4 w-4" />,
            label: 'Amount',
            value: `$${borrower.loan_amount?.toLocaleString()}`
        },
        {
            icon: <BarChart2 className="h-4 w-4" />,
            label: 'Credit Score',
            value: borrower.credit_score
        },
        {
            icon: <FileText className="h-4 w-4" />,
            label: 'Source of Funds',
            value: borrower.source_of_funds
        },
        {
            icon: <Calendar className="h-4 w-4" />,
            label: 'Term',
            value: '30 years'
        },
        {
            icon: <UserCheck className="h-4 w-4" />,
            label: 'Employment',
            value: borrower.employment
        }
    ];

    return (
        <Card className={className}>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg font-semibold">
                        {borrower.name}
                    </CardTitle>
                    <Badge className={statusVariants[borrower.status]}>
                        {borrower.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {summaryItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="bg-muted p-2 rounded-full">
                                {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-muted-foreground truncate">
                                    {item.label}
                                </p>
                                <p className="font-medium truncate">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {borrower.risk_signal && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-700">
                                <span className="font-medium">Risk:</span> {borrower.risk_signal}
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};