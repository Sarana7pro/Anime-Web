<template>
  <div class="watch-history-window">
    <h2>观看历史</h2>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="history.length === 0" class="empty">暂无观看历史</div>
    <div class="history-list">
      <el-card
        v-for="item in history"
        :key="item.videoId"
        class="history-card"
        shadow="hover"
        @click.native="goToDetail(item.videoId)"
      >
        <div class="history-row">
          <img :src="item.cover" alt="封面" class="history-cover" />
          <div class="history-info">
            <h3 class="history-title">{{ item.title }}</h3>
            <p class="history-time">观看时间: {{ readableTime(item.watchedAt) }}</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "WatchHistoryWindow",
  data() {
    return {
      history: [],
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.fetchWatchHistory();
  },
  methods: {
    async fetchWatchHistory() {
      if (!this.user || !this.user.id) return;
      this.loading = true;
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/watch-history?userId=${this.user.id}`
        );
        const data = await response.json();
        this.history = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("获取观看历史失败:", error);
      } finally {
        this.loading = false;
      }
    },
    goToDetail(videoId) {
      this.$router.push(`/anime/detail/${videoId}`);
    },
    readableTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString(); // 使用本地时间格式
      // 或者可以根据需要格式化为特定格式，例如：
      // return date.toLocaleString('zh-CN', { hour12: false }); // 24小时制的本地格式
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/watchHistory.css";
</style>
