<header class="top-nav">
  <nav>
    <ul>
      <li>菜单项 1</li>
      <li>菜单项 2</li>
      <li>菜单项 3</li>
    </ul>
  </nav>
</header>

<style>
  .top-nav {
    background-color: #fff; /* 白色背景 */
    padding: 10px;
    border-bottom: 1px solid #ccc; /* 下边框 */
  }

  .top-nav nav ul {
    display: flex; /* 横向排列菜单项 */
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .top-nav nav ul li {
    margin-right: 20px; /* 菜单项间距 */
    cursor: pointer;
  }

  .top-nav nav ul li:hover {
    background-color: #f0f0f0; /* Hover 效果 */
  }
</style>
