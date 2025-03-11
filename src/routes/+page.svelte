<script>
  import "../style.css";
  import AppLayout from '../lib/layouts/AppLayout.svelte';
</script>


<AppLayout>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">工作台</h1>
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        新建项目
      </button>
    </div>
    
    <!-- 卡片区域 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 项目摘要卡片 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium text-gray-800 mb-4">项目概况</h2>
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">进行中</span>
          <span class="font-medium">5</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">已完成</span>
          <span class="font-medium">12</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">已暂停</span>
          <span class="font-medium">3</span>
        </div>
      </div>
      
      <!-- 任务卡片 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium text-gray-800 mb-4">任务状态</h2>
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">待处理</span>
          <span class="font-medium">8</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="text-gray-600">进行中</span>
          <span class="font-medium">4</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">已完成</span>
          <span class="font-medium">15</span>
        </div>
      </div>
      
      <!-- 通知卡片 -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium text-gray-800 mb-4">最近通知</h2>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
            <span class="text-gray-600 text-sm">系统更新将于今晚进行</span>
          </li>
          <li class="flex items-start">
            <span class="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-1.5 mr-2"></span>
            <span class="text-gray-600 text-sm">您有3个新任务待处理</span>
          </li>
          <li class="flex items-start">
            <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></span>
            <span class="text-gray-600 text-sm">营销项目已成功完成</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</AppLayout>

