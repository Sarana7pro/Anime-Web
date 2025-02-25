<template>
  <AnimeCategoryJapan title="追番周表" moreLink="/schedule" />
    <!-- 在更多的左侧添加周一到周日的按钮 -->
</template>
  
  <script>
import AnimeCategoryJapan from "./AnimeCategoryJapan.vue";
export default {
  name: "AnimeCategorySchedule",
  components: { AnimeCategoryJapan },
    // 组件使用模糊查询的方式，自定义周一到周日的json数据,并设置js到数据库中读取片名，再返回到前端
};
</script>
  