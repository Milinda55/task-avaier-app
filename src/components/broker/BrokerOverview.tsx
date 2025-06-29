import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Phone,
    Mail,
    MessageSquare,
    CheckCircle2,
    User,
    TrendingUp,
    Clock
} from 'lucide-react';
import type {Broker, WorkflowStep} from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface BrokerOverviewProps {
    broker: Broker;
    workflowSteps: WorkflowStep[];
    isAIAssistantEnabled: boolean;
    onToggleAIAssistant: () => void;
    onContact?: (method: 'call' | 'email' | 'chat') => void;
    className?: string;
}

export const BrokerOverview = ({
                                   broker,
                                   workflowSteps,
                                   isAIAssistantEnabled,
                                   onToggleAIAssistant,
                                   onContact,
                                   className
                               }: BrokerOverviewProps) => {
    const initials = broker.name.split(' ').map(n => n[0]).join('');

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Broker Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Broker Profile */}
                <div className="text-center space-y-4">
                    <Avatar className="w-16 h-16 mx-auto">
                        <AvatarImage src={`/avatars/${broker.name.toLowerCase().replace(' ', '-')}.jpg`} />
                        <AvatarFallback className="bg-primary text-white font-medium">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <h3 className="font-semibold text-lg">{broker.name}</h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                            <div className="flex items-center justify-center gap-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xl font-bold">{broker.deals}</span>
                            </div>
                            <div className="text-xs text-muted-foreground uppercase">Deals</div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-center gap-1">
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xl font-bold">{broker.approval_rate}</span>
                            </div>
                            <div className="text-xs text-muted-foreground uppercase">Approval</div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xl font-bold">
                  ${broker.pending.toLocaleString()}
                </span>
                            </div>
                            <div className="text-xs text-muted-foreground uppercase">Pending</div>
                        </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={() => onContact?.('call')}
                        >
                            <Phone className="h-4 w-4" />
                            <span>Call</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={() => onContact?.('email')}
                        >
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={() => onContact?.('chat')}
                        >
                            <MessageSquare className="h-4 w-4" />
                            <span>Chat</span>
                        </Button>
                    </div>
                </div>

                {/* Onboarding Workflow */}
                <div className="space-y-3">
                    <h4 className="font-medium">Onboarding Progress</h4>
                    <div className="space-y-3">
                        {workflowSteps.map((step) => (
                            <div key={step.id} className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    step.completed
                                        ? 'bg-success text-success-foreground'
                                        : 'bg-muted text-muted-foreground'
                                }`}>
                                    {step.completed ? (
                                        <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                        <span className="text-xs font-medium">{step.id}</span>
                                    )}
                                </div>
                                <span className={`text-sm ${
                                    step.completed ? 'font-medium' : 'text-muted-foreground'
                                }`}>
                  {step.title}
                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Assistant Toggle */}
                <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label htmlFor="ai-assistant" className="font-medium">
                                AI Assistant
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                {isAIAssistantEnabled ? 'Active' : 'Disabled'}
                            </p>
                        </div>
                        <Switch
                            id="ai-assistant"
                            checked={isAIAssistantEnabled}
                            onCheckedChange={onToggleAIAssistant}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};