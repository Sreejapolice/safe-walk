import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { EmergencyContact } from '../types';
import GoogleMap from '../components/map/GoogleMap';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardCard from '../components/dashboard/DashboardCard';
import EmergencyButton from '../components/dashboard/EmergencyButton';
import ContactsList from '../components/dashboard/ContactsList';
import EmergencyContactForm from '../components/dashboard/EmergencyContactForm';
import BluetoothConnection from '../components/smartwatch/BluetoothConnection';
import EmergencyAlert from '../components/dashboard/EmergencyAlert';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchEmergencyContacts = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('emergency_contacts')
          .select('*')
          .eq('user_id', user.id);

        if (fetchError) throw fetchError;
        if (data) setEmergencyContacts(data);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load emergency contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyContacts();
  }, [user, navigate]);

  const toggleEmergencyMode = async () => {
    if (!user) return;
    
    try {
      setUpdating(true);
      const newState = !emergencyMode;
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ emergency_mode: newState })
        .eq('id', user.id);

      if (updateError) throw updateError;
      setEmergencyMode(newState);
    } catch (err) {
      console.error('Error updating emergency mode:', err);
      setError('Failed to update emergency mode');
    } finally {
      setUpdating(false);
    }
  };

  const handleContactAdded = () => {
    setShowContactForm(false);
    if (user) {
      const fetchContacts = async () => {
        const { data } = await supabase
          .from('emergency_contacts')
          .select('*')
          .eq('user_id', user.id);
        if (data) setEmergencyContacts(data);
      };
      fetchContacts();
    }
  };

  return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        <DashboardCard title="Live Location">
          <GoogleMap />
        </DashboardCard>
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <BluetoothConnection />

        <DashboardCard>
          <EmergencyButton
            enabled={emergencyMode}
            onClick={toggleEmergencyMode}
            loading={updating}
          />
        </DashboardCard>

        <DashboardCard title="Emergency Contacts">
          {showContactForm ? (
            <EmergencyContactForm onContactAdded={handleContactAdded} />
          ) : (
            <>
              <ContactsList
                contacts={emergencyContacts}
                loading={loading}
              />
              <button
                onClick={() => setShowContactForm(true)}
                className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
              >
                Add Contact
              </button>
            </>
          )}
        </DashboardCard>
      </div>

      <EmergencyAlert />
    </DashboardLayout>
  );
}