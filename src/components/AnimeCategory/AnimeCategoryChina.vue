<template>
  <div class="anime-category">
    <!-- 分类标题 & 更多 -->
    <div class="category-header">
      <h2>
        <i class="el-icon-film"></i>
        {{ title }}
      </h2>
      <div class="actions">
        <el-button type="text" class="refresh-button" @click="fetchAnimeData">
          <i class="el-icon-refresh"></i> 换一批
        </el-button>
        <el-link :href="moreLink" class="more-link">
          <i class="el-icon-more"></i> 更多
        </el-link>
      </div>
    </div>

    <!-- 动漫 3x6 网格 -->
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
  name: "AnimeCategoryChina",
  props: {
    title: {
      type: String,
      default: "国产动漫",
    },
    moreLink: {
      type: String,
      default: "/More/china",
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
        const response = await fetch("http://localhost:3000/api/random-china-anime");
        const data = await response.json();
        this.animeList = data.map(anime => ({
          id: anime.vod_id, // 这里改为 vod_id
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
      this.$router.push({ path: `/anime/detail/${id}` });
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/AnimeCategory.css";
</style>
