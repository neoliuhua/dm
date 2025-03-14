<script lang="ts">
  export let width = '250px';
  export let minWidth = '100px';
  export let maxWidth = '500px';
  export let side: 'left' | 'right' = 'left';

  let isResizing = false;
  let startX: number;
  let startWidth: number;
  let panel: HTMLElement;

  function startResize(e: MouseEvent) {
    isResizing = true;
    startX = e.pageX;
    startWidth = panel.offsetWidth;
  }

  function handleResize(e: MouseEvent) {
    if (!isResizing) return;
    
    const diff = side === 'left' 
      ? e.pageX - startX 
      : startX - e.pageX;
    
    const newWidth = Math.min(
      Math.max(startWidth + diff, parseInt(minWidth)),
      parseInt(maxWidth)
    );
    
    width = `${newWidth}px`;
  }

  function stopResize() {
    isResizing = false;
  }
</script>

<svelte:window 
  on:mousemove={handleResize} 
  on:mouseup={stopResize}
/>

<div 
  bind:this={panel}
  class="relative"
  style="width: {width}"
>
  <div class="h-full">
    <slot />
  </div>
  <div
    class="absolute {side === 'left' ? 'right-0' : 'left-0'} top-0 h-full w-1 cursor-col-resize hover:bg-primary/50 active:bg-primary"
    on:mousedown={startResize}
  />
  <div
    class="absolute {side === 'left' ? 'right-0' : 'left-0'} top-0 w-1 h-full cursor-col-resize bg-base-300 hover:bg-primary"
    on:mousedown={startResize}
  />
</div>
