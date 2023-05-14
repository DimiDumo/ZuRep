<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  onMount(() => {
    goto(`/${$page.params.redirectPath}`);
  });
</script>

<h1>Success! Redirecting...</h1>
