import React from 'react';
import { CheckCircle } from 'lucide-react';
import type {WorkflowStep} from '@/types';

interface OnboardingWorkflowProps {
    steps: WorkflowStep[];
}

export const OnboardingWorkflow: React.FC<OnboardingWorkflowProps> = ({ steps }) => {
    return (
        <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Onboarding Workflow</h4>
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            step.completed
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}>
                            {step.completed ? (
                                <CheckCircle className="h-5 w-5" />
                            ) : (
                                step.id
                            )}
                        </div>
                        <div className="flex-1">
              <span className={`text-sm ${
                  step.completed ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-px h-6 ${
                                step.completed ? 'bg-green-300' : 'bg-gray-300'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
