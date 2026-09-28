import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ReservationFormData } from '../types';
import { useEventConfig } from './EventConfigContext';

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  submitReservation: (data: ReservationFormData) => Promise<void>;
  resetModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { eventConfig } = useEventConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reset status shortly after closing to keep transitions smooth
    setTimeout(() => {
      setIsSuccess(false);
      setIsSubmitting(false);
    }, 300);
  };

  const resetModal = () => {
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const submitReservation = async (data: ReservationFormData): Promise<void> => {
    setIsSubmitting(true);
    const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxATYwzO-UCEWFLzdFv_yp3rOX8uU4hCOM4B4XTrrorqS0kAtH77eydjeZNfDOZoPUhPw/exec';

    const payload = {
      timestamp: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      whatsapp: data.whatsapp,
      policyStatus: data.policyStatus,
      subscribeNewsletter: data.subscribeNewsletter,
      source: 'Health Insurance Playbook Masterclass',
      eventDatetime: eventConfig.datetime,
      eventDate: eventConfig.fullDateDisplay,
      eventTime: eventConfig.timeDisplay,
      eventTimeRange: eventConfig.timeRangeDisplay,
      eventDurationMinutes: eventConfig.durationMinutes,
    };

    console.log('[ModalContext] 🚀 Submitting reservation...');
    console.log('[ModalContext] 📦 Payload:', payload);
    console.log('[ModalContext] 🔗 Webhook URL:', GOOGLE_SHEETS_WEBHOOK_URL);

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        console.log('[ModalContext] 📡 Sending fetch request...');
        const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors', // standard for Google Apps Script Web Apps — response will be "opaque"
          headers: {
            'Content-Type': 'text/plain', // Must be text/plain for no-cors mode — application/json is not a "simple" header and gets blocked
          },
          body: JSON.stringify(payload),
        });
        // Note: with mode:'no-cors', response.status is always 0 and body is unreadable (opaque response)
        // This is expected behaviour — it does NOT mean the request failed.
        console.log('[ModalContext] ✅ Fetch completed. Response type:', response.type, '| Status:', response.status);
        console.log('[ModalContext] ℹ️  Opaque response is EXPECTED with no-cors — check your Google Sheet directly to confirm data arrived.');
      } catch (err) {
        console.error('[ModalContext] ❌ Fetch error (network-level failure):', err);
      }
    } else {
      console.warn('[ModalContext] ⚠️ No webhook URL set — simulating delay only, data NOT saved.');
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    console.log('[ModalContext] 🎉 Submission flow complete.');
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        isSubmitting,
        isSuccess,
        submitReservation,
        resetModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
