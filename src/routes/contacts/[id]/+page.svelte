<script lang="ts">
  import { goto } from '$app/navigation';
  import ContactCard from '$lib/components/contacts/ContactCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { page } from '$app/stores';

  export let data: {
    contact: import('$lib/api/types').Contact;
  };

  function handleEdit() {
    goto(`/contacts/${data.contact.id}/edit`);
  }

  function handleDelete() {
    if (confirm(`Are you sure you want to delete "${data.contact.first_name} ${data.contact.last_name}"?`)) {
      // Use form action for deletion
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `?/delete`;
      document.body.appendChild(form);
      form.submit();
    }
  }

  function handleBack() {
    goto('/contacts');
  }
</script>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h3 mb-0">{data.contact.first_name} {data.contact.last_name}</h1>
    <p class="text-muted small mb-0">Contact details</p>
  </div>
  <div class="d-flex gap-2">
    <Button variant="outline" on:click={handleBack}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1" aria-hidden="true">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      Back
    </Button>
    <Button variant="outline" on:click={handleEdit}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      Edit
    </Button>
  </div>
</div>

<ContactCard
  contact={data.contact}
  editable
  on:edit={handleEdit}
  on:delete={handleDelete}
  on:close={handleBack}
/>

<form method="POST" action="?/delete" class="d-none">
  <input type="hidden" name="_method" value="DELETE" />
</form>