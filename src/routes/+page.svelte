<script lang="ts">
  import AppLayout from '../lib/layouts/AppLayout.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import "../style.css";
  
  // 类型定义
  interface FileTreeItem {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children?: FileTreeItem[];
    expanded?: boolean;
    icon?: string;
    extension?: string;
  }
  
  interface TabItem {
    id: string;
    title: string;
    content: string;
    path: string;
    active: boolean;
    icon?: string;
  }
  
  // 状态管理
  let leftSidebarWidth = 240;
  let rightSidebarWidth = 240;
  let showTerminal = true;
  let terminalHeight = 200;
  
  // 项目文件结构示例
  const fileTree: FileTreeItem[] = [
    {
      id: '1',
      name: 'my-tauri-app',
      type: 'folder',
      expanded: true,
      children: [
        {
          id: '2',
          name: 'src',
          type: 'folder',
          expanded: true,
          children: [
            {
              id: '3',
              name: 'lib',
              type: 'folder',
              expanded: true,
              children: [
                { id: '4', name: 'components', type: 'folder', children: [
                  { id: '5', name: 'Button.svelte', type: 'file', extension: 'svelte' },
                  { id: '6', name: 'Card.svelte', type: 'file', extension: 'svelte' }
                ]},
                { id: '7', name: 'layouts', type: 'folder', children: [
                  { id: '8', name: 'AppLayout.svelte', type: 'file', extension: 'svelte' },
                  { id: '9', name: 'TopNav.svelte', type: 'file', extension: 'svelte' },
                  { id: '10', name: 'BottomBar.svelte', type: 'file', extension: 'svelte' }
                ]}
              ]
            },
            {
              id: '11',
              name: 'routes',
              type: 'folder',
              children: [
                { id: '12', name: '+page.svelte', type: 'file', extension: 'svelte' },
                { id: '13', name: '+layout.svelte', type: 'file', extension: 'svelte' }
              ]
            }
          ]
        },
        { id: '14', name: 'package.json', type: 'file', extension: 'json' },
        { id: '15', name: 'tsconfig.json', type: 'file', extension: 'json' },
        { id: '16', name: 'vite.config.ts', type: 'file', extension: 'ts' },
        { id: '17', name: 'tailwind.config.js', type: 'file', extension: 'js' }
      ]
    }
  ];
  
  // 打开的标签页
  const tabs: TabItem[] = [
    { 
      id: '1', 
      title: 'AppLayout.svelte',
      path: 'src/lib/layouts/AppLayout.svelte',
      content: '// AppLayout component code...',
      active: true 
    },
    { 
      id: '2', 
      title: 'TopNav.svelte',
      path: 'src/lib/layouts/TopNav.svelte',
      content: '// TopNav component code...',
      active: false 
    }
  ];
  
  let activeTab = tabs[0];
  
  // 终端命令历史
  const terminalLines = [
    { text: '$ npm run tauri dev', type: 'command' },
    { text: '> trae-ui@0.1.0 tauri', type: 'output' },
    { text: '> tauri dev', type: 'output' },
    { text: '  执行 Svelte-Kit 开发服务器...', type: 'output' },
    { text: '  Svelte-Kit 服务器启动在 http://localhost:5173/', type: 'output' },
    { text: '  打包 Tauri 应用程序...', type: 'output' },
    { text: '  Tauri 应用程序已启动', type: 'output' }
  ];
  
  // 拖动状态
  let isDraggingLeft = false;
  let isDraggingRight = false;
  let isDraggingTerminal = false;
  let startX = 0;
  let startY = 0;
  
  // 处理左侧边栏拖动
  function startLeftDrag(e: MouseEvent): void {
    isDraggingLeft = true;
    startX = e.clientX;
    document.body.style.cursor = 'ew-resize';
    document.addEventListener('mousemove', handleLeftDrag);
    document.addEventListener('mouseup', stopLeftDrag);
  }
  
  function handleLeftDrag(e: MouseEvent): void {
    if (isDraggingLeft) {
      const deltaX = e.clientX - startX;
      leftSidebarWidth = Math.max(120, Math.min(480, leftSidebarWidth + deltaX));
      startX = e.clientX;
    }
  }
  
  function stopLeftDrag(): void {
    isDraggingLeft = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleLeftDrag);
    document.removeEventListener('mouseup', stopLeftDrag);
  }
  
  // 处理右侧边栏拖动
  function startRightDrag(e: MouseEvent): void {
    isDraggingRight = true;
    startX = e.clientX;
    document.body.style.cursor = 'ew-resize';
    document.addEventListener('mousemove', handleRightDrag);
    document.addEventListener('mouseup', stopRightDrag);
  }
  
  function handleRightDrag(e: MouseEvent): void {
    if (isDraggingRight) {
      const deltaX = e.clientX - startX;
      rightSidebarWidth = Math.max(120, Math.min(480, rightSidebarWidth - deltaX));
      startX = e.clientX;
    }
  }
  
  function stopRightDrag(): void {
    isDraggingRight = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleRightDrag);
    document.removeEventListener('mouseup', stopRightDrag);
  }
  
  // 处理终端拖动
  function startTerminalDrag(e: MouseEvent): void {
    isDraggingTerminal = true;
    startY = e.clientY;
    document.body.style.cursor = 'ns-resize';
    document.addEventListener('mousemove', handleTerminalDrag);
    document.addEventListener('mouseup', stopTerminalDrag);
  }
  
  function handleTerminalDrag(e: MouseEvent): void {
    if (isDraggingTerminal) {
      const deltaY = e.clientY - startY;
      terminalHeight = Math.max(100, Math.min(500, terminalHeight - deltaY));
      startY = e.clientY;
    }
  }
  
  function stopTerminalDrag(): void {
    isDraggingTerminal = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleTerminalDrag);
    document.removeEventListener('mouseup', stopTerminalDrag);
  }
  
  // 切换终端显示状态
  function toggleTerminal(): void {
    showTerminal = !showTerminal;
  }
  
  // 切换文件夹展开状态
  function toggleFolder(item: FileTreeItem): void {
    item.expanded = !item.expanded;
  }
  
  // 获取文件图标
  function getFileIcon(file: FileTreeItem): string {
    if (file.type === 'folder') {
      return file.expanded ? 'folder-open' : 'folder';
    }
    
    switch(file.extension) {
      case 'svelte': return 'svelte';
      case 'ts': return 'typescript';
      case 'js': return 'javascript';
      case 'json': return 'json';
      default: return 'file';
    }
  }
  
  // 处理文件点击
  function handleFileClick(file: FileTreeItem): void {
    if (file.type === 'folder') {
      toggleFolder(file);
    } else {
      // 打开文件逻辑
      console.log(`Opening file: ${file.name}`);
    }
  }
  
  // 切换标签页
  function switchTab(tab: TabItem): void {
    tabs.forEach(t => t.active = false);
    tab.active = true;
    activeTab = tab;
  }
  
  onMount(() => {
    // 初始化逻辑
  });
