<script lang="ts">
  import { formatDate, formatPhone, getInitials } from '$lib/utils/format';
  import type { Contact } from '$lib/api/types';

  export let contact: Contact | null = null;
  export let editable = false;
  export let onEdit: (contact: Contact) => void = () => {};
  export let onDelete: (contact: Contact) => void = () => {};
  export let onClose: () => void = () => {};
</script>

{#if contact}
  <div class="card contact-card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-3">
        <div class="avatar-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
             style="width: 48px; height: 48px; font-size: 1.25rem;"
             aria-hidden="true">
          {getInitials(contact.first_name, contact.last_name)}
        </div>
        <div>
          <h5 class="mb-0">{contact.first_name} {contact.last_name}</h5>
          {#if contact.job_title || contact.company}
            <small class="text-muted">
              {#if contact.job_title}{contact.job_title}{/if}
              {#if contact.job_title && contact.company} at {/if}
              {#if contact.company}{contact.company}{/if}
            </small>
          {/if}
        </div>
      </div>
      {#if editable}
        <div class="btn-group btn-group-sm" role="group">
          <button class="btn btn-outline-secondary" on:click={() => onEdit(contact)} aria-label="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn btn-outline-danger" on:click={() => onDelete(contact)} aria-label="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      {:else}
        <button class="btn btn-sm btn-outline-secondary" on:click={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      {/if}
    </div>

    <div class="card-body">
      <dl class="row mb-0">
        <dt class="col-sm-3 text-muted small">Email</dt>
        <dd class="col-sm-9 mb-3"><a href="mailto:{contact.email}" class="text-decoration-none">{contact.email}</a></dd>

        <dt class="col-sm-3 text-muted small">Phone</dt>
        <dd class="col-sm-9 mb-3"><a href="tel:{contact.phone_number}" class="font-monospace text-decoration-none">{formatPhone(contact.phone_number)}</a></dd>

        {#if contact.address}
          <dt class="col-sm-3 text-muted small">Address</dt>
          <dd class="col-sm-9 mb-3">{contact.address}</dd>
        {/if}

        {#if contact.notes}
          <dt class="col-sm-3 text-muted small">Notes</dt>
          <dd class="col-sm-9 mb-3"><pre class="mb-0 small text-muted" style="white-space: pre-wrap;">{contact.notes}</pre></dd>
        {/if}

        <dt class="col-sm-3 text-muted small">Created</dt>
        <dd class="col-sm-9 mb-3 text-muted small">{formatDate(contact.created_at)}</dd>

        <dt class="col-sm-3 text-muted small">Updated</dt>
        <dd class="col-sm-9 mb-3 text-muted small">{formatDate(contact.updated_at)}</dd>
      </dl>
    </div>
  </div>
{/if}