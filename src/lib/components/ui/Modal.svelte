<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount, onDestroy } from 'svelte';
  import Button from './Button.svelte';

  export let open = false;
  export let title = '';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let centered = true;
  export let backdrop: boolean | 'static' = true;
  export let keyboard = true;
  export let hideCloseButton = false;

  const dispatch = createEventDispatcher<{
    close: void;
    confirm: void;
    cancel: void;
  }>();

  let modalElement: HTMLDivElement | null = null;
  let previousActiveElement: HTMLElement | null = null;

  const sizeClasses = {
    sm: 'modal-sm',
    md: '',
    lg: 'modal-lg',
    xl: 'modal-xl',
  };

  function handleKeydown(event: KeyboardEvent) {
    if (!keyboard || event.key !== 'Escape') return;
    close();
  }

  function handleBackdropClick(event: MouseEvent) {
    if (backdrop === 'static') return;
    if (event.target === modalElement) {
      close();
    }
  }

  function close() {
    if (backdrop === 'static') return;
    dispatch('close');
  }

  function confirm() {
    dispatch('confirm');
  }

  function cancel() {
    dispatch('cancel');
    close();
  }

  function trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !modalElement) return;

    const focusableElements = modalElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }

  onMount(() => {
    if (open) {
      previousActiveElement = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('keydown', trapFocus);
      // Focus first focusable element
      setTimeout(() => {
        const firstFocusable = modalElement?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }, 0);
    }
  });

  onDestroy(() => {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('keydown', trapFocus);
    previousActiveElement?.focus();
  });

  $: if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
</script>

{#if open}
  <div
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog"
    aria-modal="true"
    aria-labelledby={title ? 'modal-title' : undefined}
    aria-hidden="false"
    bind:this={modalElement}
    on:click={handleBackdropClick}
  >
    <div class="modal-dialog" role="document" class:modal-dialog-centered={centered} class:{sizeClasses[size]}>
      <div class="modal-content">
        {#if title}
          <div class="modal-header">
            <h5 class="modal-title" id="modal-title">{title}</h5>
            {!hideCloseButton && (
              <button
                type="button"
                class="btn-close"
                aria-label="Close"
                on:click={close}
              />
            )}
          </div>
        {/if}
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <Button variant="secondary" on:click={cancel}>
              Cancel
            </Button>
            <Button variant="primary" on:click={confirm}>
              Confirm
            </Button>
          </slot>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show" on:click={handleBackdropClick} />
{/if}