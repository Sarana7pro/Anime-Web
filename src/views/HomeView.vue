<template>
  <el-container class="home-container">
    <el-aside width="200px">
      <AppSidebar @scroll-to-category="scrollToCategory" />
    </el-aside>

    <el-main>
      <AppHeader />
      <AnimeSlider />
      <div class="category-container">
        <div ref="japanAnime">
          <AnimeCategoryJapan />
        </div>
        <div ref="chinaAnime">
          <AnimeCategoryChina />
        </div>
        <div ref="movieAnime">
          <AnimeCategoryMovie />
        </div>
        <div ref="scheduleAnime">
          <AnimeCategorySchedule />
        </div>
        <div ref="todayAnime">
          <AnimeCategoryToday />
        </div>
        <AppFooter />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";
import AnimeSlider from "@/components/AnimeCategory/AnimeSlider.vue";
import AnimeCategoryJapan from "@/components/AnimeCategory/AnimeCategoryJapan.vue";
import AnimeCategoryChina from "@/components/AnimeCategory/AnimeCategoryChina.vue";
import AnimeCategoryMovie from "@/components/AnimeCategory/AnimeCategoryMovie.vue";
import AnimeCategorySchedule from "@/components/AnimeCategory/AnimeCategorySchedule.vue";
import AnimeCategoryToday from "@/components/AnimeCategory/AnimeCategoryToday.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "HomeView",
  components: {
    AppSidebar,
    AppHeader,
    AnimeSlider,
    AnimeCategoryJapan,
    AnimeCategoryChina,
    AnimeCategoryMovie,
    AnimeCategorySchedule,
    AnimeCategoryToday,
    AppFooter,
  },
  methods: {
    scrollToCategory(category) {
      if (this.$refs[category]) {
        this.$refs[category].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
  },
};
</script>

<style scoped>
.home-container {
  background-color: #f0f0f0; /* 灰色背景 */
}

.category-container {
  margin-top: 20px;
}
</style>
