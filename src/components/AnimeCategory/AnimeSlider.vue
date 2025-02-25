<template>
  <el-carousel height="400px" :interval="5000" arrow="always">
    <el-carousel-item v-for="anime in animeList" :key="anime.id">
      <div class="slide-item" @click="goToDetail(anime.id)">
        <div class="image-wrapper">
          <img :src="anime.pic" :alt="anime.title" class="slide-img" />
        </div>
        <div class="slide-title">{{ anime.title }}</div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "AnimeSlider",
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
        this.animeList = data.map(anime => ({
          id: anime.vod_id,
          title: anime.vod_name,
          pic: anime.vod_pic,
        }));
      } catch (error) {
        console.error("Failed to fetch anime data:", error);
      }
    },
    goToDetail(id) {
      this.$router.push({ path: `/anime/detail/${id}` });
    },
  },
};
</script>

<style scoped>
.slide-item {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  border: 3px solid #ddd;
  overflow: hidden;
  border-radius: 10px;
}

.slide-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
}

.slide-title {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
}
</style>
