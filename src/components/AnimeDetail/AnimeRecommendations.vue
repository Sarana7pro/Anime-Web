<template>
  <div class="anime-category">
    <!-- 分类标题 & 更多 -->
    <div class="category-header">
      <h3>
        <i class="el-icon-film"></i>
        {{ title }}
      </h3>
      <div class="more-refresh-container">
        <el-button type="text" class="refresh-button" @click="fetchAnimeData">
          <i class="el-icon-refresh"></i> 换一批
        </el-button>
        <el-link :href="moreLink" class="more-link">
          <i class="el-icon-more"></i> 更多
        </el-link>
      </div>
    </div>

    <!-- 动漫电影 3x6 网格 -->
    <div class="anime-grid">
      <div
        v-for="anime in animeList"
        :key="anime.id"
        class="anime-box"
        @click="goToDetail(anime.id)"
      >
        <div class="anime-cover-wrapper">
          <img :src="anime.pic" alt="anime.cover" class="anime-cover" />
          <div class="overlay">
            <i class="el-icon-caret-right play-button"></i>
          </div>
        </div>
        <div class="anime-title">{{ truncatedAnimeTitle(anime.title) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnimeRecommendations",
  props: {
    title: {
      type: String,
      default: "为你推荐",
    },
    moreLink: {
      type: String,
      default: "/movies",
    },
  },
  data() {
    return {
      animeList: [],
    };
  },
  mounted() {
    this.fetchAnimeData();
  },
  methods: {
    async fetchAnimeData() {
      try {
        const response = await fetch("http://localhost:3000/api/random-anime");
        const data = await response.json();
        this.animeList = data.map((anime) => ({
          id: anime.vod_id,
          title: anime.vod_name,
          pic: anime.vod_pic,
        }));
      } catch (error) {
        console.error("Failed to fetch anime data:", error);
      }
    },
    truncatedAnimeTitle(title) {
      return title.length > 8 ? title.substring(0, 8) + "..." : title;
    },
    goToDetail(id) {
      if (id) {
        // 强制刷新当前路由
        this.$router
          .push({ path: `/anime/detail/${id}`, force: true })
          .catch((error) => {
            console.error("Error during navigation:", error);
          });
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/AnimeCategory.css";

.anime-box {
  cursor: pointer; /* 鼠标悬停时变为可点击状态 */
  transition: transform 0.2s;
}

.anime-box:hover {
  transform: scale(1.05); /* 悬停时稍微放大 */
}
</style>
