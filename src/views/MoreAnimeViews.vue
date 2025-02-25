<template>
    <el-container class="MoreAnimeViews">
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <AppSidebar />
      </el-aside>
  
      <!-- 主体内容 -->
      <el-main>
        <AppHeader />
        <div class="more-anime-views"> 
          <router-view></router-view>
        </div>
        <AppFooter />
      </el-main>
    </el-container>
  </template>
  
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import AppSidebar from "@/components/AppSidebar.vue";
  import AppFooter from "@/components/AppFooter.vue";
  
  export default {
    name: "MoreAnimeViews",
    components: {
      AppHeader,
      AppSidebar,
      AppFooter,
    },
  };
  </script>
  
  <style scoped>
  /* 如果有页面级别的样式需求可写在这里 */
  .MoreAnimeViews{
    background-color: #f0f0f0; /* 灰色背景 */
  }
  .more-anime-views{
    margin-top: 20px;
  }
  </style>
  