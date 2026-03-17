const BASE_URL = "https://pokeapi.co/api/v2"

async function request<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const apiClient = {
  get: <T>(endpoint: string, init?: RequestInit) =>
    request<T>(endpoint, { ...init, method: "GET" }),
}
