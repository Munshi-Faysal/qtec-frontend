export function createUrl(endpoint: string): string {
  // Base URL from .env
  const baseUrl = "https://localhost:7039/api"
  // Join base URL and endpoint safely
  return `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
}