// @ts-nocheck
import type { Actions, PageServerLoad } from './$types';
import { api } from '$lib/api/client';
import { contactSchema } from '$lib/utils/validation';
import { fail, redirect, error } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    throw error(404, 'Contact not found');
  }

  try {
    const contact = await api.contacts.get(id);
    const form = await superValidate(
      {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone_number,
        address: contact.address,
        company: contact.company,
        job_title: contact.job_title,
        notes: contact.notes,
      },
      zod(contactSchema)
    );
    return { form, contact };
  } catch (err: any) {
    if (err.status === 404) {
      throw error(404, 'Contact not found');
    }
    throw error(500, 'Failed to load contact');
  }
};

export const actions = {
  default: async ({ request, params }: import('./$types').RequestEvent) => {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      throw error(404, 'Contact not found');
    }

    const form = await superValidate(request, zod(contactSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await api.contacts.update(id, form.data);
      throw redirect(303, `/contacts/${id}`);
    } catch (err) {
      if (err instanceof Response || (err as any)?.status === 303) throw err;
      return message(form, 'Failed to update contact. Please try again.', { status: 500 });
    }
  },

  delete: async ({ params }: import('./$types').RequestEvent) => {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      throw error(404, 'Contact not found');
    }

    try {
      await api.contacts.delete(id);
      throw redirect(303, '/contacts');
    } catch (err) {
      if (err instanceof Response || (err as any)?.status === 303) throw err;
      throw error(500, 'Failed to delete contact');
    }
  },
};;null as any as Actions;