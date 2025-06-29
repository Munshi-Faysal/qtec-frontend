export function createUrl(endpoint: string): string {
  // Base URL from .env
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
  // Join base URL and endpoint safely
  return `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
}