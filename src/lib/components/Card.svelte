<script>
  /**
   * Card 组件
   * 用于展示内容的卡片容器
   */
  export let title = undefined;
  export let subtitle = undefined;
  export let hoverable = false;
  export let padding = "p-6";
</script>

<div
  class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden {padding}"
  class:transition-shadow={hoverable}
  class:duration-200={hoverable}
  class:hover:shadow-md={hoverable}
  {...$$restProps}
>
  {#if title || subtitle}
    <div class="mb-4">
      {#if title}
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      {/if}
      
      {#if subtitle}
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      {/if}
    </div>
  {/if}
  
  <slot />
  
  {#if $$slots.footer}
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <slot name="footer" />
    </div>
  {/if}
</div> 