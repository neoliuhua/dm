<script lang="ts">
  let sidebarWidth = 200; // 初始宽度
  let isResizing = false;

  function handleMouseDown(event: MouseEvent) {
    isResizing = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isResizing) return;
    sidebarWidth = window.innerWidth - event.clientX; // Calculate width from right edge
  }

  function handleMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }
</script>

<aside class="right-sidebar" style="width: {sidebarWidth}px;">
  <div class="resizer" on:mousedown={handleMouseDown} />
  <ul>
    <li>右侧边栏菜单 1</li>
    <li>右侧边栏菜单 2</li>
    <li>右侧边栏菜单 3</li>
  </ul>
</aside>

<style>
  .right-sidebar {
    background-color: #f0f0f0;
    padding: 20px;
    border-left: 1px solid #ccc; /* Left border for right sidebar */
    position: relative;
    overflow-x: hidden;
    margin-left: auto; /* Push to the right */
  }

  .right-sidebar .resizer {
    position: absolute;
    top: 0;
    left: 0; /* Resizer on the left for right sidebar */
    width: 5px;
    height: 100%;
    cursor: ew-resize;
    background-color: #ccc;
  }

  .right-sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .right-sidebar li {
    padding: 10px 0;
    cursor: pointer;
  }

  .right-sidebar li:hover {
    background-color: #e0e0e0;
  }
</style>
