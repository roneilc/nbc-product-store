import { environment } from './environment';

export function getApiUrl(): string {
  try {
    const selected = (typeof localStorage !== 'undefined') ? localStorage.getItem('selectedBackend') : null;
    type BackendKey = keyof typeof environment.backends;
    const backendKey = (selected || environment.defaultBackend || 'dotnet') as BackendKey;
    const base = environment.backends?.[backendKey];
    const prefixes: Record<BackendKey, string> = {
      dotnet: '/net',
      java: '/java'
    } as const;
    if (base) {
      const prefix = prefixes[backendKey] || '';
      return `${base.replace(/\/$/, '')}${prefix}`;
    }
  } catch (e) {
  }
  return environment.apiUrl;
}

export function setSelectedBackend(key: string) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selectedBackend', key);
    }
  } catch (e) {
  }
}
