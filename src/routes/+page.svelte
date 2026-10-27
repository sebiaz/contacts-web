<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  onMount(() => {
    goto('/contacts', { replaceState: true });
  });
</script>

<div class="d-flex justify-content-center align-items-center vh-100">
  <div class="spinner-border text-primary" role="status" aria-label="Loading...">
    <span class="visually-hidden">Redirecting to contacts...</span>
  </div>
</div>