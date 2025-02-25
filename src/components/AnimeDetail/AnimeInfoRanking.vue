<template>
  <div class="anime-info-container">
    <el-image class="cover" :src="localAnime.cover" fit="cover"></el-image>
    <div class="info">
      <h2>{{ localAnime.title }}</h2>
      <div class="info-row">
        <p>地区: {{ localAnime.region }}</p>
      </div>
      <div class="info-row">
        <p>年份: {{ localAnime.year }}</p>
      </div>
      <div class="info-row">
        <p>主演: {{ truncatedActors(localAnime.mainActors) }}</p>
        <p>导演: {{ localAnime.director }}</p>
      </div>
      <div class="info-row">
        <p>语言: {{ localAnime.language }}</p>
        <p>更新: {{ localAnime.lastUpdated }}</p>
      </div>
      <div class="info-row">
        <p>评分: <el-rate v-model="localAnime.rating" disabled></el-rate></p>
      </div>

      <!-- 收藏按钮 -->
      <div class="favorite-btn">
        <el-button type="danger" icon="el-icon-star-on" @click="toggleFavorite">
          {{ isFavorite ? "已收藏" : "收藏" }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["anime"],
  data() {
    return {
      isFavorite: false, // 标记是否已收藏
    };
  },
  computed: {
    ...mapState(["user"]),
    localAnime() {
      return { ...this.anime };
    },
  },
  watch: {
    anime: {
      handler() {
        this.checkFavoriteStatus();
      },
      immediate: true,
    },
  },
  methods: {
    truncatedActors(actors) {
      if (!actors) return "";
      let actorList = actors.split(",");
      if (actorList.length > 3) {
        return actorList.slice(0, 3).join(",") + "...";
      }
      return actors;
    },

    async checkFavoriteStatus() {
      if (!this.user || !this.user.id) return; // 未登录则不检查
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/favorites?userId=${this.user.id}`
        );
        const data = await response.json();
        this.isFavorite = data.some((item) => item.videoId === this.anime.id);
      } catch (error) {
        console.error("获取收藏状态失败:", error);
      }
    },

    async toggleFavorite() {
      if (!this.user || !this.user.id) {
        this.$message.warning("请先登录后再收藏！");
        return;
      }

      const favoriteData = {
        userId: this.user.id,
        video: {
          videoId: this.anime.id,
          title: this.anime.title,
          cover: this.anime.cover,
        },
      };

      try {
        const response = await fetch("http://localhost:3000/api/user/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(favoriteData),
        });

        if (response.ok) {
          this.isFavorite = !this.isFavorite;
          this.$message.success(this.isFavorite ? "收藏成功！" : "取消收藏！");
        } else {
          const result = await response.json();
          this.$message.error(result.error || "操作失败");
        }
      } catch (error) {
        console.error("收藏操作失败:", error);
      }
    },
  },
};
</script>

<style scoped>
.anime-info-container {
  display: flex;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
}

.cover {
  width: 200px;
  height: 300px;
  border-radius: 8px;
}

.info {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.info h2 {
  margin-bottom: 15px;
  font-size: 1.5em;
  color: #333;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info p {
  margin: 0;
  font-size: 1em;
  color: #555;
}

.favorite-btn {
  margin-top: 10px;
}
</style>
