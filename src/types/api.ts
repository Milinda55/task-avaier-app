export interface ApiResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}

export interface DocumentRequestResponse {
    message: string;
}

export interface WorkflowStep {
    id: number;
    title: string;
    completed: boolean;
}