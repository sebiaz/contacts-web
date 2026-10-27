import type { APIError } from './types';

const API_BASE = '/api/v1';

export class APIErrorExtended extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, string>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = data.error as APIError | undefined;
    throw new APIErrorExtended(
      response.status,
      error?.code || 'ERROR',
      error?.message || 'Request failed',
      error?.details
    );
  }

  return data.data ?? data;
}

export const api = {
  contacts: {
    list: (params: Record<string, string | number | boolean | undefined> = {}) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
        }
      });
      const query = searchParams.toString();
      return request<{ contacts: import('./types').Contact[]; count: number }>(
        `/contacts${query ? `?${query}` : ''}`
      );
    },

    get: (id: number) =>
      request<import('./types').Contact>(`/contacts/${id}`),

    create: (data: import('./types').CreateContactRequest) =>
      request<import('./types').Contact>('/contacts', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    update: (id: number, data: import('./types').UpdateContactRequest) =>
      request<import('./types').Contact>(`/contacts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    delete: (id: number) =>
      request<void>(`/contacts/${id}`, {
        method: 'DELETE',
      }),
  },
};