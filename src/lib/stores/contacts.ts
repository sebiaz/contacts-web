import { writable, derived, get } from 'svelte/store';
import type { Contact, PaginationMeta, SearchParams } from '$lib/api/types';
import { config } from '$lib/config';

// State stores
export const contacts = writable<Contact[]>([]);
export const pagination = writable<PaginationMeta>({
  page: 1,
  page_size: config.defaultPageSize,
  total_items: 0,
  total_pages: 0,
});
export const searchQuery = writable<string>('');
export const loading = writable<boolean>(false);
export const error = writable<string | null>(null);
export const selectedContact = writable<Contact | null>(null);
export const submitting = writable<boolean>(false);

// Derived stores
export const hasContacts = derived(contacts, ($contacts) => $contacts.length > 0);
export const isEmpty = derived(
  [contacts, loading, searchQuery],
  ([$contacts, $loading, $searchQuery]) => !$loading && $contacts.length === 0 && !$searchQuery
);
export const isSearchEmpty = derived(
  [contacts, loading, searchQuery],
  ([$contacts, $loading, $searchQuery]) => !$loading && $contacts.length === 0 && $searchQuery
);

// Actions
export function setContacts(newContacts: Contact[]) {
  contacts.set(newContacts);
}

export function setPagination(newPagination: PaginationMeta) {
  pagination.set(newPagination);
}

export function setSearchQuery(query: string) {
  searchQuery.set(query);
}

export function setLoading(isLoading: boolean) {
  loading.set(isLoading);
}

export function setError(err: string | null) {
  error.set(err);
}

export function setSelectedContact(contact: Contact | null) {
  selectedContact.set(contact);
}

export function setSubmitting(isSubmitting: boolean) {
  submitting.set(isSubmitting);
}

export function resetPagination() {
  pagination.update((p) => ({ ...p, page: 1 }));
}

export function updateContactInList(updatedContact: Contact) {
  contacts.update((list) =>
    list.map((c) => (c.id === updatedContact.id ? updatedContact : c))
  );
}

export function removeContactFromList(id: number) {
  contacts.update((list) => list.filter((c) => c.id !== id));
}

export function addContactToList(newContact: Contact) {
  contacts.update((list) => [newContact, ...list]);
}