</script>

<AppLayout>
  <div class="flex flex-col h-full">
    <!-- 主区域（左右侧边栏 + 中间工作区） -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧边栏 -->
      <div style="width: {leftSidebarWidth}px;" class="bg-base-200 flex flex-col border-r">
        <div class="flex-none p-2 border-b border-gray-200 bg-base-100">
          <h4 class="font-medium text-sm">资源管理器</h4>
        </div>
        
        <div class="flex-1 overflow-auto p-2">
          <!-- 文件树 -->
          <div class="file-explorer">
            {#each fileTree as item}
              <div class="file-item">
                <div class="file-row cursor-pointer hover:bg-base-300 p-1 rounded flex items-center" on:click={() => handleFileClick(item)}>
                  <span class="mr-1 text-primary">
                    {#if item.type === 'folder'}
                      {#if item.expanded}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      {/if}
                    {:else}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                    {/if}
                  </span>
                  <span class="text-sm">{item.name}</span>
                </div>
                
                {#if item.type === 'folder' && item.expanded && item.children}
                  <div class="ml-4">
                    {#each item.children as child}
                      <div class="file-item">
                        <div class="file-row cursor-pointer hover:bg-base-300 p-1 rounded flex items-center" on:click={() => handleFileClick(child)}>
                          <span class="mr-1 text-primary">
                            {#if child.type === 'folder'}
                              {#if child.expanded}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                              {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                              {/if}
                            {:else}
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                            {/if}
                          </span>
                          <span class="text-sm">{child.name}</span>
                        </div>
                        
                        {#if child.type === 'folder' && child.expanded && child.children}
                          <div class="ml-4">
                            {#each child.children as grandchild}
                              <div class="file-item">
                                <div class="file-row cursor-pointer hover:bg-base-300 p-1 rounded flex items-center" on:click={() => handleFileClick(grandchild)}>
                                  <span class="mr-1 text-primary">
                                    {#if grandchild.type === 'folder'}
                                      {#if grandchild.expanded}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                      {:else}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                      {/if}
                                    {:else}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    {/if}
                                  </span>
                                  <span class="text-sm">{grandchild.name}</span>
                                </div>
                                
                                {#if grandchild.type === 'folder' && grandchild.expanded && grandchild.children}
                                  <div class="ml-4">
                                    {#each grandchild.children as greatgrandchild}
                                      <div class="file-row cursor-pointer hover:bg-base-300 p-1 rounded flex items-center" on:click={() => handleFileClick(greatgrandchild)}>
                                        <span class="mr-1 text-primary">
                                          {#if greatgrandchild.type === 'folder'}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                          {:else}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                          {/if}
                                        </span>
                                        <span class="text-sm">{greatgrandchild.name}</span>
                                      </div>
                                    {/each}
                                  </div>
                                {/if}
                              </div>
                            {/each}
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- 左侧边栏拖动条 -->
      <div 
        class="w-1 cursor-ew-resize hover:bg-primary active:bg-primary" 
        on:mousedown={startLeftDrag}>
      </div>
      
      <!-- 中央区域（工作区 + 终端） -->
      <div class="flex-1 flex flex-col overflow-hidden bg-base-100">
        <!-- 标签栏 -->
        <div class="flex-none border-b border-gray-200 bg-base-200">
          <div class="tabs">
            {#each tabs as tab}
              <button 
                class="tab tab-bordered {tab.active ? 'tab-active' : ''}" 
                on:click={() => switchTab(tab)}
              >
                {tab.title}
              </button>
            {/each}
          </div>
        </div>
        
        <!-- 编辑器区域 -->
        <div class="flex-1 overflow-auto">
          <div class="mockup-code h-full">
            <pre data-prefix="1"><code>// {activeTab.path}</code></pre>
            <pre data-prefix="2"><code></code></pre>
            <pre data-prefix="3"><code><span class="text-primary">import</span> { onMount } <span class="text-primary">from</span> <span class="text-success">'svelte'</span>;</code></pre>
            <pre data-prefix="4"><code></code></pre>
            <pre data-prefix="5"><code><span class="text-warning">// 定义菜单结构</span></code></pre>
            <pre data-prefix="6"><code><span class="text-primary">const</span> menuItems = [</code></pre>
            <pre data-prefix="7"><code>  &#123;</code></pre>
            <pre data-prefix="8"><code>    label: <span class="text-success">'文件'</span>,</code></pre>
            <pre data-prefix="9"><code>    children: [</code></pre>
            <pre data-prefix="10"><code>      &#123; label: <span class="text-success">'新建'</span>, shortcut: <span class="text-success">'Ctrl+N'</span> &#125;,</code></pre>
            <pre data-prefix="11"><code>      &#123; label: <span class="text-success">'打开'</span>, shortcut: <span class="text-success">'Ctrl+O'</span> &#125;,</code></pre>
            <pre data-prefix="12"><code>      &#123; label: <span class="text-success">'保存'</span>, shortcut: <span class="text-success">'Ctrl+S'</span> &#125;</code></pre>
            <pre data-prefix="13"><code>    ]</code></pre>
            <pre data-prefix="14"><code>  &#125;</code></pre>
            <pre data-prefix="15"><code>];</code></pre>
          </div>
        </div>
        
        <!-- 终端拖动条 -->
        {#if showTerminal}
          <div 
            class="h-1 cursor-ns-resize hover:bg-primary active:bg-primary" 
            on:mousedown={startTerminalDrag}>
          </div>
        {/if}
        
        <!-- 终端区域 -->
        {#if showTerminal}
          <div style="height: {terminalHeight}px;" class="overflow-hidden bg-base-300">
            <div class="flex justify-between items-center px-2 py-1 bg-base-200 text-base-content">
              <div class="flex space-x-2">
                <div class="badge badge-primary text-xs">终端</div>
                <div class="badge text-xs">问题</div>
                <div class="badge text-xs">输出</div>
              </div>
              <button on:click={toggleTerminal} class="btn btn-xs btn-ghost">×</button>
            </div>
            <div class="p-2 font-mono text-sm overflow-auto h-[calc(100%-28px)]">
              {#each terminalLines as line}
                <div class={line.type === 'command' ? 'text-primary' : 'text-base-content'}>
                  {line.text}
                </div>
              {/each}
              <div class="animate-pulse text-primary">█</div>
            </div>
          </div>
        {:else}
          <div class="h-8 flex items-center justify-center bg-base-300">
            <button 
              on:click={toggleTerminal} 
              class="btn btn-xs btn-ghost"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="m18 15-6-6-6 6"/></svg>
              显示终端
            </button>
          </div>
        {/if}
      </div>
      
      <!-- 右侧边栏拖动条 -->
      <div 
        class="w-1 cursor-ew-resize hover:bg-primary active:bg-primary" 
        on:mousedown={startRightDrag}>
      </div>
      
      <!-- 右侧边栏 -->
      <div style="width: {rightSidebarWidth}px;" class="bg-base-200 flex flex-col border-l">
        <div class="flex-none p-2 border-b border-gray-200 bg-base-100">
          <h4 class="font-medium text-sm">属性面板</h4>
        </div>
        <div class="flex-1 overflow-auto p-2">
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body p-3">
              <h2 class="card-title text-sm">组件属性</h2>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">组件名称</span>
                </label>
                <input type="text" placeholder="TopNav" class="input input-bordered input-sm w-full max-w-xs" />
                
                <label class="label mt-2">
                  <span class="label-text">样式</span>
                </label>
                <select class="select select-bordered select-sm w-full max-w-xs">
                  <option selected>默认</option>
                  <option>主要</option>
                  <option>次要</option>
                  <option>强调</option>
                </select>
                
                <div class="form-control mt-2">
                  <label class="label cursor-pointer">
                    <span class="label-text">可见</span> 
                    <input type="checkbox" checked class="toggle toggle-primary toggle-sm" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</AppLayout>

<style lang="postcss">
  /* 确保整体布局占满屏幕 */
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>

