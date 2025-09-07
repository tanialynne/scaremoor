declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'get' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export {};