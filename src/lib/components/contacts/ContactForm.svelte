<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SuperValidated } from 'sveltekit-superforms';
  import { contactSchema, type ContactFormData } from '$lib/utils/validation';
  import Input from '../ui/Input.svelte';
  import Button from '../ui/Button.svelte';
  import type { CreateContactRequest, UpdateContactRequest } from '$lib/api/types';

  export let form: SuperValidated<ContactFormData>;
  export let mode: 'create' | 'edit' = 'create';
  export let loading = false;

  const dispatch = createEventDispatcher<{
    submit: CreateContactRequest | UpdateContactRequest;
    cancel: void;
  }>();

  // Access reactive values
  $: formValue = $form;
  $: formErrors = $errors;
  $: formValid = $valid;

  function handleSubmit() {
    const isValid = formValid;
    if (!isValid) return;

    const data: CreateContactRequest | UpdateContactRequest = {
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      email: formValue.email,
      phone: formValue.phone,
      address: formValue.address,
      company: formValue.company,
      job_title: formValue.job_title,
      notes: formValue.notes,
    };

    dispatch('submit', data);
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<form use:enhance on:submit|preventDefault={handleSubmit} novalidate class="needs-validation">
  <div class="row g-3">
    <div class="col-md-6">
      <Input
        label="First Name"
        bind:value={formValue.first_name}
        name="first_name"
        required
        placeholder="John"
        error={formErrors.first_name?.[0]}
      />
    </div>
    <div class="col-md-6">
      <Input
        label="Last Name"
        bind:value={formValue.last_name}
        name="last_name"
        required
        placeholder="Doe"
        error={formErrors.last_name?.[0]}
      />
    </div>
    <div class="col-md-6">
      <Input
        label="Email"
        type="email"
        bind:value={formValue.email}
        name="email"
        required
        placeholder="john.doe@example.com"
        error={formErrors.email?.[0]}
      />
    </div>
    <div class="col-md-6">
      <Input
        label="Phone"
        type="tel"
        bind:value={formValue.phone}
        name="phone"
        placeholder="+1-555-0123"
        error={formErrors.phone?.[0]}
      />
    </div>
    <div class="col-12">
      <Input
        label="Address"
        as="textarea"
        bind:value={formValue.address}
        name="address"
        placeholder="123 Main St, City, State"
        rows={2}
        error={formErrors.address?.[0]}
      />
    </div>
    <div class="col-md-6">
      <Input
        label="Company"
        bind:value={formValue.company}
        name="company"
        placeholder="Acme Corp"
        error={formErrors.company?.[0]}
      />
    </div>
    <div class="col-md-6">
      <Input
        label="Job Title"
        bind:value={formValue.job_title}
        name="job_title"
        placeholder="Software Engineer"
        error={formErrors.job_title?.[0]}
      />
    </div>
    <div class="col-12">
      <Input
        label="Notes"
        as="textarea"
        bind:value={formValue.notes}
        name="notes"
        placeholder="Additional notes..."
        rows={4}
        error={formErrors.notes?.[0]}
      />
    </div>
  </div>

  <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
    <Button variant="secondary" on:click={handleCancel} disabled={loading} ariaLabel="Cancel">
      Cancel
    </Button>
    <Button variant="primary" type="submit" loading={loading} ariaLabel={mode === 'create' ? 'Create Contact' : 'Save Changes'}>
      {mode === 'create' ? 'Create Contact' : 'Save Changes'}
    </Button>
  </div>
</form>