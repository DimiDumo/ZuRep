<script lang="ts">
  import { enhance } from '$app/forms';
  import { FormItemType } from '$lib/types';
  import type { PageData } from './$types';
  export let data: PageData;

  let isLoading = false;
  let justCopied = false;
  let errors: { [key: string]: string } = {};

  function onSubmit() {
    isLoading = true;
    return async ({ result }) => {
      isLoading = false;
      if (Object.keys(result.data.errors).length) {
        errors = result.data.errors;
      } else {
        errors = {};
        justCopied = true;
        setTimeout(() => {
          justCopied = false;
        }, 2000);
      }
    };
  }
</script>

<div class="flex flex-col items-center mt-10">
  <img
    src="https://v5.airtableusercontent.com/v1/16/16/1684022400000/di-nmKXd_ejrnN_1XctJBg/Xe49A2LwXsXEunMdYmdHns7TVhyQcrR039v0CabWD_D8fC4PYYIDjpeisd1Xw7iiVBRLKRchJhhdCPb4qPCmqw/YDcZTWrZVd4BtWjt_87cK857CiKk5gu-X3XXi4yViC0"
    alt="Zuzalu"
    class="h-20"
  />
  <h1 class="text-2xl py-3">
    {data.feedback.title}
  </h1>
  <div class="alert shadow-lg w-1/2 mb-5">
    <div>
      <span class="whitespace-pre-line">{data.feedback.description}</span>
    </div>
  </div>
  <form method="POST" class="w-1/2 mb-9" use:enhance={onSubmit}>
    {#each data.feedback.formItems as field}
      {#if field.type === FormItemType.string}
        <div class="form-control w-full mb-9">
          <p class="ml-1" class:mb-2={!field.description}>
            {field.name}
            {#if field.required}
              <span class="text-error">*</span>
            {/if}
          </p>
          {#if field.description}
            <label class="label" for={field.columnName}>
              <span class="label-text">{field.description}</span>
            </label>
          {/if}
          <input
            name={field.columnName}
            type="text"
            placeholder="Enter text..."
            class="input input-bordered w-full"
            class:input-error={errors?.[field.name]}
          />
        </div>
        {#if errors?.[field.name]}
          <label class="label" for={field.name}>
            <span class="label-text text-red-500">{errors[field.name]}</span>
          </label>
        {/if}
      {:else if field.type === FormItemType.text}
        <div class="form-control w-full mb-9">
          <p class="ml-1" class:mb-2={!field.description}>
            {field.name}
            {#if field.required}
              <span class="text-error">*</span>
            {/if}
          </p>
          {#if field.description}
            <label class="label" for={field.columnName}>
              <span class="label-text">{field.description}</span>
            </label>
          {/if}
          <textarea
            name={field.columnName}
            placeholder="Enter text..."
            class="textarea textarea-bordered w-full"
            class:input-error={errors?.[field.name]}
          />
        </div>
        {#if errors?.[field.name]}
          <label class="label" for={field.name}>
            <span class="label-text text-red-500">{errors[field.name]}</span>
          </label>
        {/if}
      {:else if field.type === FormItemType.boolean}
        <div class="form-control">
          <p class="ml-1" class:mb-2={!field.description}>
            {field.name}
          </p>
          {#if field.description}
            <label class="label" for={field.columnName}>
              <span class="label-text">{field.description}</span>
            </label>
          {/if}
          <input
            name={field.name}
            type="checkbox"
            class="checkbox checkbox-primary"
          />
        </div>
      {:else if field.type === FormItemType.radio}
        <div class="form-control mb-9">
          <p class="ml-1" class:mb-3={!field.description}>
            {field.name}
          </p>
          {#if field.description}
            <label class="label mb-2" for={field.columnName}>
              <span class="label-text">{field.description}</span>
            </label>
          {/if}
          {#each field.options as option}
            <label class="cursor-pointer flex items-center mb-3">
              <input
                type="radio"
                name={field.columnName}
                class="radio radio-primary"
                value={option}
              />
              <span class="label-text ml-3">{option}</span>
            </label>
          {/each}
        </div>
      {/if}
    {/each}

    {#if errors?.__restricedError}
      <div class="alert alert-error shadow-lg mt-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
          <span>{errors.__restricedError}</span>
        </div>
      </div>
    {/if}

    <div class="flex justify-end w-full mt-5">
      <button
        class="btn btn-primary"
        class:loading={isLoading}
        disabled={isLoading}
      >
        {#if justCopied}
          <input type="checkbox" checked class="checkbox checkbox-primary" />
        {:else}
          Submit
        {/if}
      </button>
    </div>
  </form>
</div>
