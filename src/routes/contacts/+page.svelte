<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import ContactTable from '$lib/components/contacts/ContactTable.svelte';
  import SearchBar from '$lib/components/contacts/SearchBar.svelte';
  import Pagination from '$lib/components/ui/Pagination.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { contactStore, paginationStore, searchQueryStore, loadingStore, errorStore } from '$lib/stores/contacts';
  import type { Contact, PaginationMeta } from '$lib/api/types';

  export let data: {
    contacts: Contact[];
    pagination: PaginationMeta;
    searchQuery: string;
  };

  let showCreateModal = false;
  let currentContacts = $state(data.contacts);
  let currentPagination = $state(data.pagination);
  let currentSearchQuery = $state(data.searchQuery);
  let currentLoading = $state(false);
  let currentError = $state<string | null>(null);

  onMount(() => {
    contactStore.set(data.contacts);
    paginationStore.set(data.pagination);
    searchQueryStore.set(data.searchQuery);
  });

  function handleSearch(query: string) {
    currentSearchQuery = query;
    currentLoading = true;
    currentError = null;

    const params = new URLSearchParams({
      q: query,
      page: '1',
      page_size: String(currentPagination.page_size),
      sort_by: 'created_at',
      sort_dir: 'desc',
    });

    goto(`/contacts?${params.toString()}`, { replaceState: true });
  }

  function handleSearchClear() {
    currentSearchQuery = '';
    goto('/contacts', { replaceState: true });
  }

  function handlePageChange(page: number) {
    const params = new URLSearchParams({
      q: currentSearchQuery || '',
      page: String(page),
      page_size: String(currentPagination.page_size),
      sort_by: 'created_at',
      sort_dir: 'desc',
    });
    goto(`/contacts?${params.toString()}`, { replaceState: true });
  }

  function handlePageSizeChange(pageSize: number) {
    const params = new URLSearchParams({
      q: currentSearchQuery || '',
      page: '1',
      page_size: String(pageSize),
      sort_by: 'created_at',
      sort_dir: 'desc',
    });
    goto(`/contacts?${params.toString()}`, { replaceState: true });
  }

  function handleViewContact(contact: Contact) {
    goto(`/contacts/${contact.id}`);
  }

  function handleEditContact(contact: Contact) {
    goto(`/contacts/${contact.id}/edit`);
  }

  function handleDeleteContact(contact: Contact) {
    if (confirm(`Are you sure you want to delete "${contact.first_name} ${contact.last_name}"?`)) {
      // Will be handled by the form action on the detail page
      goto(`/contacts/${contact.id}/delete`);
    }
  }

  function openCreateModal() {
    showCreateModal = true;
  }
</script>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
  <div>
    <h1 class="h3 mb-0">Contacts</h1>
    <p class="text-muted small mb-0">Manage your contacts</p>
  </div>
  <Button variant="primary" on:click={openCreateModal}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
    New Contact
  </Button>
</div>

{#if currentError}
  <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
    {currentError}
    <button type="button" class="btn-close" aria-label="Dismiss" on:click={() => currentError = null}></button>
  </div>
{/if}

<SearchBar
  initialQuery={currentSearchQuery}
  placeholder="Search contacts by name, email, phone, or company..."
  debounceMs={300}
  on:search={handleSearch}
  on:clear={handleSearchClear}
/>

<ContactTable
  contacts={currentContacts}
  loading={currentLoading}
  on:view={handleViewContact}
  on:edit={handleEditContact}
  on:delete={handleDeleteContact}
/>

<Pagination
  currentPage={currentPagination.page}
  pageSize={currentPagination.page_size}
  totalItems={currentPagination.total_items}
  totalPages={currentPagination.total_pages}
  on:pageChange={handlePageChange}
  on:pageSizeChange={handlePageSizeChange}
/>

{#if showCreateModal}
  <script module>
    import { goto } from '$app/navigation';
  </script>
  {#await import('./create/+page.svelte') then { default: CreatePage }}
    <svelte:window on:keydown={e => e.key === 'Escape' && (showCreateModal = false)} />
    <div class="modal-overlay" on:click={() => showCreateModal = false}>
      <div class="modal-content" on:click|stopPropagation={() => {}}>
        <CreatePage
          on:submit={async (data) => {
            // Handle form submission
          }}
          on:cancel={() => showCreateModal = false}
        />
      </div>
    </div>
  {/await}
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    padding: 1rem;
  }
  .modal-content {
    background: white;
    border-radius: 0.75rem;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
</style>