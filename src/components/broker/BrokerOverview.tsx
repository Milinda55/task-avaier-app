import { Card } from '../ui/card';
import { OnboardingWorkflow } from './OnboardingWorkflow';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import type {Broker} from '../../types';
import type {WorkflowStep} from '../../types';

interface BrokerOverviewProps {
    broker: Broker | null;
    workflowSteps: WorkflowStep[];
    isAIAssistantEnabled: boolean;
    onToggleAIAssistant: (enabled: boolean) => void;
    onContact?: (method: 'call' | 'email' | 'chat') => void;
    className?: string;
}

export const BrokerOverview = ({
                                   broker,
                                   workflowSteps = [],
                                   isAIAssistantEnabled,
                                   onToggleAIAssistant,
                                   onContact,
                                   className = ''
                               }: BrokerOverviewProps) => {
    // Generate initials only if broker exists
    const initials = broker ? broker.name.split(' ').map(n => n[0]).join('') : '';

    return (
        <Card className={`p-4 ${className}`}>
            {/* Broker Info Section */}
            <div className="space-y-4 mb-6">
                {broker ? (
                    <>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-700 font-medium">
                                {initials}
                            </div>
                            <h3 className="font-bold text-lg">{broker.name}</h3>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{broker.deals}</p>
                                <p className="text-sm text-gray-500">Deals</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">{broker.approval_rate}</p>
                                <p className="text-sm text-gray-500">Approval Rate</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">${broker.pending.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Pending</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center space-x-3">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <Skeleton className="h-4 w-[120px]" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="text-center space-y-1">
                                    <Skeleton className="h-6 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Contact Buttons */}
            {onContact && (
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => onContact('call')}
                        className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                        Call
                    </button>
                    <button
                        onClick={() => onContact('email')}
                        className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                        Email
                    </button>
                    <button
                        onClick={() => onContact('chat')}
                        className="px-3 py-1.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                        Chat
                    </button>
                </div>
            )}

            {/* Onboarding Workflow */}
            <OnboardingWorkflow steps={workflowSteps} />

            {/* AI Assistant Toggle */}
            <div className="flex items-center space-x-2 mt-6">
                <Switch
                    id="ai-assistant"
                    checked={isAIAssistantEnabled}
                    onCheckedChange={onToggleAIAssistant}
                />
                <Label htmlFor="ai-assistant">AI Assistant</Label>
            </div>
        </Card>
    );
};