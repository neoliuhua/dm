<script lang="ts">
  import "../app.css";
  import { onMount } from 'svelte';
  
  let appWindow: any;
  
  onMount(async () => {
    try {
      const { Window } = await import('@tauri-apps/api/window');
      appWindow = Window.getCurrent();
      console.log('Window API loaded successfully:', appWindow);
    } catch (error) {
      console.error('Failed to load Tauri API:', error);
    }
  });

  async function toggleMaximize() {
    if (!appWindow) {
      console.error('Window API not loaded yet');
      return;
    }
    
    try {
      const isMaximized = await appWindow.isMaximized();
      console.log('Current maximize state:', isMaximized);
      if (isMaximized) {
        await appWindow.unmaximize();
      } else {
        await appWindow.maximize();
      }
      console.log('Toggle maximize completed');
    } catch (error) {
      console.error('Failed to toggle maximize:', error);
    }
  }
  
  async function minimizeWindow() {
    if (!appWindow) {
      console.error('Window API not loaded yet');
      return;
    }
    try {
      console.log('Attempting to minimize window...');
      await appWindow.minimize();
      console.log('Window minimized successfully');
    } catch (error) {
      console.error('Failed to minimize window:', error);
    }
  }
  
  async function closeWindow() {
    if (!appWindow) {
      console.error('Window API not loaded yet');
      return;
    }
    try {
      console.log('Attempting to close window...');
      await appWindow.close();
      console.log('Window close command sent');
    } catch (error) {
      console.error('Failed to close window:', error);
    }
  }
</script>

<div class="window-container">
  <div class="window-titlebar">
    <div class="window-title">我的应用</div>
    <div class="window-controls">
      <button class="window-control minimize" data-tauri-drag-region="false" on:click={minimizeWindow} aria-label="最小化">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <button class="window-control maximize" data-tauri-drag-region="false" on:click={toggleMaximize} aria-label="最大化">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        </svg>
      </button>
      <button class="window-control close" data-tauri-drag-region="false" on:click={closeWindow} aria-label="关闭">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
  <div class="window-content">
    <slot />
  </div>
</div>

<style>
  /* 重置全局样式 */
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

  .window-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: hsl(var(--b1));
  }

  .window-titlebar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5rem;
    background-color: hsl(var(--b2));
    padding-left: 1rem;
    padding-right: 1rem;
    -webkit-app-region: drag;
  }

  .window-title {
    flex: 1;
    font-weight: 500;
    font-size: 0.9rem;
    color: hsl(var(--bc));
  }

  .window-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    -webkit-app-region: no-drag;
  }

  .window-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    background-color: transparent;
    border: none;
    -webkit-app-region: no-drag;
  }

  .window-control:hover {
    background-color: hsla(var(--b3), 0.2);
  }

  .window-control.minimize:hover {
    background-color: hsla(var(--wa), 0.2);
  }

  .window-control.maximize:hover {
    background-color: hsla(var(--su), 0.2);
  }

  .window-control.close:hover {
    background-color: hsla(var(--er), 0.2);
  }

  .window-content {
    flex: 1;
    overflow: auto;
  }
</style>
