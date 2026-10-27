<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Table from '../ui/Table.svelte';
  import { formatDate, truncate, getInitials } from '$lib/utils/format';
  import type { Contact } from '$lib/api/types';

  export let contacts: Contact[] = [];
  export let loading = false;

  const dispatch = createEventDispatcher<{
    view: Contact;
    edit: Contact;
    delete: Contact;
  }>();

  const headers = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone_number', label: 'Phone', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'created_at', label: 'Created', sortable: true },
  ];
</script>

<Table
  {headers}
  rows={contacts}
  keyField="id"
  {loading}
  emptyMessage="No contacts found. Create your first contact to get started."
  rowClickable
  on:click={(e) => dispatch('view', e.detail.row as Contact)}
>
  <snippet name="cell-name" let:row>
    <div class="d-flex align-items-center gap-2">
      <div class="avatar-circle bg-primary text-white d-flex align-items-center justify-content-center fw-medium"
           style="width: 36px; height: 36px; font-size: 0.875rem;"
           aria-hidden="true">
        {getInitials(row.first_name, row.last_name)}
      </div>
      <div>
        <div class="fw-medium">{row.first_name} {row.last_name}</div>
        {#if row.job_title}
          <small class="text-muted">{truncate(row.job_title, 30)}</small>
        {/if}
      </div>
    </div>
  </snippet>

  <snippet name="cell-email" let:row>
    <a href="mailto:{row.email}" class="text-decoration-none">{row.email}</a>
  </snippet>

  <snippet name="cell-phone_number" let:row>
    <span class="font-monospace small">{formatPhone(row.phone_number)}</span>
  </snippet>

  <snippet name="cell-company" let:row>
    <span class="text-truncate d-inline-block" style="max-width: 150px;">{row.company || '—'}</span>
  </snippet>

  <snippet name="cell-created_at" let:row>
    <span class="small text-muted">{formatDate(row.created_at)}</span>
  </snippet>

  <snippet name="actions" let:row>
    <div class="btn-group btn-group-sm" role="group" aria-label="Contact actions">
      <button
        class="btn btn-outline-secondary"
        on:click={(e) => { e.stopPropagation(); dispatch('view', row); }}
        aria-label="View {row.first_name} {row.last_name}"
        title="View"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
      <button
        class="btn btn-outline-secondary"
        on:click={(e) => { e.stopPropagation(); dispatch('edit', row); }}
        aria-label="Edit {row.first_name} {row.last_name}"
        title="Edit"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </button>
      <button
        class="btn btn-outline-danger"
        on:click={(e) => { e.stopPropagation(); dispatch('delete', row); }}
        aria-label="Delete {row.first_name} {row.last_name}"
        title="Delete"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  </snippet>
</Table>

<script lang="ts" context="module">
  import { formatPhone } from '$lib/utils/format';
</script>