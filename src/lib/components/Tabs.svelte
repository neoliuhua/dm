<script>
  /**
   * Tabs 组件
   * 用于内容分组展示
   */
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let tabs = [];
  export let activeTab = 0;
  export let variant = "default"; // default, pills, underline
  
  function setActiveTab(index) {
    activeTab = index;
    dispatch('change', { index, tab: tabs[index] });
  }
</script>

<div>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <nav class="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
      {#each tabs as tab, i}
        <button
          on:click={() => setActiveTab(i)}
          class="py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
          class:text-blue-600={activeTab === i && variant === "default"}
          class:dark:text-blue-400={activeTab === i && variant === "default"}
          class:border-b-2={variant === "default"}
          class:border-blue-500={activeTab === i && variant === "default"}
          class:border-transparent={activeTab !== i && variant === "default"}
          class:text-gray-500={activeTab !== i && variant === "default"}
          class:hover:text-gray-700={activeTab !== i && variant === "default"}
          class:dark:text-gray-400={activeTab !== i && variant === "default"}
          class:dark:hover:text-gray-300={activeTab !== i && variant === "default"}
          
          class:text-white={activeTab === i && variant === "pills"}
          class:bg-blue-600={activeTab === i && variant === "pills"}
          class:rounded-md={variant === "pills"}
          class:px-3={variant === "pills"}
          class:py-2={variant === "pills"}
          class:text-gray-500={activeTab !== i && variant === "pills"}
          class:hover:text-gray-700={activeTab !== i && variant === "pills"}
          class:dark:text-gray-400={activeTab !== i && variant === "pills"}
          class:dark:hover:text-gray-300={activeTab !== i && variant === "pills"}
          
          class:border-b-2={variant === "underline"}
          class:border-gray-500={activeTab === i && variant === "underline"}
          class:text-gray-900={activeTab === i && variant === "underline"}
          class:dark:text-white={activeTab === i && variant === "underline"}
          class:border-transparent={activeTab !== i && variant === "underline"}
          class:text-gray-500={activeTab !== i && variant === "underline"}
          class:hover:text-gray-700={activeTab !== i && variant === "underline"}
          class:hover:border-gray-300={activeTab !== i && variant === "underline"}
          class:dark:text-gray-400={activeTab !== i && variant === "underline"}
          class:dark:hover:text-gray-300={activeTab !== i && variant === "underline"}
          aria-current={activeTab === i ? 'page' : undefined}
        >
          {tab.label}
        </button>
      {/each}
    </nav>
  </div>
  
  <div class="mt-4">
    <slot {activeTab} />
  </div>
</div> 