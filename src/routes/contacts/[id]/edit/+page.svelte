<script lang="ts">
  import { goto } from '$app/navigation';
  import ContactForm from '$lib/components/contacts/ContactForm.svelte';
  import { page } from '$app/stores';

  export let data: {
    form: import('sveltekit-superforms').SuperValidated<import('$lib/utils/validation').ContactFormData>;
    contact: import('$lib/api/types').Contact;
  };
</script>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h3 mb-0">Edit Contact</h1>
    <p class="text-muted small mb-0">{data.contact.first_name} {data.contact.last_name}</p>
  </div>
  <a href="/contacts/{data.contact.id}" class="btn btn-outline-secondary">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
    Cancel
  </a>
</div>

{#if $page.status === 500}
  <div class="alert alert-danger" role="alert">
    An unexpected error occurred. Please try again.
  </div>
{/if}

<ContactForm
  initialData={data.form}
  mode="edit"
  on:cancel={() => goto(`/contacts/${data.contact.id}`)}
/>