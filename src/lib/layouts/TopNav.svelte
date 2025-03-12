<script lang="ts">
  import { onMount } from 'svelte';
  
  // 定义菜单项类型
  type MenuItem = {
    label: string;
    shortcut?: string;
    children?: (MenuItem | DividerItem)[];
  };
  
  // 分隔线类型
  type DividerItem = {
    type: 'divider';
  };
  
  // 检查对象是否是分隔线
  function isDivider(item: MenuItem | DividerItem): item is DividerItem {
    return 'type' in item && item.type === 'divider';
  }
  
  // 定义菜单结构 - 确保所有菜单都有3级深度
  const menuItems: (MenuItem)[] = [
    {
      label: '文件',
      children: [
        { 
          label: '新建', 
          shortcut: 'Ctrl+N',
          children: [
            { label: '文件', shortcut: 'Ctrl+Alt+N' },
            { label: '文件夹', shortcut: 'Ctrl+Alt+Shift+N' },
            { label: '项目', shortcut: 'Ctrl+Shift+N' }
          ]
        },
        { 
          label: '打开', 
          shortcut: 'Ctrl+O',
          children: [
            { label: '文件', shortcut: 'Ctrl+O' },
            { label: '文件夹', shortcut: 'Ctrl+K Ctrl+O' },
            { label: '工作区', shortcut: 'Ctrl+Alt+O' }
          ]
        },
        { 
          label: '保存', 
          shortcut: 'Ctrl+S',
          children: [
            { label: '保存', shortcut: 'Ctrl+S' },
            { label: '另存为', shortcut: 'Ctrl+Shift+S' },
            { label: '全部保存', shortcut: 'Ctrl+Alt+S' }
          ]
        },
        { type: 'divider' },
        { 
          label: '导出', 
          children: [
            { label: 'PDF', children: [
              { label: '当前页面' },
              { label: '所有页面' },
              { label: '选定区域' }
            ]},
            { label: 'Word文档', children: [
              { label: '当前页面' },
              { label: '所有页面' },
              { label: '选定区域' }
            ]},
            { label: 'Excel表格', children: [
              { label: '当前页面' },
              { label: '所有页面' },
              { label: '选定区域' }
            ]}
          ]
        },
        { type: 'divider' },
        { 
          label: '退出', 
          shortcut: 'Alt+F4',
          children: [
            { label: '保存并退出' },
            { label: '不保存退出' },
            { label: '取消' }
          ]
        }
      ]
    },
    {
      label: '编辑',
      children: [
        { 
          label: '撤销', 
          shortcut: 'Ctrl+Z',
          children: [
            { label: '撤销上一步' },
            { label: '重做上一步', shortcut: 'Ctrl+Y' },
            { label: '历史记录' }
          ]
        },
        { 
          label: '剪切', 
          shortcut: 'Ctrl+X',
          children: [
            { label: '剪切', shortcut: 'Ctrl+X' },
            { label: '剪切行', shortcut: 'Ctrl+Shift+X' },
            { label: '剪切选区', shortcut: 'Ctrl+Alt+X' }
          ]
        },
        { 
          label: '复制', 
          shortcut: 'Ctrl+C',
          children: [
            { label: '复制', shortcut: 'Ctrl+C' },
            { label: '复制行', shortcut: 'Ctrl+Shift+C' },
            { label: '复制选区', shortcut: 'Ctrl+Alt+C' }
          ]
        },
        { 
          label: '粘贴', 
          shortcut: 'Ctrl+V',
          children: [
            { label: '粘贴', shortcut: 'Ctrl+V' },
            { label: '粘贴为纯文本', shortcut: 'Ctrl+Shift+V' },
            { label: '智能粘贴', shortcut: 'Ctrl+Alt+V' }
          ]
        },
        { type: 'divider' },
        { 
          label: '查找', 
          shortcut: 'Ctrl+F',
          children: [
            { label: '查找', shortcut: 'Ctrl+F' },
            { label: '查找下一个', shortcut: 'F3' },
            { label: '查找上一个', shortcut: 'Shift+F3' }
          ]
        },
        { 
          label: '替换', 
          shortcut: 'Ctrl+H',
          children: [
            { label: '替换', shortcut: 'Ctrl+H' },
            { label: '替换全部', shortcut: 'Ctrl+Alt+Enter' },
            { label: '智能替换', shortcut: 'Ctrl+Shift+H' }
          ]
        }
      ]
    },
    {
      label: '选择',
      children: [
        { 
          label: '全选', 
          shortcut: 'Ctrl+A',
          children: [
            { label: '全选', shortcut: 'Ctrl+A' },
            { label: '选择当前行', shortcut: 'Ctrl+L' },
            { label: '选择当前词', shortcut: 'Ctrl+D' }
          ]
        },
        { 
          label: '取消选择', 
          shortcut: 'Esc',
          children: [
            { label: '取消当前选择', shortcut: 'Esc' },
            { label: '取消多光标', shortcut: 'Escape' },
            { label: '取消查找高亮', shortcut: 'Esc Esc' }
          ]
        },
        { type: 'divider' },
        { 
          label: '选择选项', 
          children: [
            { 
              label: '按类型选择',
              children: [
                { label: '相同类型' },
                { label: '相同标签' },
                { label: '相同属性' }
              ]
            },
            { 
              label: '按名称选择',
              children: [
                { label: '相同名称' },
                { label: '以...开头' },
                { label: '以...结尾' }
              ]
            },
            { 
              label: '反向选择',
              children: [
                { label: '反转当前选择' },
                { label: '全部不选' },
                { label: '选择未选项' }
              ]
            }
          ]
        }
      ]
    },
    {
      label: '视图',
      children: [
        { 
          label: '缩放', 
          children: [
            { 
              label: '放大', 
              shortcut: 'Ctrl+Plus',
              children: [
                { label: '放大 10%', shortcut: 'Ctrl+Plus' },
                { label: '放大 25%', shortcut: 'Ctrl+Shift+Plus' },
                { label: '放大 50%', shortcut: 'Ctrl+Alt+Plus' }
              ]
            },
            { 
              label: '缩小', 
              shortcut: 'Ctrl+Minus',
              children: [
                { label: '缩小 10%', shortcut: 'Ctrl+Minus' },
                { label: '缩小 25%', shortcut: 'Ctrl+Shift+Minus' },
                { label: '缩小 50%', shortcut: 'Ctrl+Alt+Minus' }
              ]
            },
            { 
              label: '重置缩放', 
              shortcut: 'Ctrl+0',
              children: [
                { label: '实际大小', shortcut: 'Ctrl+0' },
                { label: '适应窗口', shortcut: 'Ctrl+Alt+0' },
                { label: '适应宽度', shortcut: 'Ctrl+Shift+0' }
              ]
            }
          ]
        },
        { type: 'divider' },
        { 
          label: '全屏', 
          shortcut: 'F11',
          children: [
            { label: '全屏模式', shortcut: 'F11' },
            { label: '演示模式', shortcut: 'Shift+F11' },
            { label: '禅模式', shortcut: 'Ctrl+K Z' }
          ]
        },
        { 
          label: '界面元素', 
          children: [
            { 
              label: '显示网格', 
              shortcut: 'Ctrl+G',
              children: [
                { label: '显示网格线', shortcut: 'Ctrl+G' },
                { label: '网格吸附', shortcut: 'Ctrl+Shift+G' },
                { label: '隐藏网格', shortcut: 'Ctrl+Alt+G' }
              ]
            },
            { 
              label: '显示标尺', 
              shortcut: 'Ctrl+R',
              children: [
                { label: '显示标尺', shortcut: 'Ctrl+R' },
                { label: '标尺吸附', shortcut: 'Ctrl+Shift+R' },
                { label: '隐藏标尺', shortcut: 'Ctrl+Alt+R' }
              ]
            },
            { 
              label: '面板', 
              children: [
                { label: '显示所有面板' },
                { label: '隐藏所有面板' },
                { label: '重置面板布局' }
              ]
            }
          ]
        }
      ]
    }
  ];
  
  // 当前打开的菜单索引
  let activeMenuIndex = -1;
  let activeSubMenuPath: number[] = [];
  
  // 设置活动菜单
  function setActiveMenu(index: number): void {
    if (activeMenuIndex === index) {
      activeMenuIndex = -1;
      activeSubMenuPath = [];
    } else {
      activeMenuIndex = index;
      activeSubMenuPath = [];
    }
  }
  
  // 设置子菜单路径
  function setSubMenuPath(path: number[]): void {
    activeSubMenuPath = path;
  }
  
  // 点击文档其他地方关闭菜单
  function handleClickOutside(event: MouseEvent): void {
    const menus = document.querySelectorAll('.menu-item, .submenu');
    let clickedOnMenu = false;
    
    menus.forEach(menu => {
      if (menu.contains(event.target as Node)) {
        clickedOnMenu = true;
      }
    });
    
    if (!clickedOnMenu) {
      activeMenuIndex = -1;
      activeSubMenuPath = [];
    }
  }
  
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
  
  // 处理菜单项点击
  function handleMenuItemClick(item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      return; // 如果有子菜单，不执行操作
    }
    
    console.log(`菜单项被点击: ${item.label}`);
    // 这里可以添加不同菜单项的具体操作
    
    // 关闭菜单
    activeMenuIndex = -1;
    activeSubMenuPath = [];
  }
