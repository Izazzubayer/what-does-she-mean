'use client';

import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface ExampleMessageProps {
  message: string;
  context?: string;
  onSelect: (message: string, context?: string) => void;
}

const ExampleMessage = ({ message, context, onSelect }: ExampleMessageProps) => (
  <button
    onClick={() => onSelect(message, context)}
    className="w-full text-left p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
  >
    <div className="flex items-start gap-3">
      <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium mb-1">&quot;{message}&quot;</p>
        {context && (
          <p className="text-xs text-muted-foreground">Context: {context}</p>
        )}
      </div>
    </div>
  </button>
);

export function ExampleMessages({
  onSelect,
}: {
  onSelect: (message: string, context?: string) => void;
}) {
  const examples = [
    { message: "I'm fine", context: "After asking if everything is okay" },
    { message: "We need to talk", context: undefined },
    { message: "k", context: "In response to making plans" },
    { message: "Do whatever you want", context: "After asking for their preference" },
    { message: "I'm not mad", context: "They seem upset" },
    { message: "It's okay, I understand", context: "You canceled plans" },
  ];

  return (
    <Card>
      <CardContent className="pt-6 space-y-3">
        <h3 className="text-sm font-medium mb-4">Try these examples</h3>
        <div className="space-y-2">
          {examples.map((example, index) => (
            <ExampleMessage
              key={index}
              message={example.message}
              context={example.context}
              onSelect={onSelect}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

