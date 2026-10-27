<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount, onDestroy } from 'svelte';

  export let message = '';
  export let type: 'success' | 'error' | 'info' | 'warning' = 'info';
  export let duration = 4000;
  export let dismissible = true;

  const dispatch = createEventDispatcher<{
    dismiss: void;
  }>();

  let visible = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const typeClasses = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    info: 'bg-info text-dark',
    warning: 'bg-warning text-dark',
  };

  const icons = {
    success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12" /></svg>',
    error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>',
    warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>',
  };

  function show() {
    visible = true;
    if (duration > 0) {
      timeoutId = setTimeout(() => {
        hide();
      }, duration);
    }
  }

  function hide() {
    visible = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    dispatch('dismiss');
  }

  onMount(() => {
    show();
  });

  onDestroy(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
</script>

{#if visible}
  <div class="toast {typeClasses[type]}" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header {typeClasses[type]} border-0">
      <span class="me-2" style="display: flex; align-items: center;">{@html icons[type]}</span>
      <strong class="me-auto">Notification</strong>
      {#if dismissible}
        <button type="button" class="btn-close btn-close-white" aria-label="Close" on:click={hide}></button>
      {/if}
    </div>
    <div class="toast-body">{message}</div>
  </div>
{/if}

<style>
  .toast {
    min-width: 300px;
    max-width: 450px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .toast:not(:last-child) {
    margin-bottom: 0.5rem;
  }
</style>