</script>

<header class="bg-white border-b shadow-sm z-50">
  <div class="w-full px-2">
    <div class="flex items-center h-8">
      <!-- 主菜单 - 强制水平排列 -->
      <nav class="inline-flex items-center">
        {#each menuItems as item, index}
          <div class="relative menu-item mx-1 first:ml-0">
            <button 
              class="text-gray-800 hover:bg-gray-100 px-3 py-1 text-sm font-medium rounded"
              class:bg-gray-100={activeMenuIndex === index}
              on:click|stopPropagation={() => setActiveMenu(index)}
            >
              {item.label}
            </button>
            
            <!-- 一级子菜单 (垂直下拉) -->
            {#if activeMenuIndex === index && item.children && item.children.length > 0}
              <div class="absolute left-0 top-full mt-1 bg-white border shadow-lg rounded-md z-50 min-w-[180px]">
                <div class="py-1">
                  {#each item.children as childItem, childIndex}
                    {#if isDivider(childItem)}
                      <div class="border-t my-1"></div>
                    {:else}
                      <div 
                        class="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative"
                        on:mouseenter={() => childItem.children && childItem.children.length > 0 && setSubMenuPath([childIndex])}
                        on:click|stopPropagation={() => handleMenuItemClick(childItem)}
                      >
                        <span>{childItem.label}</span>
                        <div class="flex items-center">
                          {#if childItem.shortcut}
                            <span class="text-xs text-gray-500 mr-2">{childItem.shortcut}</span>
                          {/if}
                          {#if childItem.children && childItem.children.length > 0}
                            <span class="text-gray-400">▶</span>
                          {/if}
                        </div>
                        
                        <!-- 二级子菜单 -->
                        {#if childItem.children && childItem.children.length > 0 && activeSubMenuPath[0] === childIndex}
                          <div class="absolute left-full top-0 -mt-1 bg-white border shadow-lg rounded-md z-50 min-w-[180px] submenu">
                            <div class="py-1">
                              {#each childItem.children as subItem, subIndex}
                                {#if isDivider(subItem)}
                                  <div class="border-t my-1"></div>
                                {:else}
                                  <div 
                                    class="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative"
                                    on:mouseenter={() => subItem.children && subItem.children.length > 0 && setSubMenuPath([childIndex, subIndex])}
                                    on:click|stopPropagation={() => handleMenuItemClick(subItem)}
                                  >
                                    <span>{subItem.label}</span>
                                    <div class="flex items-center">
                                      {#if subItem.shortcut}
                                        <span class="text-xs text-gray-500 mr-2">{subItem.shortcut}</span>
                                      {/if}
                                      {#if subItem.children && subItem.children.length > 0}
                                        <span class="text-gray-400">▶</span>
                                      {/if}
                                    </div>
                                    
                                    <!-- 三级子菜单 -->
                                    {#if subItem.children && subItem.children.length > 0 && activeSubMenuPath[0] === childIndex && activeSubMenuPath[1] === subIndex}
                                      <div class="absolute left-full top-0 -mt-1 bg-white border shadow-lg rounded-md z-50 min-w-[180px] submenu">
                                        <div class="py-1">
                                          {#each subItem.children as grandChildItem}
                                            {#if isDivider(grandChildItem)}
                                              <div class="border-t my-1"></div>
                                            {:else}
                                              <div 
                                                class="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                on:click|stopPropagation={() => handleMenuItemClick(grandChildItem)}
                                              >
                                                <span>{grandChildItem.label}</span>
                                                {#if grandChildItem.shortcut}
                                                  <span class="text-xs text-gray-500">{grandChildItem.shortcut}</span>
                                                {/if}
                                              </div>
                                            {/if}
                                          {/each}
                                        </div>
                                      </div>
                                    {/if}
                                  </div>
                                {/if}
                              {/each}
                            </div>
                          </div>
                        {/if}
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </nav>
      
      <!-- 右侧区域 -->
      <div class="ml-auto flex items-center space-x-2">
        <span class="text-xs text-gray-500">Trae UI</span>
      </div>
    </div>
  </div>
</header>

<style>
  /* 确保子菜单不会被截断 */
  .submenu {
    min-width: 180px;
  }
  
  /* 增加z-index确保菜单显示在最上层 */
  header {
    position: relative;
    z-index: 1000;
  }
  
  /* 确保顶部导航菜单项水平排列 */
  nav {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }
  
  /* 主菜单项样式 */
  .menu-item {
    display: inline-block;
  }
</style>
