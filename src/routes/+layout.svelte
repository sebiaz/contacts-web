<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { LayoutLoad } from './$types';

  export const load: LayoutLoad = async () => {
    // Could load global data here if needed
  };
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4" role="navigation" aria-label="Main navigation">
  <div class="container">
    <a class="navbar-brand fw-bold d-flex align-items-center gap-2" href="/contacts">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      Contacts Manager
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/contacts" aria-current={$page.url.pathname === '/contacts' ? 'page' : undefined}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
            Contacts
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/health" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="me-1" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            API Health
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<main class="container" role="main">
  <slot />
</main>

<footer class="footer mt-auto py-3 bg-light border-top" role="contentinfo">
  <div class="container text-center text-muted small">
    Contacts Manager &mdash; Go API + SvelteKit Frontend
  </div>
</footer>