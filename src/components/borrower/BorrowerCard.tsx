import type {BorrowerPipelineItem} from '@/types';
import { Badge } from '@/components/ui/badge';

export const BorrowerCard = ({
                                 borrower,
                                 onClick,
                                 statusVariant,
                             }: {
    borrower: BorrowerPipelineItem;
    onClick: () => void;
    statusVariant: 'default' | 'secondary' | 'destructive';
}) => (
    <div
        className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onClick}
    >
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-medium">{borrower.name}</h3>
                <p className="text-sm text-gray-600">{borrower.loan_type}</p>
            </div>
            <div className="text-right">
                <p className="font-medium">
                    ${borrower.amount.toLocaleString()}
                </p>
                <Badge variant={statusVariant}>
                    {borrower.status}
                </Badge>
            </div>
        </div>
    </div>
);