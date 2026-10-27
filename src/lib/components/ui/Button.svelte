<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export let variant: 'primary' | 'secondary' | 'success' | 'danger' | 'outline' | 'ghost' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled = false;
  export let loading = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let fullWidth = false;
  export let ariaLabel: string | undefined;
  export let ariaDescribedBy: string | undefined;

  const baseClasses = 'btn d-inline-flex align-items-center justify-content-center gap-1';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    outline: 'btn-outline-primary',
    ghost: 'btn-ghost',
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  $: classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-100' : ''}`;
</script>

<button
  type={type}
  class={classes}
  {disabled}
  {ariaLabel}
  {ariaDescribedBy}
  {...$$restProps}
>
  {#if loading}
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span>
  {/if}
  <slot />
</button>

<style>
  .btn-ghost {
    background: transparent;
    border: 1px solid transparent;
    color: var(--bs-body-color);
  }
  .btn-ghost:hover {
    background: var(--bs-gray-200);
    border-color: var(--bs-gray-300);
  }
  .btn-ghost:focus-visible {
    outline: 2px solid var(--bs-primary);
    outline-offset: 2px;
  }
</style>