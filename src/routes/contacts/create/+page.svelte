<script lang="ts">
  import { goto } from '$app/navigation';
  import ContactForm from '$lib/components/contacts/ContactForm.svelte';
  import { page } from '$app/stores';

  export let data: {
    form: import('sveltekit-superforms').SuperValidated<import('$lib/utils/validation').ContactFormData>;
  };
</script>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h3 mb-0">Create Contact</h1>
    <p class="text-muted small mb-0">Add a new contact to your address book</p>
  </div>
  <a href="/contacts" class="btn btn-outline-secondary">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
    Back to List
  </a>
</div>

{#if $page.status === 500}
  <div class="alert alert-danger" role="alert">
    An unexpected error occurred. Please try again.
  </div>
{/if}

<ContactForm
  initialData={data.form}
  mode="create"
  on:cancel={() => goto('/contacts')}
/>