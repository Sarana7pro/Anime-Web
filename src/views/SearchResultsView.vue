<template>
  <el-container class="search-results-view">
    <el-aside width="200px">
      <AppSidebar />
    </el-aside>
    <el-main>
      <AppHeader />
      <!-- 只保留对 SearchWindow 的引用 -->
      <SearchWindow />
      <AppFooter />
    </el-main>
  </el-container>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AppFooter from "@/components/AppFooter.vue";
import SearchWindow from "@/components/SearchWindow.vue";

export default {
  name: "SearchResultsView",
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    SearchWindow,
  },
};
</script>

<style scoped>
/* 页面级别样式（如布局） */
</style>
