<script lang="ts">
  export let headers: { key: string; label: string; sortable?: boolean }[] = [];
  export let rows: Record<string, unknown>[] = [];
  export let keyField = 'id';
  export let striped = true;
  export let hover = true;
  export let bordered = false;
  export let emptyMessage = 'No data available';
  export let loading = false;
  export let rowClickable = false;
</script>

<div class="table-responsive">
  {#if loading}
    <div class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted">Loading data...</p>
    </div>
  {:else if rows.length === 0}
    <div class="text-center py-5 empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
      <p class="mb-0">{emptyMessage}</p>
    </div>
  {:else}
    <table class="table" class:table-striped={striped} class:table-hover={hover} class:table-bordered={bordered}>
      <thead>
        <tr>
          {#each headers as header}
            <th scope="col" class={header.sortable ? 'sortable' : ''}>
              {header.label}
            </th>
          {/each}
          <th scope="col" class="text-end" style="width: 120px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row[keyField])}
          <tr class={rowClickable ? 'clickable' : ''}>
            {#each headers as header}
              <td>
                <slot name={`cell-${header.key}`} {row}>
                  {JSON.stringify(row[header.key] ?? '—')}
                </slot>
              </td>
            {/each}
            <td class="text-end">
              <slot name="actions" {row} />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .table th.sortable {
    cursor: pointer;
    user-select: none;
  }
  .table th.sortable:hover {
    background-color: #f3f4f6;
  }
  .table tr.clickable {
    cursor: pointer;
  }
  .table tr.clickable:hover {
    background-color: #f9fafb;
  }
</style>