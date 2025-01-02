import React from 'react';
import { Users } from 'lucide-react';
import type { EmergencyContact } from '../../types';

interface ContactsListProps {
  contacts: EmergencyContact[];
  loading: boolean;
}

export default function ContactsList({ contacts, loading }: ContactsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div key={contact.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Users className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium">{contact.name}</p>
            <p className="text-sm text-gray-500">{contact.phone}</p>
            <p className="text-sm text-gray-500">{contact.email}</p>
          </div>
        </div>
      ))}
      {contacts.length === 0 && (
        <p className="text-gray-500 text-center py-4">No emergency contacts added yet.</p>
      )}
    </div>
  );
}