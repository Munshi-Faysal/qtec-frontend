export function createUrl(endpoint: string): string {
  // Base URL from .env
  const baseUrl = "https://sales.dermolive.com.bd/api"
  // Join base URL and endpoint safely
  return `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
}