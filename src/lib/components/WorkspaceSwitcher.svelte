<script lang="ts">
  import { currentWorkspace, workspaces } from '$lib/stores/workspace';
  import { createEventDispatcher } from 'svelte';
  import type { Workspace } from '$lib/types';

  const dispatch = createEventDispatcher<{
    switch: Workspace;
  }>();

  let dropdownRef: HTMLDivElement;
  let isOpen = false;

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      isOpen = false;
    }
  }

  function selectWorkspace(workspace: Workspace) {
    currentWorkspace.set(workspace);
    isOpen = false;
    dispatch('switch', workspace);
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dropdown" bind:this={dropdownRef}>
  <button 
    class="btn btn-ghost gap-2" 
    on:click={() => isOpen = !isOpen}
  >
    <i class="fas fa-folder-open"></i>
    <span class="truncate max-w-[200px]">{$currentWorkspace?.name || '选择工作区'}</span>
    <i class="fas fa-chevron-{isOpen ? 'up' : 'down'}"></i>
  </button>
  
  {#if isOpen}
    <ul 
      class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-64 max-h-[60vh] overflow-y-auto"
      style="top: 100%; margin-top: 0.5rem;"
    >
      {#each $workspaces as workspace}
        <li>
          <button 
            class="btn btn-ghost justify-start gap-2 {$currentWorkspace?.id === workspace.id ? 'bg-base-300' : ''}"
            on:click={() => selectWorkspace(workspace)}
          >
            <i class="fas fa-folder{$currentWorkspace?.id === workspace.id ? '-open' : ''}"></i>
            <span class="truncate">{workspace.name}</span>
          </button>
        </li>
      {:else}
        <li class="text-center py-2 text-base-content/50">暂无工作区</li>
      {/each}
    </ul>
  {/if}
</div>
