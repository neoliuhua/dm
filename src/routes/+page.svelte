<script>
  import AppLayout from '../lib/layouts/AppLayout.svelte';
  import { onMount } from 'svelte';
  
  // 侧边栏状态
  let leftSidebarWidth = 240;
  let rightSidebarWidth = 240;
  let showTerminal = true;
  let terminalHeight = 200;
  
  // 拖动状态
  let isDraggingLeft = false;
  let isDraggingRight = false;
  let isDraggingTerminal = false;
  let startX = 0;
  let startY = 0;
  
  // 处理左侧边栏拖动
  function startLeftDrag(e) {
    isDraggingLeft = true;
    startX = e.clientX;
    document.body.style.cursor = 'ew-resize';
    document.addEventListener('mousemove', handleLeftDrag);
    document.addEventListener('mouseup', stopLeftDrag);
  }
  
  function handleLeftDrag(e) {
    if (isDraggingLeft) {
      const deltaX = e.clientX - startX;
      leftSidebarWidth = Math.max(120, Math.min(480, leftSidebarWidth + deltaX));
      startX = e.clientX;
    }
  }
  
  function stopLeftDrag() {
    isDraggingLeft = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleLeftDrag);
    document.removeEventListener('mouseup', stopLeftDrag);
  }
  
  // 处理右侧边栏拖动
  function startRightDrag(e) {
    isDraggingRight = true;
    startX = e.clientX;
    document.body.style.cursor = 'ew-resize';
    document.addEventListener('mousemove', handleRightDrag);
    document.addEventListener('mouseup', stopRightDrag);
  }
  
  function handleRightDrag(e) {
    if (isDraggingRight) {
      const deltaX = e.clientX - startX;
      rightSidebarWidth = Math.max(120, Math.min(480, rightSidebarWidth - deltaX));
      startX = e.clientX;
    }
  }
  
  function stopRightDrag() {
    isDraggingRight = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleRightDrag);
    document.removeEventListener('mouseup', stopRightDrag);
  }
  
  // 处理终端拖动
  function startTerminalDrag(e) {
    isDraggingTerminal = true;
    startY = e.clientY;
    document.body.style.cursor = 'ns-resize';
    document.addEventListener('mousemove', handleTerminalDrag);
    document.addEventListener('mouseup', stopTerminalDrag);
  }
  
  function handleTerminalDrag(e) {
    if (isDraggingTerminal) {
      const deltaY = e.clientY - startY;
      terminalHeight = Math.max(100, Math.min(500, terminalHeight - deltaY));
      startY = e.clientY;
    }
  }
  
  function stopTerminalDrag() {
    isDraggingTerminal = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleTerminalDrag);
    document.removeEventListener('mouseup', stopTerminalDrag);
  }
  
  // 切换终端显示状态
  function toggleTerminal() {
    showTerminal = !showTerminal;
  }
  
  onMount(() => {
    // 初始化
  });
</script>

<AppLayout>
  <div class="flex flex-col h-full">
    <!-- 主区域（左右侧边栏 + 中间工作区） -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧边栏 -->
      <div style="width: {leftSidebarWidth}px;" class="bg-gray-100 flex flex-col border-r">
        <div class="p-2 flex-1 overflow-auto">
          <div class="bg-white h-full rounded shadow">
            <!-- 左侧边栏内容 -->
            <h3 class="p-2 text-sm font-medium border-b">项目资源管理器</h3>
            <div class="p-2">
              <div class="text-xs text-gray-700">左侧边栏内容</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 左侧边栏拖动条 -->
      <div 
        class="w-1 bg-gray-200 hover:bg-blue-400 cursor-ew-resize" 
        on:mousedown={startLeftDrag}>
      </div>
      
      <!-- 中央区域（工作区 + 终端） -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 工作区 -->
        <div class="flex-1 overflow-auto p-2 bg-gray-50">
          <div class="bg-white h-full rounded shadow p-4">
            <h2 class="text-lg font-medium mb-4">工作区</h2>
            <div class="text-sm text-gray-700">
              主工作区内容
            </div>
          </div>
        </div>
        
        <!-- 终端拖动条 -->
        {#if showTerminal}
          <div 
            class="h-1 bg-gray-200 hover:bg-blue-400 cursor-ns-resize" 
            on:mousedown={startTerminalDrag}>
          </div>
        {/if}
        
        <!-- 终端区域 -->
        {#if showTerminal}
          <div style="height: {terminalHeight}px;" class="overflow-hidden bg-gray-800">
            <div class="flex justify-between items-center px-2 py-1 bg-gray-700 text-gray-200">
              <div class="flex space-x-2">
                <button class="px-2 py-0.5 text-xs hover:bg-gray-600 rounded">终端</button>
                <button class="px-2 py-0.5 text-xs hover:bg-gray-600 rounded">问题</button>
                <button class="px-2 py-0.5 text-xs hover:bg-gray-600 rounded">输出</button>
              </div>
              <button on:click={toggleTerminal} class="text-xs hover:text-white">×</button>
            </div>
            <div class="p-2 text-green-400 font-mono text-sm overflow-auto" style="height: calc(100% - 28px);">
              <div>$ npm run dev</div>
              <div>> 开发服务器启动在 localhost:3000</div>
              <div>> </div>
              <div class="animate-pulse">&nbsp;_</div>
            </div>
          </div>
        {:else}
          <div class="h-8 flex items-center justify-center bg-gray-200">
            <button 
              on:click={toggleTerminal} 
              class="text-xs text-gray-700 hover:text-gray-900 flex items-center px-3 py-1 hover:bg-gray-300 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm3.293 9.707a1 1 0 001.414 0L10 11.414l2.293 2.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 000 1.414z" clip-rule="evenodd" />
              </svg>
              显示终端
            </button>
          </div>
        {/if}
      </div>
      
      <!-- 右侧边栏拖动条 -->
      <div 
        class="w-1 bg-gray-200 hover:bg-blue-400 cursor-ew-resize" 
        on:mousedown={startRightDrag}>
      </div>
      
      <!-- 右侧边栏 -->
      <div style="width: {rightSidebarWidth}px;" class="bg-gray-100 flex flex-col border-l">
        <div class="p-2 flex-1 overflow-auto">
          <div class="bg-white h-full rounded shadow">
            <!-- 右侧边栏内容 -->
            <h3 class="p-2 text-sm font-medium border-b">插件与属性</h3>
            <div class="p-2">
              <div class="text-xs text-gray-700">右侧边栏内容</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</AppLayout>

<style>
  :global(body) {
    overflow: hidden;
  }
</style>

