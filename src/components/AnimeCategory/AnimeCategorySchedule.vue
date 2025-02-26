<template>
  <div class="anime-category">
    <!-- 分类标题 -->
    <div class="category-header">
      <h2>
        <i class="el-icon-film"></i> 追番周表
      </h2>
    </div>

    <!-- 星期按钮区域 -->
    <div class="week-buttons-box">
      <div class="week-buttons">
        <el-button
          v-for="day in weekDays"
          :key="day"
          :type="selectedDay === day ? 'primary' : 'text'"
          @click="selectDay(day)"
          class="week-button"
        >
          {{ day }}
        </el-button>
      </div>
    </div>

    <!-- 动漫 3x6 网格 -->
    <div class="anime-grid">
      <div
        v-for="anime in scheduleData[selectedDay]"
        :key="anime.vod_id"
        class="anime-box"
        @click="goToDetail(anime.vod_id)"
      >
        <div class="anime-cover-wrapper">
          <img :src="anime.vod_pic" alt="anime.cover" class="anime-cover" />
          <div class="overlay">
            <i class="el-icon-caret-right play-button"></i>
          </div>
        </div>
        <div class="anime-title">{{ truncatedAnimeTitle(anime.vod_name) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimeCategorySchedule",
  data() {
    return {
      selectedDay: '周一',  // 默认选择周一
      scheduleData: {},    // 后端返回的各星期查询结果
      weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    };
  },
  mounted() {
    this.fetchSchedule();
  },
  methods: {
    async fetchSchedule() {
      try {
        const response = await fetch("http://localhost:3000/api/schedule");
        const data = await response.json();
        this.scheduleData = data;
      } catch (error) {
        console.error("获取追番周表失败:", error);
      }
    },
    selectDay(day) {
      this.selectedDay = day;
    },
    truncatedAnimeTitle(title) {
      return title.length > 8 ? title.substring(0, 8) + "..." : title;
    },
    goToDetail(id) {
      this.$router.push({ path: `/anime/detail/${id}` });
    }
  }
};
</script>

<style scoped>
@import "@/assets/css/AnimeCategory.css";

/* 星期按钮容器 */
.week-buttons-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;  /* 缩小上边距 */
  margin-bottom: 25px;  /* 扩大下边距 5px */
  padding-right: 20px; /* 添加右侧间距 */
}

/* 星期按钮区域 */
.week-buttons {
  display: flex;
  gap: 10px;
}

/* 统一按钮样式 */
.week-button {
  font-size: 14px;
  width: 50px;  /* 设置按钮宽度为 50px */
  height: 50px;  /* 设置按钮高度为 50px */
  padding: 0;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
}

/* 按钮颜色统一设置 */
.el-button--primary {
  background-color: #e50914 !important; /* 默认红色背景 */
  border-color: #e50914 !important;
  color: #ffffff !important; /* 字体颜色白色 */
}

.el-button--primary:hover {
  background-color: #ff6347 !important; /* 悬停时变为橙红色 */
  border-color: #ff6347 !important;
  color: #ffffff !important; /* 悬停时字体颜色仍保持白色 */
}

/* 未选中按钮的颜色 */
.el-button--text {
  color: #e50914 !important; /* 未选中时字体颜色为红色 */
  border: none !important;
}

.el-button--text:hover {
  color: #ff6347 !important; /* 未选中时悬停变为橙红色 */
  border: none !important;
}
</style>
