<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getLunar } from "chinese-lunar-calendar";

// 当前时间
const hourTime = ref(""); // 小时
const minuteTime = ref(""); // 分钟
const secondTime = ref(""); // 秒
const solarTime = ref("");
const weekday = ref("");
const lunarDay = ref("");

// 冒号的透明度控制
const colonOpacity = ref(1); // 初始透明度为1

// 获取当前时间
const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const lunar = getLunar(year, month, date);
  lunarDay.value = lunar.lunarYear + " " + lunar.dateStr;
  solarTime.value = `${month}月${date}日`;

  hourTime.value = now.getHours().toString().padStart(2, "0"); // 获取小时并补零
  minuteTime.value = now.getMinutes().toString().padStart(2, "0"); // 获取分钟并补零
  secondTime.value = now.getSeconds().toString().padStart(2, "0"); // 获取秒并补零

  weekday.value = now.toLocaleString("default", { weekday: "long" });
};

// 切换冒号的透明度
const toggleColonOpacity = () => {
  colonOpacity.value = colonOpacity.value === 1 ? 0 : 1;
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000); // 每秒更新一次时间
  // 每轮呼吸总周期：600ms 呼吸 + 400ms 停顿
  setInterval(() => {
    toggleColonOpacity(); // 切换透明度
    setTimeout(() => {
      toggleColonOpacity(); // 呼吸结束后恢复透明度
    }, 400); // 600毫秒后恢复
  }, 1500); // 每1000毫秒进行一次完整的呼吸周期
});

const displaySecond = ref(true);
</script>

<template>
  <div class="time">
    <div class="clock-time" @click="displaySecond = !displaySecond">
      <span>{{ hourTime }}</span>
      <span class="colon" :style="{ opacity: colonOpacity }">:</span>
      <span>{{ minuteTime }}</span>
      <span class="second" :style="{ display: displaySecond ? 'inline-block' : 'none' }">
        <span class="colon" :style="{ opacity: colonOpacity }">:</span>
        <span>{{ secondTime }}</span>
      </span>
    </div>
    <div class="lunar-time">{{ lunarDay }}</div>
    <div class="solar-time">{{ solarTime }} {{ weekday }}</div>
  </div>
</template>

<style scoped>
.time {
  font-family: SimSun;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  user-select: none;
}
.clock-time {
  font-size: 5rem;
  display: inline-block;
  transition: transform 0.3s;
}
.clock-time:hover {
  transform: scale(1.1);
}
.colon {
  font-size: 4rem;
  transition: opacity 0.5s; /* 平滑过渡透明度变化 */
}
.second {
  display: none;
}
.lunar-time {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}
.solar-time {
  font-size: 1.5rem;
  padding-top: 5px;
}
</style>