import { Card } from '../ui/card';
import { OnboardingWorkflow } from './OnboardingWorkflow';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import type {Broker} from '../../types';
import type {WorkflowStep} from '../../types';
import {Bot, Mail, MessageCircle, Phone, Sparkles} from "lucide-react";

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
        <Card className={`p-0 ${className} bg-gradient-to-br from-white to-slate-50 shadow-lg border-0 overflow-hidden`}>
            <div className="p-6 bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative space-y-4">
                    {broker ? (
                        <>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg">
                                        {initials}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">{broker.name}</h3>
                                    <p className="text-slate-200 text-sm">Senior Broker</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <p className="text-3xl font-bold text-white">{broker.deals}</p>
                                    <p className="text-xs text-slate-200 font-medium">Total Deals</p>
                                </div>
                                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <p className="text-3xl font-bold text-emerald-300">{broker.approval_rate}</p>
                                    <p className="text-xs text-slate-200 font-medium">Approval Rate</p>
                                </div>
                                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                                    <p className="text-xl font-bold text-amber-300">${broker.pending.toLocaleString()}</p>
                                    <p className="text-xs text-slate-200 font-medium">Pending Value</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center space-x-4">
                                <Skeleton className="w-14 h-14 rounded-2xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-[120px]" />
                                    <Skeleton className="h-4 w-[80px]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl space-y-2">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-3 w-full" />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="p-6 space-y-6">
                {onContact && (
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                            Quick Actions
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => onContact('call')}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
                            >
                                <div className="p-2 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-green-700">Call</span>
                            </button>

                            <button
                                onClick={() => onContact('email')}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
                            >
                                <div className="p-2 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-blue-700">Email</span>
                            </button>

                            <button
                                onClick={() => onContact('chat')}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 hover:from-purple-100 hover:to-violet-100 transition-all duration-200 group"
                            >
                                <div className="p-2 bg-purple-500 rounded-lg group-hover:bg-purple-600 transition-colors">
                                    <MessageCircle className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-purple-700">Chat</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                        Progress Tracker
                    </h4>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <OnboardingWorkflow steps={workflowSteps} />
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                        AI Features
                    </h4>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-indigo-500 rounded-lg">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <Label htmlFor="ai-assistant" className="font-medium text-slate-800 cursor-pointer">
                                    AI Assistant
                                </Label>
                                <p className="text-sm text-slate-600">Enhanced processing and insights</p>
                            </div>
                        </div>
                        <Switch
                            id="ai-assistant"
                            checked={isAIAssistantEnabled}
                            onCheckedChange={onToggleAIAssistant}
                            className="data-[state=checked]:bg-indigo-600"
                        />
                    </div>

                    {isAIAssistantEnabled && (
                        <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                            <Sparkles className="w-4 h-4" />
                            <span>AI Assistant is actively monitoring this application</span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};