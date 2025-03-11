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
    sidebarWidth = event.clientX;
  }

  function handleMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }
</script>

<aside class="sidebar" style="width: {sidebarWidth}px;">
  <div class="resizer" on:mousedown={handleMouseDown} />
  <ul>
    <li>侧边栏菜单 1</li>
    <li>侧边栏菜单 2</li>
    <li>侧边栏菜单 3</li>
  </ul>
</aside>

<style>
  .sidebar {
    background-color: #f0f0f0;
    padding: 20px;
    border-right: 1px solid #ccc;
    position: relative; /* resizer 需要定位 */
    overflow-x: hidden; /* 防止内容超出 */
  }

  .resizer {
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 100%;
    cursor: ew-resize;
    background-color: #ccc;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar li {
    padding: 10px 0;
    cursor: pointer;
  }

  .sidebar li:hover {
    background-color: #e0e0e0;
  }
</style>
