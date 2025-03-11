<script>
  /**
   * Badge 组件
   * 用于状态、标签展示的小徽章
   */
  export let variant = "default"; // default, success, warning, danger, info
  export let size = "md"; // sm, md, lg
  export let rounded = false;
</script>

<span
  class="inline-flex items-center font-medium"
  class:px-2.5={size === "md"}
  class:py-0.5={size === "md"}
  class:text-xs={size === "md"}
  
  class:px-2={size === "sm"}
  class:py-0.5={size === "sm"}
  class:text-xs={size === "sm"}
  
  class:px-3={size === "lg"}
  class:py-0.5={size === "lg"}
  class:text-sm={size === "lg"}
  
  class:rounded={!rounded}
  class:rounded-full={rounded}
  
  class:bg-gray-100={variant === "default"}
  class:text-gray-800={variant === "default"}
  class:dark:bg-gray-700={variant === "default"}
  class:dark:text-gray-300={variant === "default"}
  
  class:bg-green-100={variant === "success"}
  class:text-green-800={variant === "success"}
  class:dark:bg-green-900={variant === "success"}
  class:dark:text-green-300={variant === "success"}
  
  class:bg-yellow-100={variant === "warning"}
  class:text-yellow-800={variant === "warning"}
  class:dark:bg-yellow-900={variant === "warning"}
  class:dark:text-yellow-300={variant === "warning"}
  
  class:bg-red-100={variant === "danger"}
  class:text-red-800={variant === "danger"}
  class:dark:bg-red-900={variant === "danger"}
  class:dark:text-red-300={variant === "danger"}
  
  class:bg-blue-100={variant === "info"}
  class:text-blue-800={variant === "info"}
  class:dark:bg-blue-900={variant === "info"}
  class:dark:text-blue-300={variant === "info"}
  
  {...$$restProps}
>
  <slot />
</span> 