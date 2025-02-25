<template>
  <div class="anime-category">
    <!-- 分类标题 & 更多 -->
    <div class="category-header">
      <h2>
        <i class="el-icon-film"></i> <!-- Add icon here -->
        {{ title }}
      </h2>
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
      >
        <!-- 使用 img 标签展示图片 -->
        <div class="anime-cover-wrapper" @click="goToDetail(anime.id)">
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
  name: "AnimeCategoryJapan",
  props: {
    title: {
      type: String,
      default: "日本动漫",
    },
    moreLink: {
      type: String,
      default: "/More/Japan",
    },
  },
  data() {
    return {
      animeList: [], // 将由 API 数据填充
    };
  },
  mounted() {
    this.fetchAnimeData();
  },
  methods: {
    async fetchAnimeData() {
      try {
        const response = await fetch('http://localhost:3000/api/random-anime');
        const data = await response.json();
        // 使用后端返回的 vod_id 作为 id
        this.animeList = data.map((anime) => ({
          id: anime.vod_id,
          title: anime.vod_name,
          pic: anime.vod_pic,
        }));
      } catch (error) {
        console.error('Failed to fetch anime data:', error);
      }
    },
    truncatedAnimeTitle(title) {
      if (title.length > 8) {
        return title.substring(0, 8) + '...';
      }
      return title;
    },
    goToDetail(id) {
      // 跳转到视频详情页，路由路径为 /anime/detail/:id
      this.$router.push({ path: `/anime/detail/${id}` });
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/AnimeCategory.css";
</style>
