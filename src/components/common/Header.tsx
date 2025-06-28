import { Search, HelpCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx'; // Using path alias
import { cn } from '@/lib/utils.ts';
import * as React from "react"; // For conditional classes

type HeaderProps = {
    className?: string;
};

export const Header = ({ className }: HeaderProps) => {
    return (
        <header className={cn(
            "flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10",
            className
        )}>
            <h1 className="text-2xl font-bold text-gray-900">Avaier Task App</h1>
            <nav className="flex items-center space-x-2">
                <IconButton icon={Search} aria-label="Search" />
                <IconButton icon={HelpCircle} aria-label="Help" />
                <IconButton icon={Bell} aria-label="Notifications" />
            </nav>
        </header>
    );
};

const IconButton = ({
                        icon: Icon,
                        ...props
                    }: {
    icon: React.ComponentType<{ className?: string }>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-100 focus-visible:ring-offset-0"
        {...props}
    >
        <Icon className="h-4 w-4" />
    </Button>
);