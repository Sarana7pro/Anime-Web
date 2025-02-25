<template>
  <div class="search-window">
    <h2>搜索结果</h2>
    <div v-if="loading" class="loading">正在加载...</div>
    <div v-else-if="animes.length === 0" class="empty">没有找到相关动漫</div>
    <div class="anime-list">
      <el-card
        v-for="anime in animes"
        :key="anime.vod_id"
        class="anime-card"
        shadow="hover"
        @click.native="goToDetail(anime.vod_id)"
      >
        <div class="anime-row">
          <img :src="anime.vod_pic" alt="封面" class="anime-cover" />
          <div class="anime-info">
            <h3 class="anime-title">{{ anime.vod_name }}</h3>
            <p class="anime-summary">
              {{ anime.vod_content ? cleanDescription(anime.vod_content) : "暂无简介" }}
            </p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchWindow",
  data() {
    return {
      animes: [],
      loading: false,
    };
  },
  watch: {
    // 监听搜索参数变化
    "$route.query.q": {
      handler() {
        this.fetchSearchResults();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchSearchResults() {
      const query = this.$route.query.q;
      if (!query) return;
      this.loading = true;
      try {
        const response = await fetch(`http://localhost:3000/api/search-anime?q=${query}`);
        const data = await response.json();
        this.animes = data;
        console.log('搜索结果:', this.animes);
      } catch (error) {
        console.error("搜索失败:", error);
      } finally {
        this.loading = false;
      }
    },
    goToDetail(videoId) {
      console.log('跳转到详情页，ID:', videoId); // 添加此行
      this.$router.push(`/anime/detail/${videoId}`);
    },
    cleanDescription(description) {
      return description
        .replace(/<p>/gi, '')
        .replace(/<\/p>/gi, '')
        .replace(/<br\s*\/?>/gi, '')
        .replace(/&nbsp;/gi, '')
        .trim();
    },
  },
};
</script>

<!-- 注意：@import 进来的 CSS 文件是全局的，但如果里面所有规则都有 .search-window 前缀，就不会污染到其他组件 -->
<style scoped>
@import "@/assets/css/search.css";
</style>
