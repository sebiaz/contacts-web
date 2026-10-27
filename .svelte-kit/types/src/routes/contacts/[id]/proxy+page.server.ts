// @ts-nocheck
import type { PageServerLoad } from './$types';
import { api } from '$lib/api/client';
import { error } from '@sveltejs/kit';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    throw error(404, 'Contact not found');
  }

  try {
    const contact = await api.contacts.get(id);
    return { contact };
  } catch (err: any) {
    if (err.status === 404) {
      throw error(404, 'Contact not found');
    }
    console.error('Failed to load contact:', err);
    throw error(500, 'Failed to load contact');
  }
};