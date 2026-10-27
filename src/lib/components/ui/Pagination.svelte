<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let currentPage = 1;
  export let pageSize = 20;
  export let totalItems = 0;
  export let totalPages = 0;
  export let maxVisiblePages = 5;
  export let showPageSizeSelector = true;
  export let pageSizeOptions = [10, 20, 50, 100];

  const dispatch = createEventDispatcher<{
    pageChange: number;
    pageSizeChange: number;
  }>();

  function getVisiblePages(): number[] {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  function goToPage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    dispatch('pageChange', page);
  }

  function changePageSize(size: number) {
    dispatch('pageSizeChange', size);
  }

  function previousPage() {
    goToPage(currentPage - 1);
  }

  function nextPage() {
    goToPage(currentPage + 1);
  }
</script>

{#if totalPages > 1}
  <nav aria-label="Pagination" class="d-flex justify-content-between align-items-center flex-wrap gap-2">
    <div class="pagination-info text-muted small">
      Showing
      <strong>{Math.min((currentPage - 1) * pageSize + 1, totalItems)}</strong>
      to
      <strong>{Math.min(currentPage * pageSize, totalItems)}</strong>
      of <strong>{totalItems}</strong> contacts
    </div>

    <ul class="pagination pagination-sm mb-0">
      <li class="page-item" class:disabled={currentPage === 1}>
        <button
          class="page-link"
          on:click={previousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </li>

      {#each getVisiblePages() as page}
        <li class="page-item" class:active={page === currentPage}>
          <button
            class="page-link"
            on:click={() => goToPage(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label="Page {page}"
          >
            {page}
          </button>
        </li>
      {/each}

      <li class="page-item" class:disabled={currentPage === totalPages}>
        <button
          class="page-link"
          on:click={nextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </li>
    </ul>

    {#if showPageSizeSelector}
      <div class="page-size-selector">
        <label for="page-size" class="visually-hidden">Items per page</label>
        <select
          id="page-size"
          class="form-select form-select-sm"
          style="width: auto;"
          value={pageSize}
          on:change={(e) => changePageSize(Number(e.currentTarget.value))}
          aria-label="Items per page"
        >
          {#each pageSizeOptions as size}
            <option value={size}>{size} per page</option>
          {/each}
        </select>
      </div>
    {/if}
  </nav>
{/if}