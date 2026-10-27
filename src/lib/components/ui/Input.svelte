<script lang="ts">
  import type { HTMLInputAttributes, HTMLTextareaAttributes, HTMLSelectAttributes } from 'svelte/elements';

  export let label: string | undefined;
  export let type: 'text' | 'email' | 'tel' | 'url' | 'password' | 'number' | 'search' = 'text';
  export let placeholder = '';
  export let required = false;
  export let disabled = false;
  export let error: string | undefined;
  export let hint: string | undefined;
  export let value = '';
  export let name: string | undefined;
  export let id: string = `input-${Math.random().toString(36).slice(2)}`;
  export let ariaDescribedBy: string | undefined;

  // For textarea
  export let rows = 3;
  export let as: 'input' | 'textarea' | 'select' = 'input';
  export let options: { value: string; label: string }[] = [];
</script>

<div class="mb-3">
  {#if label}
    <label for={id} class="form-label">
      {label}
      {#if required}
        <span class="text-danger" aria-hidden="true">*</span>
        <span class="visually-hidden">(required)</span>
      {/if}
    </label>
  {/if}

  {#if as === 'textarea'}
    <textarea
      class="form-control"
      class:is-invalid={!!error}
      {id}
      {name}
      {placeholder}
      {required}
      {disabled}
      {rows}
      {value}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : (hint ? `${id}-hint` : ariaDescribedBy)}
      {...$$restProps}
    />
  {:else if as === 'select'}
    <select
      class="form-select"
      class:is-invalid={!!error}
      {id}
      {name}
      {required}
      {disabled}
      {value}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : (hint ? `${id}-hint` : ariaDescribedBy)}
      {...$$restProps}
    >
      <option value="" disabled selected>{placeholder}</option>
      {#each options as opt}
        <option value={opt.value}>{opt.label}</option>
      {/each}
    </select>
  {:else}
    <input
      type={type}
      class="form-control"
      class:is-invalid={!!error}
      {id}
      {name}
      {placeholder}
      {required}
      {disabled}
      {value}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : (hint ? `${id}-hint` : ariaDescribedBy)}
      {...$$restProps}
    />
  {/if}

  {#if error}
    <div id={`${id}-error`} class="invalid-feedback" role="alert">{error}</div>
  {:else if hint}
    <div id={`${id}-hint`} class="form-text">{hint}</div>
  {/if}
</div>