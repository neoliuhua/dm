<script>
  /**
   * Input 组件
   * 支持多种状态的输入框
   */
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let type = "text";
  export let value = "";
  export let placeholder = "";
  export let label = undefined;
  export let name = undefined;
  export let id = undefined;
  export let disabled = false;
  export let readonly = false;
  export let error = undefined;
  export let success = false;
  export let required = false;
  export let fullWidth = true;
  
  function handleInput(event) {
    value = event.target.value;
    dispatch('input', { value });
  }
  
  function handleChange(event) {
    dispatch('change', { value });
  }
  
  function handleFocus(event) {
    dispatch('focus', event);
  }
  
  function handleBlur(event) {
    dispatch('blur', event);
  }
</script>

<div class="w-full" class:w-full={fullWidth}>
  {#if label}
    <label 
      for={id} 
      class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
    >
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="relative">
    <input
      {type}
      {name}
      {id}
      {placeholder}
      {disabled}
      {readonly}
      {required}
      value={value}
      on:input={handleInput}
      on:change={handleChange}
      on:focus={handleFocus}
      on:blur={handleBlur}
      class="block w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2"
      class:border-gray-300={!error && !success}
      class:dark:border-gray-600={!error && !success}
      class:focus:border-blue-500={!error && !success}
      class:focus:ring-blue-500={!error && !success}
      class:border-red-500={error}
      class:focus:border-red-500={error}
      class:focus:ring-red-500={error}
      class:border-green-500={success && !error}
      class:focus:border-green-500={success && !error}
      class:focus:ring-green-500={success && !error}
      class:opacity-60={disabled}
      class:cursor-not-allowed={disabled}
      {...$$restProps}
    />
  </div>
  
  {#if error}
    <p class="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
  {/if}
</div> 