<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { debounce } from '$lib/utils/debounce';
  import Input from '../ui/Input.svelte';
  import Button from '../ui/Button.svelte';

  export let placeholder = 'Search contacts by name, email, phone, or company...';
  export let initialQuery = '';
  export let debounceMs = 300;

  const dispatch = createEventDispatcher<{
    search: string;
    clear: void;
  }>();

  let query = $state(initialQuery);
  let debouncedSearch = debounce((q: string) => {
    dispatch('search', q);
  }, debounceMs);

  function handleInput(value: string) {
    query = value;
    debouncedSearch(value);
  }

  function handleClear() {
    query = '';
    dispatch('clear');
    dispatch('search', '');
  }
</script>

<div class="input-group mb-3">
  <span class="input-group-text bg-white border-end-0" aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </span>
  <Input
    type="search"
    bind:value={query}
    placeholder={placeholder}
    on:input={(e) => handleInput(e.currentTarget.value)}
    aria-label="Search contacts"
    aria-describedby="search-hint"
  />
  {#if query}
    <button
      type="button"
      class="btn btn-outline-secondary border-start-0"
      on:click={handleClear}
      aria-label="Clear search"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  {/if}
</div>

<div id="search-hint" class="form-text text-end">
  Type to search (name, email, phone, company) — clears on Escape
</div>