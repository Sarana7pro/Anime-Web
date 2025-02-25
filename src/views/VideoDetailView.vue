<template>
  <el-container class="video-detail-view" v-if="anime">
    <el-aside width="200px">
      <AppSidebar @scroll-to-category="scrollToCategory" />
    </el-aside>

    <el-main>
      <AppHeader />
      <div class="category-container gray-background">
        <AnimeInfoRanking :anime="anime" />
        <AnimeDescription :description="anime.description" />
        <EpisodeList 
          :episodes="currentEpisodes"
          :allEpisodes="anime.allEpisodes"
          :animeId="anime.id"
          :hasNextPage="hasNextPage"
          @show-more-episodes="showMoreEpisodes"
          @next-page="nextPage"
        />
        <AnimeRecommendations :recommendations="recommendations" />
      </div>
      <AppFooter />
    </el-main>
  </el-container>

  <div v-else>
    加载中...
  </div>
</template>

<script>
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AnimeInfoRanking from "@/components/AnimeDetail/AnimeInfoRanking.vue";
import EpisodeList from "@/components/AnimeDetail/EpisodeList.vue";
import AnimeDescription from "@/components/AnimeDetail/AnimeDescription.vue";
import AnimeRecommendations from "@/components/AnimeDetail/AnimeRecommendations.vue";
import { mapState } from "vuex";

export default {
  name: "VideoDetailView",
  components: {
    AppSidebar,
    AppHeader,
    AppFooter,
    AnimeInfoRanking,
    EpisodeList,
    AnimeDescription,
    AnimeRecommendations,
  },
  data() {
    return {
      anime: null,
      recommendations: [],
      currentPage: 0, // 当前播放源索引
    };
  },
  computed: {
    ...mapState(["user"]),
    currentEpisodes() {
      if (!this.anime) return [];
      return this.anime.paginatedEpisodes[this.currentPage] || [];
    },
    hasNextPage() {
      return this.anime && this.currentPage < this.anime.paginatedEpisodes.length - 1;
    }
  },
  created() {
    this.fetchAnimeDetail();
  },
  watch: {
    '$route.params.id': {
      handler(newVal) {
        if (newVal) {
          this.resetState();
          this.fetchAnimeDetail();
        }
      },
      immediate: true
    }
  },
  methods: {
    resetState() {
      this.anime = null;
      this.currentPage = 0;
      this.recommendations = [];
    },
    async fetchAnimeDetail() {
      const id = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/anime-detail/${id}`);
        const data = await response.json();

        const paginatedEpisodes = this.parseEpisodes(data.vod_play_url);

        this.anime = {
          id: data.vod_id,
          title: data.vod_name,
          cover: data.vod_pic,
          genre: data.vod_tag,
          region: data.vod_area,
          year: data.vod_year,
          rating: data.vod_score,
          allEpisodes: paginatedEpisodes.flat(), // 展开所有分页数据
          paginatedEpisodes, // 分页存储剧集数据
          description: data.vod_content,
          mainActors: data.vod_actor,
          director: data.vod_director,
          language: data.vod_lang,
          lastUpdated: new Date(data.vod_time_add * 1000).toLocaleString()
        };

        // 如果用户已登录，则调用接口记录观看历史
        if (this.user && this.user.id) {
          this.recordWatchHistory();
        } else {
          // 未登录状态下使用 localStorage 保存观看历史（可选）
          this.recordWatchHistoryLocal();
        }
      } catch (error) {
        console.error("Error fetching anime detail:", error);
      }
    },

    parseEpisodes(playUrl) {
      if (!playUrl) return [];
      const sources = playUrl.split('$$$'); // 按播放源分割
      let paginatedEpisodes = [];
      let currentGroup = [];
      sources.forEach(source => {
        const episodes = source.split('#').map(ep => ep.split('$')[0]); // 仅保留"第XX集"
        if (currentGroup.length > 0 && episodes[0] === "第01集") {
          paginatedEpisodes.push([...currentGroup]);
          currentGroup = [];
        }
        currentGroup.push(...episodes);
      });
      if (currentGroup.length > 0) {
        paginatedEpisodes.push([...currentGroup]);
      }
      return paginatedEpisodes.map(group => group.slice(0, 12)); // 每组最多 12 集
    },

    // 调用后端接口记录观看历史
    async recordWatchHistory() {
      const userId = this.user.id;
      const video = {
        videoId: this.anime.id,
        title: this.anime.title,
        cover: this.anime.cover
      };
      try {
        const response = await fetch("http://localhost:3000/api/user/watch-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, video })
        });
        const result = await response.json();
        console.log("观看历史更新：", result);
      } catch (error) {
        console.error("记录观看历史时出错:", error);
      }
    },

    // 未登录状态下将记录存储到 localStorage（可选实现）
    recordWatchHistoryLocal() {
      const video = {
        videoId: this.anime.id,
        title: this.anime.title,
        cover: this.anime.cover,
        watchedAt: new Date().toISOString()
      };
      let history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
      history = history.filter(item => item.videoId !== video.videoId);
      history.unshift(video);
      if (history.length > 20) {
        history = history.slice(0, 20);
      }
      localStorage.setItem("watchHistory", JSON.stringify(history));
    },

    showMoreEpisodes() {
      this.anime.paginatedEpisodes[this.currentPage] = this.anime.allEpisodes;
    },

    nextPage() {
      if (this.hasNextPage) {
        this.currentPage++;
      }
    },

    scrollToCategory(category) {
      if (this.$refs[category]) {
        this.$refs[category].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
};
</script>
