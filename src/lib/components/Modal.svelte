<script lang="ts">
  /**
   * Modal 组件
   * 用于对话框和弹出内容
   */
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { X } from 'phosphor-svelte';
  
  const dispatch = createEventDispatcher();
  
  export let open = false;
  export let title: string | undefined = undefined;
  export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = "md";
  export let closeOnClickOutside = true;
  export let closeOnEsc = true;
  
  let dialog: HTMLElement | null = null;
  
  function close() {
    open = false;
    dispatch('close');
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (closeOnEsc && e.key === 'Escape' && open) {
      close();
    }
  }
  
  function handleOutsideClick(e: MouseEvent) {
    if (closeOnClickOutside && dialog && !dialog.contains(e.target as Node) && open) {
      close();
    }
  }
  
  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<svelte:window on:mousedown={handleOutsideClick} />

{#if open}
  <div 
    class="fixed inset-0 z-50 overflow-y-auto"
    transition:fade={{ duration: 200 }}
  >
    <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <div 
        bind:this={dialog}
        class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all"
        class:max-w-sm={size === "sm"}
        class:max-w-md={size === "md"}
        class:max-w-lg={size === "lg"}
        class:max-w-2xl={size === "xl"}
        class:w-full={size === "full"}
        class:max-w-full={size === "full"}
        class:h-screen={size === "full"}
        class:rounded-none={size === "full"}
        transition:scale={{ start: 0.95, duration: 200 }}
      >
        {#if title}
          <div class="flex items-start justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              class="ml-auto bg-transparent text-gray-400 hover:text-gray-500 rounded-md"
              on:click={close}
            >
              <X size={24} />
            </button>
          </div>
        {/if}
        
        <div class:p-4={size !== "full"} class:p-6={size === "full"}>
          <slot />
        </div>
        
        {#if $$slots.footer}
          <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <slot name="footer" {close} />
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if} 