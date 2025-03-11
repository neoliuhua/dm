<script lang="ts">
  import TopNav from '$lib/layouts/TopNav.svelte';
  import SideBar from '$lib/layouts/SideBar.svelte';
  import RightSideBar from '$lib/layouts/RightSideBar.svelte';
  import BottomBar from '$lib/layouts/BottomBar.svelte';

  let bottomFrameHeight = 100;
  let isResizingVertical = false;

  function handleVerticalMouseDown(event: MouseEvent) {
    isResizingVertical = true;
    document.addEventListener('mousemove', handleVerticalMouseMove);
    document.addEventListener('mouseup', handleVerticalMouseUp);
  }

  function handleVerticalMouseMove(event: MouseEvent) {
    if (!isResizingVertical) return;
    bottomFrameHeight = window.innerHeight - event.clientY;
  }

  function handleVerticalMouseUp() {
    isResizingVertical = false;
    document.removeEventListener('mousemove', handleVerticalMouseMove);
    document.removeEventListener('mouseup', handleVerticalMouseUp);
  }
</script>

<div class="h-screen w-full flex flex-col">
  <header class="sticky top-0 z-10">
    <TopNav />
  </header>

  <div class="flex flex-1">
    <aside class="w-64">
      <SideBar />
    </aside>

    <main class="flex-1 overflow-auto p-4 flex flex-col">
      <div class="flex-1 overflow-auto">
        <slot />
      </div>
      <div class="resizable-vertical bottom-frame bottom-frame-style">
        <div class="resizer-vertical" on:mousedown={handleVerticalMouseDown} />
        <div class="h-full p-4 overflow-auto">
          Workspace Bottom Frame Content
        </div>
      </div>
    </main>

    <aside class="w-64">
      <RightSideBar />
    </aside>
  </div>

  <footer>
    <BottomBar />
  </footer>
</div>

<style>
  main {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .resizable-vertical {
    position: relative;
    overflow-y: hidden;
  }

  .resizer-vertical {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 5px;
    cursor: ns-resize;
    background-color: #ccc;
    margin-top: -5px;
  }

  .bottom-frame-style {
    border-top: 1px solid #ccc;
  }
</style>
