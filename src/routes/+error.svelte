<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center h-full">
  <div class="text-center">
    <h1 class="text-4xl font-bold">{$page.status}</h1>
    <p class="text-xl">{$page.error?.message}</p>
  </div>
</div>
