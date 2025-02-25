<template>
  <el-container class="messages-view">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <AppSidebar />
    </el-aside>

    <!-- 主体内容 -->
    <el-main>
      <AppHeader />

      <!-- 这里只引用新拆分的 MessagesWindow 组件 -->
      <MessagesWindow />

      <AppFooter />
    </el-main>
  </el-container>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AppFooter from "@/components/AppFooter.vue";
import MessagesWindow from "@/components/MessagesWindow.vue";

export default {
  name: "MessagesView",
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    MessagesWindow,
  },
};
</script>

<style scoped>
/* 如果有页面级别的样式需求可写在这里 */
</style>
