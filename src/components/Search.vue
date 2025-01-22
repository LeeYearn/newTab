<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

type Website = {
  name: string;
  url: string;
  icon: string;
};

// 菜单项及图标映射
const searchEngines: { [key: string]: Website } = {
  Google: { name: "Google", url: 'https://www.google.com/search?q=', icon: 'icon-google' },
  Bing: { name: "Bing", url: 'https://www.bing.com/search?q=', icon: 'icon-Bing' },
  Baidu: { name: "Baidu", url: 'https://www.baidu.com/s?wd=', icon: 'icon-baidu' },
  Bilibili: { name: "Bilibili", url: 'https://search.bilibili.com/all?keyword=', icon: 'icon-bilibili' },
  GitHub: { name: "GitHub", url: 'https://github.com/search?q=', icon: 'icon-github' },
  CSDN: { name: "CSDN", url: 'https://so.csdn.net/so/search?q=', icon: 'icon-csdn2' },
};

const selectedItem = ref(searchEngines.Google.name); // 默认选中第一个搜索引擎
const isMenuVisible = ref(false); // 控制菜单显示和隐藏
const query = ref(''); // 搜索输入框的值

// 点击菜单项时更新选中的搜索引擎，并隐藏菜单
const handleClick = (item: string) => {
  if (selectedItem.value === item) return; // 如果点击的是当前选中的项，直接返回
  selectedItem.value = item; // 更新选中的项
  isMenuVisible.value = false; // 选择后隐藏菜单
};

// 点击按钮时显示或隐藏菜单
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const goSearch = () => {
  const searchQuery = query.value.trim();
  if (!searchQuery) {
    alert('发现当前内容框没东西\n准备实现内容框为空但点击搜索时跳转到博客页面');
    return;
  }
  const url = searchEngines[selectedItem.value].url + encodeURIComponent(searchQuery);
  window.open(url, '_blank'); // 在新标签页打开搜索结果
};

// 监听点击外部，点击其他地方时关闭菜单
const clickOutside = (event: MouseEvent) => {
  const menu = document.getElementById('menu');
  const button = document.querySelector('button'); // 获取按钮元素
  if (menu && !menu.contains(event.target as Node) && button && !button.contains(event.target as Node)) {
    isMenuVisible.value = false;
  }
};

// 监听回车键
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    goSearch(); // 按下回车键时触发搜索
  }
};

// 在组件挂载时添加点击事件监听
onMounted(() => {
  document.addEventListener('click', clickOutside);
});

// 在组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', clickOutside);
});
</script>

<template>
  <div class="search-all">
    <div class="all">
      <button @click="toggleMenu">
        <i :class="['iconfont', searchEngines[selectedItem].icon]"></i>
      </button>
      <input 
        id="main-input" 
        type="text" 
        v-model="query"
        @keydown="handleKeydown"  />
      <button @click="goSearch">
        <i class="iconfont icon-sousuo"></i>
      </button>
    </div>
    <ul class="choose-engine" v-if="isMenuVisible" id="menu"> 
      <li class="engine" v-for="(SEngine, key) in searchEngines" :key="key" :class="{ 'selected': selectedItem === SEngine.name }"
        @click="handleClick(SEngine.name)">
        <i :class="['iconfont', SEngine.icon]" style="margin: 5px;"></i>
        <span>{{ SEngine.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-all{
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  max-width: 680px;
  width: calc(100% - 60px);
  transition: width .35s linear;
}

.all {
    display: flex;
    justify-content: space-between;
    height: 42px;
    width: 100%;
    border-radius: 30px;
    color: #fff;
    background-color: rgba(0,0,0,.25098039215686274);
    backdrop-filter: blur(10px);
    opacity: 1;
    animation: fade-up-in .7s cubic-bezier(.37,.99,.36,1);
    transition: transform .3s,background-color .3s,opacity .5s;
}

/* 控制菜单的布局 */
.choose-engine {
  display: flex;
  align-items: center; /* 垂直居中图标和文字 */
  justify-content: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap; /* 使菜单项换行 */
  gap: 10px; /* 设置项之间的间距 */
  margin-top: 10px;
  border-radius: 20px;
  backdrop-filter: blur(10px) saturate(1.25);
}

/* 菜单项 */
.engine {
  background: rgba(0, 0, 0, 0.2);
  user-select: none;
  display: flex;
  height: 50px;
  align-items: center; /* 垂直居中图标和文字 */
  justify-content: center;
  color: rgb(255, 255, 255, 0.6);
  width: calc(33% - 10px); /* 每个li占用1/3宽度，减去间距 */
  border-radius:10px;
  /* box-sizing: border-box;  */
}


/* 菜单项文字样式 */
ul li span {
  font-size: 1.2em;
  letter-spacing: 0.05em;
  transition: 0.4s;
  font-weight: bold;
}

/* 悬停和选中时的效果 */
ul li:hover span,
ul li.selected span,
ul li:hover i,
ul li.selected i {
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 15px #fff, 0 0 30px #fff, 0 0 60px #fff, 0 0 100px #fff;
}

button {
  background: none;
  border-radius:30px;
  height: 100%;
  width: 64px;
  border: none;
  transition: background-color .3s, opacity .3s;
}
button:hover{
  background-color: rgba(0, 0, 0, .25098039215686274);
}

button i {
  font-size: 1.5em;
  color: #fff;
}

/* 响应式设计：屏幕宽度小于768px时，每行最多2个li */
@media (max-width: 768px) {
  ul li {
    width: calc(50% - 10px); /* 每行最多2个li */
  }
}

/* 响应式设计：屏幕宽度小于480px时，每行最多1个li */
@media (max-width: 480px) {
  ul li {
    width: 100%; /* 每行1个li */
  }
}

#main-input{
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    background: none;
    font-size: 16px;
    color: #fff;
}
</style>
