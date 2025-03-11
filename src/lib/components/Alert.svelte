<script>
  /**
   * Alert 组件
   * 用于提示和警告信息
   */
  import { CheckCircle, Warning, Info, X } from 'phosphor-svelte';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let type = "info"; // info, success, warning, error
  export let title = undefined;
  export let dismissible = false;
  
  function dismiss() {
    dispatch('dismiss');
  }
  
  $: icon = {
    info: Info,
    success: CheckCircle,
    warning: Warning,
    error: Warning
  }[type];
  
  $: iconClass = type === "info" 
    ? "text-blue-400 dark:text-blue-300" 
    : type === "success" 
      ? "text-green-400 dark:text-green-300" 
      : type === "warning" 
        ? "text-yellow-400 dark:text-yellow-300" 
        : "text-red-400 dark:text-red-300";
</script>

<div
  class="p-4 rounded-md mb-4"
  class:bg-blue-50={type === "info"}
  class:dark:bg-blue-900={type === "info"}
  class:bg-green-50={type === "success"}
  class:dark:bg-green-900={type === "success"}
  class:bg-yellow-50={type === "warning"}
  class:dark:bg-yellow-900={type === "warning"}
  class:bg-red-50={type === "error"}
  class:dark:bg-red-900={type === "error"}
  {...$$restProps}
>
  <div class="flex">
    <div class="flex-shrink-0">
      <svelte:component 
        this={icon} 
        size={24} 
        weight="fill"
        class={iconClass}
      />
    </div>
    
    <div class="ml-3 flex-1">
      {#if title}
        <h3 
          class="text-sm font-medium"
          class:text-blue-800={type === "info"}
          class:dark:text-blue-200={type === "info"}
          class:text-green-800={type === "success"}
          class:dark:text-green-200={type === "success"}
          class:text-yellow-800={type === "warning"}
          class:dark:text-yellow-200={type === "warning"}
          class:text-red-800={type === "error"}
          class:dark:text-red-200={type === "error"}
        >
          {title}
        </h3>
      {/if}
      
      <div 
        class="text-sm mt-2"
        class:text-blue-700={type === "info"}
        class:dark:text-blue-200={type === "info"}
        class:text-green-700={type === "success"}
        class:dark:text-green-200={type === "success"}
        class:text-yellow-700={type === "warning"}
        class:dark:text-yellow-200={type === "warning"}
        class:text-red-700={type === "error"}
        class:dark:text-red-200={type === "error"}
      >
        <slot />
      </div>
    </div>
    
    {#if dismissible}
      <div class="ml-auto pl-3">
        <button 
          type="button"
          class="inline-flex rounded-md focus:outline-none"
          on:click={dismiss}
          class:text-blue-500={type === "info"}
          class:hover:text-blue-600={type === "info"}
          class:dark:text-blue-400={type === "info"}
          class:dark:hover:text-blue-300={type === "info"}
          class:text-green-500={type === "success"}
          class:hover:text-green-600={type === "success"}
          class:dark:text-green-400={type === "success"}
          class:dark:hover:text-green-300={type === "success"}
          class:text-yellow-500={type === "warning"}
          class:hover:text-yellow-600={type === "warning"}
          class:dark:text-yellow-400={type === "warning"}
          class:dark:hover:text-yellow-300={type === "warning"}
          class:text-red-500={type === "error"}
          class:hover:text-red-600={type === "error"}
          class:dark:text-red-400={type === "error"}
          class:dark:hover:text-red-300={type === "error"}
        >
          <X size={20} weight="bold" />
        </button>
      </div>
    {/if}
  </div>
</div> 