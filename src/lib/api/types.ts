export interface Contact {
  id: number;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  company: string;
  job_title: string;
  notes: string;
}

export interface PaginatedResponse<T> {
  contacts: T[];
  count: number;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

export interface CreateContactRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  job_title?: string;
  notes?: string;
}

export interface UpdateContactRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  job_title?: string;
  notes?: string;
}

export interface SearchParams {
  q?: string;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_dir?: 'asc' | 'desc';
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface APIResponse<T> {
  data?: T;
  error?: APIError;
  meta?: unknown;
}