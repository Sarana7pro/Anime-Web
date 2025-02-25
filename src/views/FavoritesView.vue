<template>
  <el-container class="favorites-view">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <AppSidebar />
    </el-aside>

    <!-- 主体内容 -->
    <el-main>
      <AppHeader />
      
      <!-- 这里只引用新拆分的 FavoritesWindow 组件 -->
      <FavoritesWindow />

      <AppFooter />
    </el-main>
  </el-container>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AppFooter from "@/components/AppFooter.vue";
import FavoritesWindow from "@/components/FavoritesWindow.vue";

export default {
  name: "FavoritesView",
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    FavoritesWindow,
  },
};
</script>

<style scoped>
/* 如果有页面级别的样式需求可写在这里 */
</style>
