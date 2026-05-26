import { useState, useEffect, useCallback } from 'react';

export function useMetricHistory(initialValue: number, maxSamples = 60) {
  const [history, setHistory] = useState<number[]>([]);

  const push = useCallback(
    (value: number) => {
      setHistory((prev) => {
        const next = [...prev, value];
        return next.length > maxSamples ? next.slice(next.length - maxSamples) : next;
      });
    },
    [maxSamples],
  );

  useEffect(() => {
    if (initialValue != null && !isNaN(initialValue)) {
      push(initialValue);
    }
  }, [initialValue, push]);

  return history;
}
