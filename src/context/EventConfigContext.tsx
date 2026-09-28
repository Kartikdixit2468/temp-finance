import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createEventConfig,
  DEFAULT_EVENT_CONFIG,
  type EventConfig,
  type EventConfigSource,
} from '../config/event';

interface EventConfigContextValue {
  eventConfig: EventConfig;
}

const EventConfigContext = createContext<EventConfigContextValue | undefined>(undefined);

export const EventConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [eventConfig, setEventConfig] = useState<EventConfig>(DEFAULT_EVENT_CONFIG);

  useEffect(() => {
    const controller = new AbortController();

    const loadEventConfig = async () => {
      try {
        const response = await fetch('/event.json', {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) return;

        const source = (await response.json()) as EventConfigSource;
        setEventConfig(createEventConfig(source));
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn('[EventConfig] Using bundled fallback configuration.', error);
        }
      }
    };

    void loadEventConfig();
    return () => controller.abort();
  }, []);

  const value = useMemo(() => ({ eventConfig }), [eventConfig]);

  return <EventConfigContext.Provider value={value}>{children}</EventConfigContext.Provider>;
};

export const useEventConfig = (): EventConfigContextValue => {
  const context = useContext(EventConfigContext);
  if (!context) {
    throw new Error('useEventConfig must be used within an EventConfigProvider');
  }
  return context;
};
