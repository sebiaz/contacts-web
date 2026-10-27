// @ts-nocheck
import type { Actions, PageServerLoad } from './$types';
import { api } from '$lib/api/client';
import { contactSchema } from '$lib/utils/validation';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
  const form = await superValidate(zod(contactSchema));
  return { form };
};

export const actions = {
  default: async ({ request }: import('./$types').RequestEvent) => {
    const form = await superValidate(request, zod(contactSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const contact = await api.contacts.create(form.data);
      throw redirect(303, `/contacts/${contact.id}`);
    } catch (err) {
      if (err instanceof Response || (err as any)?.status === 303) throw err;
      return message(form, 'Failed to create contact. Please try again.', { status: 500 });
    }
  },
};;null as any as PageServerLoad;;null as any as Actions;