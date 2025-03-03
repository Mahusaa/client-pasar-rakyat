// hooks/useFoodCounterSSE.ts
"use client"
import { useState, useEffect } from 'react';
import type { FoodCounter } from '@/types/food-types';

export function useFoodCounterSSE() {
  const [foodCounters, setFoodCounters] = useState<Record<string, FoodCounter>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let eventSource: EventSource;

    const connectSSE = () => {
      setLoading(true);

      // Create EventSource connection
      eventSource = new EventSource('/api/sse');

      // Handle connection open
      eventSource.onopen = () => {
        console.log('SSE connection established');
      };

      // Handle messages
      eventSource.onmessage = (event) => {
        try {
          const eventData = JSON.parse(event.data);

          switch (eventData.type) {
            case 'initial':
              setFoodCounters(eventData.data || {});
              setLoading(false);
              break;

            case 'added':
              setFoodCounters(prev => ({
                ...prev,
                [eventData.id]: eventData.data
              }));
              break;

            case 'changed':
              setFoodCounters(prev => ({
                ...prev,
                [eventData.id]: eventData.data
              }));
              break;

            case 'removed':
              setFoodCounters(prev => {
                const updated = { ...prev };
                delete updated[eventData.id];
                return updated;
              });
              break;
          }
        } catch (err) {
          console.error('Error processing SSE message:', err);
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      };

      // Handle errors
      eventSource.onerror = (err) => {
        console.error('SSE connection error:', err);
        setError(new Error('SSE connection failed'));
        setLoading(false);
        eventSource.close();

        // Attempt to reconnect after delay
        setTimeout(() => {
          connectSSE();
        }, 5000);
      };
    };

    connectSSE();

    // Clean up on unmount
    return () => {
      if (eventSource) {
        console.log('Closing SSE connection');
        eventSource.close();
      }
    };
  }, []);

  // Convert record to array for easier usage
  const foodCountersArray = Object.values(foodCounters);

  return { foodCounters: foodCountersArray, loading, error };
}
