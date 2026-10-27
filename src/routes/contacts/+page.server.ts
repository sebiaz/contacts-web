import type { PageServerLoad } from './$types';
import { api } from '$lib/api/client';
import { searchSchema } from '$lib/utils/validation';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, fetch }) => {
  const params = {
    q: url.searchParams.get('q') || undefined,
    page: parseInt(url.searchParams.get('page') || '1'),
    page_size: parseInt(url.searchParams.get('page_size') || '20'),
    sort_by: url.searchParams.get('sort_by') || 'created_at',
    sort_dir: (url.searchParams.get('sort_dir') as 'asc' | 'desc') || 'desc',
  };

  const validated = searchSchema.safeParse(params);
  if (!validated.success) {
    throw error(400, 'Invalid search parameters');
  }

  try {
    const response = await api.contacts.list(validated.data);
    return {
      contacts: response.contacts,
      pagination: {
        page: validated.data.page,
        page_size: validated.data.page_size,
        total_items: response.count,
        total_pages: Math.ceil(response.count / validated.data.page_size),
      },
      searchQuery: validated.data.q || '',
    };
  } catch (err) {
    console.error('Failed to load contacts:', err);
    throw error(500, 'Failed to load contacts');
  }
};