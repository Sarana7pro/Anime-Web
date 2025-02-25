<template>
  <div class="episode-list">
    <h3>播放列表</h3>
    <div class="clearfix"></div>
    <br />
    <el-button
      v-for="(episode, index) in episodes"
      :key="index"
      type="primary"
      plain
      @click="playEpisode(index + 1)"
    >
      {{ episode }}
    </el-button>

    <!-- 如果有多组播放源，显示“下一页”按钮 -->
    <el-button v-if="hasNextPage" type="success" plain @click="nextPage">
      切换播放源
    </el-button>

    <!-- 如果集数超过12集，则显示 "更多" 按钮 -->
    <el-button
      v-if="allEpisodes.length > 12"
      type="primary"
      plain
      @click="showMore"
    >
      更多
    </el-button>
  </div>
</template>

<script>
export default {
  props: ["episodes", "allEpisodes", "animeId", "hasNextPage"],
  methods: {
    showMore() {
      this.$emit("show-more-episodes");
    },
    nextPage() {
      this.$emit("next-page");
    },
    playEpisode(nid) {
      this.$confirm(
        "本站只提供WEB页面服务，本站不存储、不制作任何视频，将跳转至其他网站，点击确定后进行跳转",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const playUrl = `http://sorana7.131.996h.cn/index.php/vod/play/id/${this.animeId}/sid/1/nid/${nid}.html`;
          window.location.href = playUrl; // 直接跳转到目标地址
        })
        .catch(() => {
          console.log("用户取消播放");
        });
    },
  },
};
</script>

<style scoped>
.episode-list {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.clearfix {
  flex-basis: 100%;
  height: 0;
}

.el-button {
  min-width: 80px;
}
</style>
