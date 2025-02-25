<template>
  <div class="favorites-window">
    <h2>我的收藏</h2>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="favorites.length === 0" class="empty">暂无收藏</div>
    <div class="anime-list">
      <el-card
        v-for="item in favorites"
        :key="item.videoId"
        class="anime-card"
        shadow="hover"
        @click.native="goToDetail(item.videoId)"
      >
        <div class="anime-row">
          <img :src="item.cover" alt="封面" class="anime-cover" />
          <div class="anime-info">
            <h3 class="anime-title">{{ item.title }}</h3>
            <p class="anime-summary">
              {{
                item.description
                  ? cleanDescription(item.description)
                  : "暂无简介"
              }}
            </p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoritesWindow",
  data() {
    return {
      favorites: [],
      loading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      if (!this.user || !this.user.id) return;
      this.loading = true;
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/favorites?userId=${this.user.id}`
        );
        const data = await response.json();
        this.favorites = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("获取收藏失败:", error);
      } finally {
        this.loading = false;
      }
    },
    goToDetail(videoId) {
      this.$router.push(`/anime/detail/${videoId}`);
    },
    cleanDescription(description) {
      return description
        .replace(/<p>/gi, "")
        .replace(/<\/p>/gi, "")
        .replace(/<br\s*\/?>/gi, "")
        .replace(/&nbsp;/gi, "")
        .trim();
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/favorites.css";
</style>
