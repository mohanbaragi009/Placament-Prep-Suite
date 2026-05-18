import React from 'react';

interface ContextHeaderProps {
  title: string;
  subtitle: string;
}

export function ContextHeader({ title, subtitle }: ContextHeaderProps) {
  return (
    <div className="py-10 px-16 bg-background">
      <h1 className="text-5xl font-headline font-light mb-2 text-foreground">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground max-w-[720px] leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}