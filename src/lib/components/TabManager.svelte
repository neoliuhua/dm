<script lang="ts">
  import { writable, type Writable } from 'svelte/store';

  export interface Tab {
    id: string;
    title: string;
    icon?: string;
    component: any;
    dirty?: boolean;
  }

  export let tabs: Writable<Tab[]> = writable([]);
  export let activeTab: Writable<string | null> = writable(null);

  function switchTab(tabId: string) {
    activeTab.set(tabId);
  }

  function closeTab(tabId: string, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    
    tabs.update(currentTabs => {
      const tabIndex = currentTabs.findIndex(tab => tab.id === tabId);
      if (tabIndex === -1) return currentTabs;

      const newTabs = currentTabs.filter(tab => tab.id !== tabId);
      if ($activeTab === tabId) {
        // 如果关闭的是当前标签，切换到下一个或上一个标签
        const nextTab = newTabs[tabIndex] || newTabs[tabIndex - 1];
        activeTab.set(nextTab?.id || null);
      }
      return newTabs;
    });
  }
</script>

<div class="flex flex-col h-full">
  <div class="tabs tabs-lifted bg-base-200 border-b border-base-300">
    {#each $tabs as tab}
      <div 
        class="tab gap-2 {$activeTab === tab.id ? 'tab-active' : ''} hover:bg-base-300"
        on:click={() => switchTab(tab.id)}
      >
        {#if tab.icon}
          <i class="{tab.icon}"></i>
        {/if}
        <span class="{tab.dirty ? 'font-bold' : ''}">{tab.title}</span>
        <button 
          class="btn btn-ghost btn-xs hover:bg-error hover:text-white rounded-full"
          on:click={(e) => closeTab(tab.id, e)}
          title="关闭"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    {/each}
  </div>

  <div class="flex-1 overflow-auto">
    {#if $activeTab && $tabs.find(t => t.id === $activeTab)}
      <svelte:component this={$tabs.find(t => t.id === $activeTab)?.component} />
    {:else}
      <div class="flex items-center justify-center h-full text-base-content/50">
        <p>没有打开的标签页</p>
      </div>
    {/if}
  </div>
</div>
