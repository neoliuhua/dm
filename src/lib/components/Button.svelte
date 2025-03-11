<script>
  /**
   * Button 组件
   * 支持不同变体和大小的按钮
   */
  export let type = "button";
  export let variant = "primary"; // primary, secondary, outline, ghost, danger
  export let size = "md"; // sm, md, lg
  export let fullWidth = false;
  export let disabled = false;
  export let loading = false;
  
  // 计算样式类
  $: variantClasses = variant === "primary" 
    ? "bg-blue-600 text-white" 
    : variant === "secondary" 
      ? "bg-gray-200 text-gray-900" 
      : variant === "outline" 
        ? "bg-transparent border border-gray-300 text-gray-700" 
        : variant === "ghost" 
          ? "bg-transparent text-gray-700" 
          : "bg-red-600 text-white";
          
  $: sizeClasses = size === "sm" 
    ? "px-3 py-2 text-sm" 
    : size === "lg" 
      ? "px-5 py-2.5 text-lg" 
      : "px-4 py-2 text-base";
</script>

<button
  {type}
  {disabled}
  class="inline-flex items-center justify-center font-medium rounded-md {variantClasses} {sizeClasses}"
  class:opacity-70={disabled || loading}
  class:cursor-not-allowed={disabled || loading}
  class:w-full={fullWidth}
  {...$$restProps}
  on:click
>
  {#if loading}
    <svg class="animate-spin mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {/if}
  <slot />
</button> 