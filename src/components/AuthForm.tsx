import React from 'react';

interface AuthFormProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  children: React.ReactNode;
}

export default function AuthForm({ onSubmit, loading, children }: AuthFormProps) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <fieldset disabled={loading} className="space-y-6">
        {children}
      </fieldset>
    </form>
  );
}