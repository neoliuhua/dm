<script lang="ts">
  import TopNav from './TopNav.svelte';
  import SideBar from '$lib/layouts/SideBar.svelte';
  import RightSideBar from '$lib/layouts/RightSideBar.svelte';
  import BottomBar from './BottomBar.svelte';

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

<div class="flex flex-col h-screen overflow-hidden">
  <!-- 顶部导航栏 -->
  <TopNav />
  
  <!-- 主内容区域 -->
  <main class="flex-1 overflow-hidden">
    <slot></slot>
  </main>
  
  <!-- 底部状态栏 -->
  <BottomBar />
</div>

<style>
  /* 确保全屏布局 */
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

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
